/* ==========================================================================
   DETAIL ÚNIKOVKY
   --------------------------------------------------------------------------
   Vykreslí jednu únikovku (podle ?u=... v adrese) a její zámky. Žák zde
   zadává kódy; správný kód zámek odemkne, zezelená a uloží se do prohlížeče.
   ========================================================================== */

(function () {
  "use strict";

  function zamknoutFormular(radek) {
    const form = radek.querySelector(".form-kod");
    if (form) form.querySelectorAll("input, button").forEach((p) => (p.disabled = true));
  }

  // Malá oslava při odemčení (konfety)
  function spustOslavu(prvek) {
    const barvy = ["#34d399", "#22c55e", "#fbbf24", "#60a5fa", "#f472b6"];
    for (let i = 0; i < 14; i++) {
      const k = el("span", "konfeta");
      k.style.left = Math.random() * 100 + "%";
      k.style.background = barvy[i % barvy.length];
      k.style.animationDelay = Math.random() * 0.2 + "s";
      prvek.appendChild(k);
      setTimeout(() => k.remove(), 1500);
    }
  }

  function vytvorZamek(tridaNazev, unikovkaNazev, zamek, cislo, prepocti) {
    const id = idZamku(tridaNazev, unikovkaNazev, zamek.nazev);
    const jeOdemknuto = !!nactiOdemknute()[id];

    const radek = el("li", "zamek-radek");
    radek.dataset.id = id;
    if (jeOdemknuto) radek.classList.add("odemknuto");

    const ikona = el("span", "zamek-ikona");
    ikona.setAttribute("aria-hidden", "true");
    ikona.textContent = jeOdemknuto ? "🔓" : "🔒";

    const stred = el("div", "zamek-stred");
    const nazevZamku = zamek.nazev || "Zámek " + cislo;
    stred.appendChild(el("p", "zamek-nazev", nazevZamku));

    const form = el("form", "form-kod");
    form.setAttribute("autocomplete", "off");

    const vstup = el("input", "vstup-kod");
    vstup.type = "text";
    vstup.placeholder = "Zadej kód…";
    vstup.setAttribute("aria-label", "Kód pro " + nazevZamku);
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
        void radek.offsetWidth; // restart animace
        radek.classList.add("zatreseni");
        vstup.focus();
        vstup.select();
      }
    });

    return radek;
  }

  function vykresli() {
    const slug = parametrZAdresy("u");
    const nalez = slug ? najdiUnikovku(slug) : null;

    const obal = document.getElementById("detail");

    // Únikovka nenalezena
    if (!nalez) {
      document.title = "Únikovka nenalezena";
      obal.innerHTML = "";
      const box = el("div", "nenalezeno");
      box.appendChild(el("h2", null, "Tuhle únikovku se nepodařilo najít 🤔"));
      box.appendChild(el("p", null, "Možná byla přejmenovaná nebo je odkaz neúplný."));
      const zpet = el("a", "tlacitko-zpet", "← Zpět na přehled únikovek");
      zpet.href = "index.html";
      box.appendChild(zpet);
      obal.appendChild(box);
      return;
    }

    const trida = nalez.trida;
    const unikovka = nalez.unikovka;
    const zamky = unikovka.zamky || [];
    document.title = unikovka.nazev + " – " + trida.nazev;

    obal.innerHTML = "";

    // Záhlaví detailu
    const zpet = el("a", "tlacitko-zpet", "← Zpět na přehled");
    zpet.href = "index.html";
    obal.appendChild(zpet);

    const hlavicka = el("div", "detail-hlavicka");
    const stitekTridy = el("span", "stitek-trida");
    stitekTridy.textContent = (trida.emoji ? trida.emoji + " " : "") + trida.nazev;
    hlavicka.appendChild(stitekTridy);
    hlavicka.appendChild(el("h1", "detail-nazev", unikovka.nazev));
    if (unikovka.popis) hlavicka.appendChild(el("p", "detail-popis", unikovka.popis));

    const postup = el("div", "postup");
    const postupText = el("span", "postup-text");
    const postupBar = el("div", "postup-bar");
    const postupVypln = el("div", "postup-vypln");
    postupBar.appendChild(postupVypln);
    postup.appendChild(postupText);
    postup.appendChild(postupBar);
    hlavicka.appendChild(postup);

    const oslavaVse = el("p", "vse-hotovo");
    oslavaVse.textContent = "🎉 Hotovo! Odemkl/a jsi všechny zámky.";
    hlavicka.appendChild(oslavaVse);

    obal.appendChild(hlavicka);

    // Seznam zámků
    const seznam = el("ul", "zamky detail-zamky");
    obal.appendChild(seznam);

    function prepocti() {
      const hotovo = pocetOdemcenych(trida.nazev, unikovka);
      const celkem = zamky.length;
      postupText.textContent = "Odemčeno " + hotovo + " z " + celkem + " zámků";
      postupVypln.style.width = (celkem ? (hotovo / celkem) * 100 : 0) + "%";
      const vse = celkem > 0 && hotovo === celkem;
      oslavaVse.classList.toggle("zobraz", vse);
      postup.classList.toggle("hotovo", vse);
    }

    zamky.forEach(function (zamek, i) {
      seznam.appendChild(
        vytvorZamek(trida.nazev, unikovka.nazev, zamek, i + 1, prepocti)
      );
    });

    prepocti();
  }

  document.addEventListener("DOMContentLoaded", vykresli);
})();
