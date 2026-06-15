/* ==========================================================================
   ŠIFROVÁNÍ KÓDŮ
   --------------------------------------------------------------------------
   Tento soubor zajišťuje, aby kódy nebyly nikde uloženy "naholo".
   Místo kódu se ukládá jeho otisk (hash), který nejde převést zpět na kód.

   Pozn.: Zadaný kód se před zašifrováním zbaví mezer na začátku/konci a
   převede na velká písmena, aby žáci nemuseli řešit malá/velká písmena.
   ========================================================================== */

const SUL = "plosova-unikovky-2026::";

async function vypocitejHash(kod) {
  const text = SUL + String(kod).trim().toUpperCase();
  const data = new TextEncoder().encode(text);
  const buffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
