/* ==========================================================================
   TAJNÉ KÓDY (šifrování)
   --------------------------------------------------------------------------
   Tento soubor zajišťuje, aby kódy nebyly nikde na webu uložené "naholo".
   Do souboru js/data.js se ukládá jen OTISK kódu, ze kterého se původní kód
   zpětně přečíst nedá. Žák tedy kód nenajde ani v "zobrazit zdroj kódu".

   Jak otisk vypadá:

     "v1$200000$<sůl>$<otisk>"
      │   │       │      └─ výsledek výpočtu (64 znaků)
      │   │       └──────── náhodná "sůl" – u každého zámku jiná
      │   └──────────────── kolikrát se výpočet opakuje (schválně hodně)
      └──────────────────── verze zápisu

   Proč to takhle:
     - SŮL (u každého zámku jiná) = stejný kód u dvou zámků dá jiný otisk,
       takže nejde poznat, že se kód opakuje, ani si předpočítat tabulku.
     - 200 000 OPAKOVÁNÍ = jedno ověření trvá ~0,1 s (žák nic nepozná),
       ale zkoušení kódů "hrubou silou" trvá desítky hodin na jeden zámek.

   Tento soubor se neupravuje.
   ========================================================================== */

const VERZE_OTISKU = "v1";
const POCET_OPAKOVANI = 200000;
const DELKA_SOLI = 16; // bajtů

// Starší zápis otisku (jen SHA-256 s pevnou solí) – kvůli zpětné kompatibilitě.
const STARA_SUL = "plosova-unikovky-2026::";

/* --------------------------------------------------------------------------
   Úprava zadaného kódu před výpočtem.
   Žák nemusí řešit velká/malá písmena, mezery ani háčky a čárky:
   "síla 12" i "SILA12" se vyhodnotí stejně.
   -------------------------------------------------------------------------- */
function normalizujKod(kod) {
  return String(kod)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // pryč s diakritikou
    .replace(/\s+/g, "") // pryč se všemi mezerami
    .toUpperCase();
}

function naHex(bajty) {
  return Array.from(bajty)
    .map(function (b) {
      return b.toString(16).padStart(2, "0");
    })
    .join("");
}

function zHex(hex) {
  const pole = new Uint8Array(hex.length / 2);
  for (let i = 0; i < pole.length; i++) {
    pole[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return pole;
}

/** Spočítá otisk kódu pro danou sůl a počet opakování. */
async function odvodOtisk(kod, sulHex, opakovani) {
  const klic = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(normalizujKod(kod)),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bity = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: zHex(sulHex), iterations: opakovani, hash: "SHA-256" },
    klic,
    256
  );
  return naHex(new Uint8Array(bity));
}

/** Vyrobí z kódu celý zápis otisku do js/data.js (používá admin.html). */
async function vyrobOtisk(kod) {
  const sul = new Uint8Array(DELKA_SOLI);
  crypto.getRandomValues(sul);
  const sulHex = naHex(sul);
  const otisk = await odvodOtisk(kod, sulHex, POCET_OPAKOVANI);
  return [VERZE_OTISKU, POCET_OPAKOVANI, sulHex, otisk].join("$");
}

/** Je u zámku vyplněný otisk, se kterým se dá pracovat? */
function jeOtiskVyplneny(otisk) {
  if (typeof otisk !== "string") return false;
  const t = otisk.trim();
  if (!t) return false;
  if (/^v\d+\$\d+\$[0-9a-f]+\$[0-9a-f]+$/i.test(t)) return true;
  return /^[0-9a-f]{64}$/i.test(t); // starší zápis
}

/** Porovná zadaný kód s uloženým otiskem. Vrací true / false. */
async function overKod(kod, otisk) {
  if (!jeOtiskVyplneny(otisk)) return false;
  const ulozeny = otisk.trim();

  // Starší zápis: prosté SHA-256 s pevnou solí.
  if (ulozeny.indexOf("$") === -1) {
    const data = new TextEncoder().encode(STARA_SUL + String(kod).trim().toUpperCase());
    const buffer = await crypto.subtle.digest("SHA-256", data);
    return naHex(new Uint8Array(buffer)) === ulozeny.toLowerCase();
  }

  const casti = ulozeny.split("$");
  const opakovani = parseInt(casti[1], 10);
  if (!opakovani) return false;
  const spocteny = await odvodOtisk(kod, casti[2].toLowerCase(), opakovani);
  return spocteny === casti[3].toLowerCase();
}
