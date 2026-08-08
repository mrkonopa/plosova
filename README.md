# Únikovky paní učitelky Plosové 🔧⚡

Statický web s fyzikálními únikovkami **rozdělenými podle tříd (6.–9.)**.
Každá únikovka má několik **zámků** – a každý zámek je jedna **aktivita**
(např. „Měření odporu“). Žák u aktivity najde kód, zadá ho a zámek se
**odemkne a zezelená** 🔓.

Vzhled je laděný do **fyziky a dílny** – podklad jako rýsovací papír,
technické kreslené značky místo emoji, „dílenské štítky“.

Web je čistě statický (HTML + CSS + JavaScript) – nepotřebuje žádný server ani
databázi. Běží zdarma na GitHub Pages: **https://mrkonopa.github.io/plosova/**

## Jak to funguje pro žáky

1. Na **úvodní stránce** si žák vybere svoji **třídu** a klikne na **únikovku**.
2. Otevře se **stránka únikovky** se seznamem **zámků (aktivit)**.
3. U každého zámku zadá kód, který u dané aktivity našel, a klikne na
   **Odemknout**.
4. Při správném kódu zámek **zezelená** 🎉 a nahoře se plní ukazatel postupu
   (např. „Odemčeno 3 ze 7 zámků“).
5. Odemčené zámky zůstanou zelené i po obnovení stránky (uloženo v prohlížeči).

## Soubory

| Soubor / složka   | K čemu slouží                                                       |
| ----------------- | ------------------------------------------------------------------ |
| `index.html`      | Úvodní stránka – třídy a názvy únikovek (odkazy)                    |
| `unikovka.html`   | Stránka jedné únikovky – zde žák zadává kódy zámků                  |
| `admin.html`      | **Neveřejný** nástroj pro učitelku – vyrobí „otisk“ kódu           |
| `js/data.js`      | **Obsah webu** – třídy, únikovky a zámky (tady se vše upravuje)     |
| `js/symboly.js`   | Kreslené technické značky (seznam názvů níže)                       |
| `js/common.js`    | Společné funkce (neupravuje se)                                     |
| `js/hash.js`      | Šifrování kódů (neupravuje se)                                      |
| `js/index.js`     | Logika úvodní stránky (neupravuje se)                               |
| `js/unikovka.js`  | Logika stránky únikovky (neupravuje se)                             |
| `css/styles.css`  | Vzhled                                                             |

## Jak přidat únikovku a zámky

Veškerý obsah se mění **jen v souboru `js/data.js`**. Kódy se neukládají
napřímo, ale jako tzv. *otisk* (hash), aby je žáci nenašli ve zdrojovém kódu.

### 1) Vyrobte otisk každého kódu

1. Otevřete v prohlížeči soubor **`admin.html`**.
2. Napište kód (např. `OHM`) – na velikosti písmen ani mezerách nezáleží.
3. Zkopírujte vygenerovaný **otisk**.

### 2) Vložte únikovku do `js/data.js`

Do příslušné třídy (mezi hranaté závorky `unikovky: [ ]`) vložte:

```js
{
  nazev: "Elektrické obvody",
  popis: "Projdi měřicí stanoviště a odemkni všechny zámky.",
  symbol: "obvod",
  zamky: [
    { nazev: "Měření odporu",   symbol: "mereni", hash: "SEM_VLOZTE_OTISK" },
    { nazev: "Napětí na zdroji", symbol: "sila",  hash: "SEM_VLOZTE_OTISK" },
    { nazev: "Proud v obvodu",  symbol: "magnet", hash: "SEM_VLOZTE_OTISK" }
  ]
}
```

- **Zámek = jedna aktivita.** `nazev` je název té aktivity.
- Zámků může být klidně 6–7, stačí přidat další řádky `{ ... }` oddělené čárkou.
- Položka `symbol` je nepovinná (když ji vynecháte, použije se výchozí značka).

### Dostupné symboly (`symbol: "..."`)

`obvod`, `mereni`, `dilna`, `magnet`, `sila`, `teplota`, `optika`, `kladka`,
`kapalina`, `zvuk`, `cas`, `zamek`, `otevreno`, `hotovo`

## Bezpečnost kódů

Kódy nejsou ve zdrojáku uložené naholo, ale jako **SHA-256 otisk se „solí“**.
Ze stránky se původní kód zpětně nepřečte, takže ho žáci v „zobrazit zdroj“
nenajdou. Stránka `admin.html` je označená jako neveřejná (`noindex`).
Pro školní únikovku je to plně dostačující.

## Vyzkoušení na počítači

Stačí otevřít `index.html` v prohlížeči. Pokud by nešlo načítat `js/data.js`
(některé prohlížeče to u souborů `file://` blokují), spusťte v této složce
malý server:

```bash
python3 -m http.server 8000
# a otevřete http://localhost:8000
```

## Zveřejnění (GitHub Pages)

Web se zveřejňuje **automaticky** přes GitHub Actions
(`.github/workflows/deploy-pages.yml`): při každém pushi do větve `main` se web
znovu nasadí. Živá adresa: **https://mrkonopa.github.io/plosova/**

## Časté otázky

**Zámky zůstávají zelené i po zavření – jak je resetovat?**
Stav je uložený v prohlížeči (localStorage). Smazání: otevřete na stránce
vývojářskou konzoli (F12) a zadejte `localStorage.clear()`, nebo vymažte data
webu v nastavení prohlížeče.
