/* ==========================================================================
   ÚVODNÍ STRÁNKA
   --------------------------------------------------------------------------
   Vykreslí třídy a pod nimi názvy únikovek jako ODKAZY. Po kliknutí na
   únikovku se otevře samostatná stránka (unikovka.html), kde žák zadává kódy.
   ========================================================================== */

(function () {
  "use strict";

  function vytvorOdkazUnikovky(trida, unikovka) {
    const slug = slugUnikovky(trida.nazev, unikovka.nazev);
    const pocetZamku = (unikovka.zamky || []).length;
    const hotovo = pocetOdemcenych(trida.nazev, unikovka);
    const vse = pocetZamku > 0 && hotovo === pocetZamku;

    const odkaz = el("a", "unikovka-odkaz");
    odkaz.href = "unikovka.html?u=" + encodeURIComponent(slug);
    if (vse) odkaz.classList.add("dokonceno");

    const znak = el("span", "unikovka-ikona");
    znak.appendChild(ikona(vse ? "hotovo" : unikovka.symbol || "zamek", 20));

    const stred = el("div", "unikovka-stred");
    stred.appendChild(el("span", "unikovka-nazev", unikovka.nazev));
    if (unikovka.popis) stred.appendChild(el("span", "unikovka-popis", unikovka.popis));

    const odznak = el("span", "odznak", hotovo + " / " + pocetZamku);
    if (vse) odznak.classList.add("hotovo");

    const sipka = el("span", "sipka", "›");
    sipka.setAttribute("aria-hidden", "true");

    odkaz.appendChild(znak);
    odkaz.appendChild(stred);
    odkaz.appendChild(odznak);
    odkaz.appendChild(sipka);
    return odkaz;
  }

  function vykresli() {
    const data = typeof DATA_UNIKOVEK !== "undefined" ? DATA_UNIKOVEK : null;
    if (!data) return;

    const nadpisEl = document.getElementById("nadpis");
    const podnadpisEl = document.getElementById("podnadpis");
    if (nadpisEl && data.nadpis) nadpisEl.textContent = data.nadpis;
    if (podnadpisEl && data.podnadpis) podnadpisEl.textContent = data.podnadpis;
    if (data.nadpis) document.title = data.nadpis;

    const obal = document.getElementById("tridy");
    obal.innerHTML = "";

    data.tridy.forEach(function (trida) {
      const sekce = el("section", "trida");

      const hlavicka = el("div", "hlavicka-tridy");
      const znak = el("span", "znak-tridy");
      znak.appendChild(ikona(trida.symbol || "mereni", 20));
      hlavicka.appendChild(znak);
      hlavicka.appendChild(el("h2", "nazev-tridy", trida.nazev));
      sekce.appendChild(hlavicka);

      const seznam = el("div", "seznam-unikovek");
      const unikovky = trida.unikovky || [];

      if (unikovky.length === 0) {
        seznam.appendChild(el("div", "prazdno", "Zatím prázdné – zde se objeví únikovky."));
      } else {
        unikovky.forEach(function (unikovka) {
          seznam.appendChild(vytvorOdkazUnikovky(trida, unikovka));
        });
      }

      sekce.appendChild(seznam);
      obal.appendChild(sekce);
    });
  }

  document.addEventListener("DOMContentLoaded", vykresli);
})();
