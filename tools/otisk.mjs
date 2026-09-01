#!/usr/bin/env node
/* ==========================================================================
   VÝROBA OTISKŮ KÓDŮ Z PŘÍKAZOVÉ ŘÁDKY
   --------------------------------------------------------------------------
   Totéž co "admin.html", jen pro toho, kdo raději píše do terminálu.
   Výsledek je zaměnitelný – oba nástroje počítají otisk stejně.

   Použití:
     node tools/otisk.mjs OHM472 VOLT12                 → otisky, řádek po řádku
     node tools/otisk.mjs --zamky "Měření odporu=OHM472" "Napětí=VOLT12"
                                                         → hotový blok "zamky: [...]"
     node tools/otisk.mjs --over "v1$200000$...$..." OHM472
                                                         → ověří, zda kód sedí
     cat kody.txt | node tools/otisk.mjs                 → kódy ze souboru
   ========================================================================== */

import { pbkdf2Sync, randomBytes, createHash, timingSafeEqual } from "node:crypto";

const POCET_OPAKOVANI = 200000;
const VERZE_OTISKU = "v1";
const DELKA_SOLI = 16;
const STARA_SUL = "plosova-unikovky-2026::";

/** Stejná úprava kódu jako v js/hash.js (bez diakritiky, bez mezer, velká písmena). */
function normalizujKod(kod) {
  return String(kod)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "")
    .toUpperCase();
}

function odvodOtisk(kod, sulHex, opakovani) {
  return pbkdf2Sync(normalizujKod(kod), Buffer.from(sulHex, "hex"), opakovani, 32, "sha256")
    .toString("hex");
}

function vyrobOtisk(kod) {
  const sulHex = randomBytes(DELKA_SOLI).toString("hex");
  return [VERZE_OTISKU, POCET_OPAKOVANI, sulHex, odvodOtisk(kod, sulHex, POCET_OPAKOVANI)].join("$");
}

function overKod(kod, otisk) {
  const ulozeny = String(otisk).trim();
  if (!ulozeny.includes("$")) {
    // starší zápis: prosté SHA-256 s pevnou solí
    const spocteny = createHash("sha256")
      .update(STARA_SUL + String(kod).trim().toUpperCase())
      .digest("hex");
    return spocteny === ulozeny.toLowerCase();
  }
  const [, opakovani, sulHex, ocekavany] = ulozeny.split("$");
  const spocteny = odvodOtisk(kod, sulHex.toLowerCase(), Number(opakovani));
  const a = Buffer.from(spocteny, "hex");
  const b = Buffer.from(ocekavany.toLowerCase(), "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}

function jsRetezec(text) {
  return '"' + String(text).replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
}

// --- Spuštění ---------------------------------------------------------------

async function ctiStdin() {
  if (process.stdin.isTTY) return [];
  let text = "";
  for await (const kus of process.stdin) text += kus;
  return text.split("\n").map((r) => r.trim()).filter(Boolean);
}

const argumenty = process.argv.slice(2);

if (argumenty[0] === "--over") {
  const [, otisk, ...zbytek] = argumenty;
  const kod = zbytek.join(" ");
  if (!otisk || !kod) {
    console.error('Použití: node tools/otisk.mjs --over "v1$..." KÓD');
    process.exit(2);
  }
  const sedi = overKod(kod, otisk);
  console.log(sedi ? "SEDÍ" : "NESEDÍ");
  process.exit(sedi ? 0 : 1);
}

const blokovyRezim = argumenty[0] === "--zamky";
const polozky = (blokovyRezim ? argumenty.slice(1) : argumenty).concat(
  argumenty.length === 0 || (blokovyRezim && argumenty.length === 1) ? await ctiStdin() : []
);

if (polozky.length === 0) {
  console.error("Zadejte kódy jako argumenty, nebo je pošlete na standardní vstup.");
  console.error('Např.: node tools/otisk.mjs --zamky "Měření odporu=OHM472" "Napětí=VOLT12"');
  process.exit(2);
}

if (blokovyRezim) {
  const radky = polozky.map((polozka) => {
    const del = polozka.indexOf("=");
    const nazev = del === -1 ? "" : polozka.slice(0, del).trim();
    const kod = del === -1 ? polozka : polozka.slice(del + 1);
    const casti = [];
    if (nazev) casti.push("nazev: " + jsRetezec(nazev));
    casti.push("otisk: " + jsRetezec(vyrobOtisk(kod)));
    return "            { " + casti.join(", ") + " }";
  });
  console.log("          zamky: [\n" + radky.join(",\n") + "\n          ]");
} else {
  for (const kod of polozky) console.log(vyrobOtisk(kod));
}
