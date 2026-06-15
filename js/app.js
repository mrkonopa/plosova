/* ==========================================================================
   LOGIKA STRÁNKY
   --------------------------------------------------------------------------
   Vykreslí třídy ➜ únikovky ➜ zámky, kontroluje zadané kódy a pamatuje si,
   které zámky už jsou odemčené (uloženo v prohlížeči přes localStorage).
   Tento soubor obvykle není potřeba upravovat.
   ========================================================================== */

(function () {
  "use strict";

  const ULOZISTE_KLIC = "plosova-odemknute";

  // --- Trvalá paměť odemčených zámků --------------------------------------
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
      /* localStorage nemusí být dostupný – nevadí, jen se stav nezapamatuje */
    }
  }

  function idZamku(trida, unikovka, zamek) {
    return trida + "::" + unikovka + "::" + zamek;
  }

  // --- Pomocné funkce pro tvorbu prvků ------------------------------------
  function el(tag, trida, text) {
    const e = document.createElement(tag);
    if (trida) e.className = trida;
    if (text != null) e.textContent = text;
    return e;
  }

  // --- Vykreslení jednoho zámku -------------------------------------------
  function vytvorZamek(tridaNazev, unikovkaNazev, zamek, odemknute, prepocti) {
    const id = idZamku(tridaNazev, unikovkaNazev, zamek.nazev);
    const jeOdemknuto = !!odemknute[id];

    const radek = el("li", "zamek-radek");
    radek.dataset.id = id;
    if (jeOdemknuto) radek.classList.add("odemknuto");

    const ikona = el("span", "zamek-ikona");
    ikona.setAttribute("aria-hidden", "true");
    ikona.textContent = jeOdemknuto ? "🔓" : "🔒";

    const stred = el("div", "zamek-stred");
    stred.appendChild(el("p", "zamek-nazev", zamek.nazev));

    const form = el("form", "form-kod");
    form.setAttribute("autocomplete", "off");

    const vstup = el("input", "vstup-kod");
    vstup.type = "text";
    vstup.placeholder = "Zadej kód…";
    vstup.setAttribute("aria-label", "Kód pro " + zamek.nazev);
    vstup.maxLength = 64;

    const tlacitko = el("button", "tlacitko");
    tlacitko.type = "submit";
    tlacitko.textContent = "Odemknout";

    form.appendChild(vstup);
    form.appendChild(tlacitko);

    const stav = el("p", "stav");
    stav.setAttribute("role", "status");

    stred.appendChild(form);
    stred.appendChild(stav);

    radek.appendChild(ikona);
    radek.appendChild(stred);

    if (jeOdemknuto) {
      zamknoutFormular(radek);
      stav.textContent = "✅ Odemčeno";
      stav.className = "stav uspech";
    }

    form.addEventListener("submit", async function (ev) {
      ev.preventDefault();
      const zadano = vstup.value;
      if (!zadano.trim()) return;

      tlacitko.disabled = true;
      const hash = await vypocitejHash(zadano);

      if (hash === zamek.hash) {
        const ulozene = nactiOdemknute();
        ulozene[id] = true;
        ulozOdemknute(ulozene);
        radek.classList.add("odemknuto");
        ikona.textContent = "🔓";
        zamknoutFormular(radek);
        stav.textContent = "✅ Správně! Zámek je odemčený.";
        stav.className = "stav uspech";
        spustOslavu(radek);
        if (typeof prepocti === "function") prepocti();
      } else {
        tlacitko.disabled = false;
        stav.textContent = "❌ To není správný kód, zkus to znovu.";
        stav.className = "stav chyba";
        radek.classList.remove("zatreseni");
        void radek.offsetWidth; // vynucení reflow kvůli opakování animace
        radek.classList.add("zatreseni");
        vstup.focus();
        vstup.select();
      }
    });

    return radek;
  }

  function zamknoutFormular(radek) {
    const form = radek.querySelector(".form-kod");
    if (form) form.querySelectorAll("input, button").forEach((p) => (p.disabled = true));
  }

  // Malá oslava při odemčení (konfety)
  function spustOslavu(prvek) {
    const pocet = 14;
    const barvy = ["#34d399", "#22c55e", "#fbbf24", "#60a5fa", "#f472b6"];
    for (let i = 0; i < pocet; i++) {
      const k = el("span", "konfeta");
      k.style.left = Math.random() * 100 + "%";
      k.style.background = barvy[i % barvy.length];
      k.style.animationDelay = Math.random() * 0.2 + "s";
      prvek.appendChild(k);
      setTimeout(() => k.remove(), 1500);
    }
  }

  // --- Vykreslení jedné únikovky (karta s více zámky) ---------------------
  function vytvorKartu(tridaNazev, unikovka, odemknute) {
    const karta = el("article", "karta");

    const hlavicka = el("div", "karta-hlavicka");
    hlavicka.appendChild(el("h3", "nazev-unikovky", unikovka.nazev));
    if (unikovka.popis) hlavicka.appendChild(el("p", "popis", unikovka.popis));

    const odznak = el("span", "odznak");
    hlavicka.appendChild(odznak);
    karta.appendChild(hlavicka);

    const seznam = el("ul", "zamky");

    const zamky = unikovka.zamky || [];

    function prepocti() {
      const hotovo = zamky.filter(
        (z) => nactiOdemknute()[idZamku(tridaNazev, unikovka.nazev, z.nazev)]
      ).length;
      odznak.textContent = "🔓 " + hotovo + " / " + zamky.length;
      const vse = hotovo === zamky.length && zamky.length > 0;
      odznak.classList.toggle("hotovo", vse);
      karta.classList.toggle("dokonceno", vse);
    }

    zamky.forEach(function (zamek) {
      seznam.appendChild(
        vytvorZamek(tridaNazev, unikovka.nazev, zamek, odemknute, prepocti)
      );
    });

    karta.appendChild(seznam);
    prepocti();
    return karta;
  }

  // --- Vykreslení celé stránky --------------------------------------------
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
    const odemknute = nactiOdemknute();

    data.tridy.forEach(function (trida) {
      const sekce = el("section", "trida");

      const hlavicka = el("div", "hlavicka-tridy");
      const nazev = el("h2", "nazev-tridy");
      nazev.textContent = (trida.emoji ? trida.emoji + " " : "") + trida.nazev;
      hlavicka.appendChild(nazev);
      sekce.appendChild(hlavicka);

      const mrizka = el("div", "mrizka");
      trida.unikovky.forEach(function (unikovka) {
        mrizka.appendChild(vytvorKartu(trida.nazev, unikovka, odemknute));
      });
      sekce.appendChild(mrizka);

      obal.appendChild(sekce);
    });
  }

  document.addEventListener("DOMContentLoaded", vykresli);
})();
