# Únikovky paní učitelky Plosové 🔧⚡

Statický web s fyzikálními únikovkami **rozdělenými podle tříd (6.–9.)**.
Každá únikovka má několik **zámků** – a každý zámek je jedna **aktivita**
(např. „Měření odporu“). Žák u aktivity najde kód, zadá ho a zámek se
**odemkne a zezelená** 🔓.

Vzhled je laděný do **fyziky a dílny** – podklad jako rýsovací papír,
technické kreslené značky místo emoji, „dílenské štítky“.

Web je čistě statický (HTML + CSS + JavaScript) – nepotřebuje žádný server ani
databázi. Běží zdarma na GitHub Pages: **https://mrkonopa.github.io/plosova/**

**Kódy jsou tajné:** na web se ukládá jen tzv. *otisk* kódu, ne kód sám.
Žák tedy kód nenajde ani v „zobrazit zdrojový kód stránky“. Podrobněji
v kapitole [Proč žáci kódy nenajdou](#proč-žáci-kódy-nenajdou).

## Jak to funguje pro žáky

1. Na **úvodní stránce** si žák vybere svoji **třídu** a klikne na **únikovku**.
2. Otevře se **stránka únikovky** se seznamem **zámků (aktivit)**.
3. U každého zámku zadá kód, který u dané aktivity našel, a klikne na
   **Odemknout**.
4. Při správném kódu zámek **zezelená** 🎉 a nahoře se plní ukazatel postupu
   (např. „Odemčeno 3 ze 7 zámků“).
5. Odemčené zámky zůstanou zelené i po obnovení stránky (uloženo v prohlížeči).

Na velikosti písmen, mezerách ani háčcích a čárkách nezáleží – `síla 12`
i `SILA12` projde stejně.

## Přidání únikovky – krok za krokem

### 1) Otevřete „Dílnu kódů“

Otevřete v prohlížeči soubor **`admin.html`** (stačí na něj poklikat).
Je to neveřejný nástroj jen pro vás.

### 2) Vyplňte únikovku

- **třídu** (6.–9.),
- **název únikovky** – ten uvidí žáci na úvodní stránce,
- **popisek** a **značku** (nepovinné),
- **počet zámků** – podle toho se objeví řádky,
- u každého zámku **název aktivity** (nepovinný) a **kód**.

Když název aktivity necháte prázdný, žák uvidí „Zámek 1“, „Zámek 2“, …

### 3) Klikněte na „Vyrobit otisky“

Nástroj vypíše hotový blok. Vypadá takhle – **kódy v něm nikde nejsou**:

```js
        {
          nazev: "Elektrické obvody",
          popis: "Projdi měřicí stanoviště a odemkni všechny zámky.",
          symbol: "obvod",
          zamky: [
            { nazev: "Měření odporu", otisk: "v1$200000$8f2c…$b71a…" },
            { nazev: "Napětí na zdroji", otisk: "v1$200000$4e01…$29dd…" },
            { otisk: "v1$200000$c93b…$7f60…" }
          ]
        }
```

### 4) Blok vložte do `js/data.js`

Otevřete **`js/data.js`**, najděte svoji třídu a blok vložte mezi hranaté
závorky `unikovky: [ ]`. Když už tam jedna únikovka je, oddělte je čárkou:

```js
      unikovky: [
        { …první únikovka… },
        { …druhá únikovka… }
      ]
```

### 5) Uschovejte si opis kódů

V dílně dole je **opis kódů pro vás**. Uložte si ho nebo vytiskněte –
z webu už kódy zpětně zjistit nepůjdou, ani vy je z něj nepřečtete.

### 6) Změny nahrajte na GitHub

Po nahrání do větve `main` se web sám znovu zveřejní (viz níže).

## Jak volit kódy

- **Aspoň 5–6 znaků** a ideálně s číslicí: `OHM472` je lepší než `OHM`.
- **Nepoužívejte slovo, které je na stránce vidět** – když se aktivita jmenuje
  „Měření odporu“, kód `ODPOR` žák uhodne bez měření. Dílna kódů na to sama
  upozorní.
- Kódy se **můžou opakovat** u více zámků, na webu to nejde poznat.

## Soubory

| Soubor / složka     | K čemu slouží                                                    |
| ------------------- | ---------------------------------------------------------------- |
| `index.html`        | Úvodní stránka – třídy a názvy únikovek (odkazy)                  |
| `unikovka.html`     | Stránka jedné únikovky – zde žák zadává kódy zámků                |
| `admin.html`        | **Neveřejná** „Dílna kódů“ – vyrobí hotový blok do dat            |
| `js/data.js`        | **Obsah webu** – třídy, únikovky a zámky (tady se vše upravuje)   |
| `js/symboly.js`     | Kreslené technické značky (seznam názvů níže)                     |
| `js/common.js`      | Společné funkce (neupravuje se)                                   |
| `js/hash.js`        | Tajné kódy – výpočet a ověření otisku (neupravuje se)             |
| `js/index.js`       | Logika úvodní stránky (neupravuje se)                             |
| `js/unikovka.js`    | Logika stránky únikovky (neupravuje se)                           |
| `css/styles.css`    | Vzhled                                                            |
| `tools/otisk.mjs`   | Totéž co dílna, ale pro příkazovou řádku (nepovinné)              |

### Dostupné symboly (`symbol: "..."`)

`obvod`, `mereni`, `dilna`, `magnet`, `sila`, `teplota`, `optika`, `kladka`,
`kapalina`, `zvuk`, `cas`, `zamek`, `otevreno`, `hotovo`

## Proč žáci kódy nenajdou

Do `js/data.js` se neukládá kód, ale jeho **otisk**:

```
v1$200000$1f3c…$9ab2…
 │   │      │     └─ výsledek výpočtu
 │   │      └─────── náhodná „sůl“ – u každého zámku jiná
 │   └────────────── 200 000 opakování výpočtu
 └────────────────── verze zápisu
```

- Výpočet jde **jen jedním směrem** – z otisku se kód spočítat nedá.
- **Sůl** je u každého zámku jiná, takže ani nejde poznat, že se stejný kód
  opakuje, a nepomůžou předpočítané tabulky.
- **200 000 opakování** znamená, že jedno ověření trvá ~0,1 s (žák si toho
  nevšimne), ale zkoušení kódů „hrubou silou“ trvá u jednoho zámku desítky
  hodin. Proto ten požadavek na delší kód s číslicí.

Stránka `admin.html` je označená jako neveřejná (`noindex`) a sama o sobě
žádné kódy neobsahuje – jen je umí přepočítat na otisk.

Na školní únikovku je tohle bohatě dost. Není to ale trezor: kdo by měl
silný počítač, spoustu času a **krátký nebo uhodnutelný kód**, teoreticky by
se k němu dostat mohl.

## Nástroj pro příkazovou řádku (nepovinné)

Kdo raději píše do terminálu, může místo `admin.html` použít:

```bash
node tools/otisk.mjs OHM472 VOLT12          # vypíše otisky
node tools/otisk.mjs --zamky "Měření odporu=OHM472" "Napětí=VOLT12"
node tools/otisk.mjs --over "v1$200000$…" OHM472   # ověří, zda kód sedí
```

Výsledek je zaměnitelný s dílnou – oba nástroje počítají otisk stejně.

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

**Zapomněla jsem kód – dá se z webu zjistit?**
Ne, a to je záměr. Proto si v kroku 5 uschovejte opis kódů. Když se kód
ztratí, vyrobte v dílně nový otisk a nahraďte ten starý.

**Zámky zůstávají zelené i po zavření – jak je resetovat?**
Stav je uložený v prohlížeči (localStorage). Smazání: otevřete na stránce
vývojářskou konzoli (F12) a zadejte `localStorage.clear()`, nebo vymažte data
webu v nastavení prohlížeče.

**Zámek píše „Tenhle zámek ještě nemá nastavený kód.“**
U toho zámku chybí v `js/data.js` položka `otisk`. Doplňte ji z dílny kódů.
