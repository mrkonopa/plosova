# Únikovky paní učitelky Plosové 🔐

Jednoduchý web s únikovkami **rozdělenými podle tříd**. U každé únikovky jsou
**zámky** 🔒, které se po zadání správného kódu **odemknou a zezelenají** 🔓.

Web je čistě statický (HTML + CSS + JavaScript) – nepotřebuje žádný server ani
databázi. Lze ho otevřít přímo v prohlížeči nebo zdarma zveřejnit např. přes
GitHub Pages.

## Jak to funguje pro žáky

1. Na **úvodní stránce** si žák najde svoji **třídu** a klikne na **únikovku**
   (např. „Elektřina").
2. Otevře se **stránka únikovky**, kde teprve zadává kódy k jejím zámkům.
3. U každého zámku zadá kód a klikne na **Odemknout**.
4. Při správném kódu se zámek **odemkne, zezelená** a objeví se konfety. 🎉
   Nahoře se plní ukazatel postupu (např. „Odemčeno 3 ze 7 zámků").
5. Odemčené zámky zůstanou zelené i po obnovení stránky (uloženo v prohlížeči).

## Soubory

| Soubor / složka   | K čemu slouží                                                       |
| ----------------- | ------------------------------------------------------------------ |
| `index.html`      | Úvodní stránka – třídy a názvy únikovek (odkazy)                    |
| `unikovka.html`   | Stránka jedné únikovky – zde žák zadává kódy zámků                  |
| `admin.html`      | **Nástroj pro učitelku** – vyrobí „hash" kódu                       |
| `js/data.js`      | **Obsah webu** – třídy, únikovky a zámky (tady se vše upravuje)     |
| `js/common.js`    | Společné funkce (neupravuje se)                                     |
| `js/hash.js`      | Šifrování kódů (neupravuje se)                                      |
| `js/index.js`     | Logika úvodní stránky (neupravuje se)                               |
| `js/unikovka.js`  | Logika stránky únikovky (neupravuje se)                             |
| `css/styles.css`  | Vzhled                                                              |

> Adresa stránky únikovky vzniká automaticky z názvu, např.
> `unikovka.html?u=6-a-elektrina`. Učitelka nemusí nic nastavovat – odkazy se
> tvoří samy. Konkrétní únikovce tak jde poslat i přímý odkaz.

## Jak přidat / upravit únikovku nebo zámek

Veškerý obsah se mění **jen v souboru `js/data.js`**. Kódy se neukládají
napřímo, ale jako tzv. *hash* (otisk), aby je žáci nenašli ve zdrojovém kódu.

### 1) Vyrobte hash kódu

1. Otevřete v prohlížeči soubor **`admin.html`**.
2. Napište kód (např. `KNIHA123`) – na velikosti písmen nezáleží.
3. Zkopírujte vygenerovaný **hash**.

### 2) Vložte ho do `data.js`

Každá třída, únikovka a zámek vypadají takto:

```js
{
  nazev: "6.A",
  emoji: "📚",
  unikovky: [
    {
      nazev: "Tajemství staré knihovny",
      popis: "Krátký popisek únikovky.",
      zamky: [
        { nazev: "Zámek 1 – Název knihy", hash: "SEM_VLOZTE_HASH" },
        { nazev: "Zámek 2 – Tajný inkoust", hash: "SEM_VLOZTE_HASH" }
      ]
    }
  ]
}
```

- **Třídu** přidáte zkopírováním celého bloku `{ nazev: "...", ... }`.
- **Zámek** přidáte zkopírováním řádku `{ nazev: "...", hash: "..." }`.
- Jednotlivé položky v seznamu oddělujte **čárkou** (poslední bez čárky).

> 💡 Tip: za hash si můžete napsat poznámku s kódem, ať víte, co odemyká:
> `{ nazev: "Zámek 1", hash: "abc...", }, // kód: KNIHA123`

## Vyzkoušení na počítači

Stačí otevřít `index.html` v prohlížeči. Pokud by nešlo načítat `js/data.js`
(některé prohlížeče to u souborů `file://` blokují), spusťte v této složce
malý server:

```bash
# Python 3
python3 -m http.server 8000
# a otevřete http://localhost:8000
```

## Zveřejnění zdarma (GitHub Pages)

Web se zveřejňuje **automaticky** přes GitHub Actions. O nasazení se stará
soubor `.github/workflows/deploy-pages.yml`: při každém pushi do větve `main`
se web znovu nasadí (workflow si Pages i sám zapne).

Živá adresa: **https://mrkonopa.github.io/plosova/**

### Jak vydat změnu
1. Upravte obsah (nejčastěji `js/data.js`).
2. Změnu pošlete do větve `main` (přímo, nebo přes pull request a jeho sloučení).
3. Po doběhnutí workflow (záložka **Actions**) se nová verze objeví na adrese výše.

> Pozn.: Pokud by automatické zapnutí Pages selhalo, lze je jednou ručně zapnout
> v **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Vzorové kódy (k vyzkoušení)

Tyto kódy jsou jen ukázkové – po vytvoření vlastních únikovek je nahraďte.

| Třída | Únikovka                | Kódy zámků                  |
| ----- | ----------------------- | --------------------------- |
| 6.A   | Tajemství staré knihovny| KNIHA, INKOUST, PERGAMEN    |
| 6.A   | Záhada v laboratoři     | ATOM, KYSLIK, REAKCE        |
| 6.B   | Poklad faraonů          | FARAON, PYRAMIDA, SFINGA    |
| 6.B   | Rytířská výprava        | MEC, STIT, HRAD             |
| 7.A   | Cesta do vesmíru        | RAKETA, MARS, HVEZDA        |
| 7.A   | Detektivní kancelář     | STOPA, LUPA, PACHATEL       |
| 8.A   | Probuzená sopka         | LAVA, POPEL, UTEK           |
| 8.A   | Stroj Enigma            | ROTOR, DEPESE, KLIC         |

## Časté otázky

**Zámky zůstávají zelené i po zavření – jak je resetovat?**
Stav je uložený v prohlížeči (localStorage). Smazání: otevřete na stránce
vývojářskou konzoli (F12) a zadejte `localStorage.clear()`, nebo vymažte data
webu v nastavení prohlížeče.

**Je to bezpečné?** Kódy nejsou ve zdrojáku vidět (jsou zahashované se „solí“).
Pro školní únikovku je to plně dostačující. Nejde o ochranu citlivých dat.
