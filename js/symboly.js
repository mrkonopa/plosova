/* ==========================================================================
   SYMBOLY (ikonky)
   --------------------------------------------------------------------------
   Kreslené technické značky místo emoji. V souboru js/data.js se u třídy,
   únikovky nebo zámku napíše jen NÁZEV symbolu, např. symbol: "obvod".

   Dostupné názvy:
     obvod, mereni, dilna, magnet, sila, teplota, optika, kladka,
     kapalina, zvuk, cas, zamek, otevreno, hotovo
   ========================================================================== */

const SYMBOLY = {
  obvod: '<circle cx="12" cy="12" r="5"/><path d="M1 12h6M17 12h6M12 7v10"/>',
  mereni: '<path d="M2 15h20M4 15v-4M9 15v-6M14 15v-4M19 15v-6"/>',
  dilna: '<path d="M3 20 12 11M9 8l4-4 7 7-4 4z"/>',
  magnet: '<path d="M5 20V9a7 7 0 0 1 14 0v11M5 14h4M15 14h4"/>',
  sila: '<path d="M3 18h14M13 13l5 5-5 5M3 6h10"/>',
  teplota: '<path d="M10 14V5a2 2 0 1 1 4 0v9a4 4 0 1 1-4 0z"/><path d="M12 9v6"/>',
  optika: '<path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/>',
  kladka: '<circle cx="12" cy="7" r="4"/><path d="M8 7v10a4 4 0 0 0 8 0M12 17v5"/>',
  kapalina: '<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>',
  zvuk: '<path d="M4 9v6h4l5 4V5L8 9zM17 8a6 6 0 0 1 0 8"/>',
  cas: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
  zamek: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  otevreno: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 7.5-2"/>',
  hotovo: '<path d="M4 12.5 9.5 18 20 6"/>'
};

/** Vrátí <span> s nakreslenou značkou. */
function ikona(nazev, velikost) {
  const kresba = SYMBOLY[nazev] || SYMBOLY.zamek;
  const v = velikost || 22;
  const obal = document.createElement("span");
  obal.setAttribute("aria-hidden", "true");
  obal.style.display = "flex";
  obal.innerHTML =
    '<svg width="' + v + '" height="' + v + '" viewBox="0 0 24 24" fill="none" ' +
    'stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    kresba + "</svg>";
  return obal;
}
