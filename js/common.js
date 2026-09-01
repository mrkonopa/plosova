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
    .replace(/[\u0300-\u036f]/g, "") // odstraní diakritiku (kombinační znaky)
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

// Jednoznačný klíč jednoho zámku v paměti prohlížeče.
// Zámek se pozná podle POŘADÍ (1, 2, 3, ...), ne podle názvu – zámky totiž
// nemusí mít název vyplněný a přejmenování zámku nesmí smazat postup žáka.
function idZamku(tridaNazev, unikovkaNazev, poradi) {
  return slugUnikovky(tridaNazev, unikovkaNazev) + "::" + poradi;
}

// Kolik zámků dané únikovky je odemčených
function pocetOdemcenych(tridaNazev, unikovka) {
  const odemknute = nactiOdemknute();
  return (unikovka.zamky || []).filter(
    (z, i) => odemknute[idZamku(tridaNazev, unikovka.nazev, i + 1)]
  ).length;
}

// Otisk kódu u zámku (v datech se smí napsat "otisk:" i starší "hash:")
function otiskZamku(zamek) {
  return (zamek && (zamek.otisk || zamek.hash)) || "";
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
