/* ==========================================================================
   SPOLEČNÉ FUNKCE (sdílené úvodní i detailní stránkou)
   --------------------------------------------------------------------------
   Tento soubor obvykle není potřeba upravovat.
   ========================================================================== */

// Klíč pro uložení odemčených zámků v prohlížeči
const ULOZISTE_KLIC = "plosova-odemknute";

// Převede text na "slug" do adresy (bez diakritiky, malými písmeny).
// Např. "6.A Elektřina" -> "6-a-elektrina"
function slugify(text) {
  return String(text)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // odstraní diakritiku (kombinační znaky)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Jednoznačný slug únikovky (kombinace třídy a názvu)
function slugUnikovky(tridaNazev, unikovkaNazev) {
  return slugify(tridaNazev + " " + unikovkaNazev);
}

// --- Trvalá paměť odemčených zámků -----------------------------------------
function nactiOdemknute() {
  try {
    return JSON.parse(localStorage.getItem(ULOZISTE_KLIC)) || {};
  } catch (e) {
    return {};
  }
}

function ulozOdemknute(stav) {
  try {
    localStorage.setItem(ULOZISTE_KLIC, JSON.stringify(stav));
  } catch (e) {
    /* localStorage nemusí být dostupný – nevadí */
  }
}

function idZamku(tridaNazev, unikovkaNazev, zamekNazev) {
  return tridaNazev + "::" + unikovkaNazev + "::" + zamekNazev;
}

// Kolik zámků dané únikovky je odemčených
function pocetOdemcenych(tridaNazev, unikovka) {
  const odemknute = nactiOdemknute();
  return (unikovka.zamky || []).filter(
    (z) => odemknute[idZamku(tridaNazev, unikovka.nazev, z.nazev)]
  ).length;
}

// --- Pomocná tvorba prvků --------------------------------------------------
function el(tag, trida, text) {
  const e = document.createElement(tag);
  if (trida) e.className = trida;
  if (text != null) e.textContent = text;
  return e;
}

// Najde únikovku podle slugu v adrese
function najdiUnikovku(slug) {
  const data = typeof DATA_UNIKOVEK !== "undefined" ? DATA_UNIKOVEK : null;
  if (!data) return null;
  for (const trida of data.tridy) {
    for (const unikovka of trida.unikovky) {
      if (slugUnikovky(trida.nazev, unikovka.nazev) === slug) {
        return { trida: trida, unikovka: unikovka };
      }
    }
  }
  return null;
}

// Přečte hodnotu parametru z adresy (?u=...)
function parametrZAdresy(jmeno) {
  return new URLSearchParams(window.location.search).get(jmeno);
}
