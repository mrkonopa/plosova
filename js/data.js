/* ==========================================================================
   DATA ÚNIKOVEK
   --------------------------------------------------------------------------
   Tady se upravuje OBSAH webu – třídy, únikovky a jejich ZÁMKY.
   Nemusíte rozumět programování, stačí dodržet tvar zápisu níže.

   Struktura:
     třída  ➜  únikovky  ➜  zámky

   Každá ÚNIKOVKA má:
     - nazev:  název únikovky
     - popis:  krátký popisek (nepovinné)
     - symbol: název značky (viz js/symboly.js), nepovinné
     - zamky:  seznam zámků

   Každý ZÁMEK = jedna aktivita:
     - nazev:  název aktivity (např. "Měření odporu")
     - symbol: název značky (nepovinné)
     - hash:   OTISK kódu (NE samotný kód!)

   JAK ZÍSKAT OTISK KÓDU?
   Otevřete "admin.html" v prohlížeči, napište kód a zkopírujte
   vygenerovaný otisk sem do políčka "hash".

   ---------------------------------------------------------------------------
   VZOR – takhle vypadá jedna hotová únikovka (zkopírujte a upravte):

     {
       nazev: "Název únikovky",
       popis: "Krátký popisek pro žáky.",
       symbol: "obvod",
       zamky: [
         { nazev: "Název aktivity", symbol: "mereni", hash: "sem vložit otisk" },
         { nazev: "Název aktivity", symbol: "dilna",  hash: "sem vložit otisk" }
       ]
     }
   ========================================================================== */

const DATA_UNIKOVEK = {
  nadpis: "Únikovky paní učitelky Plosové",
  podnadpis: "Vyber svou třídu, projdi aktivity a odemkni všechny zámky.",

  tridy: [
    {
      nazev: "6. třída",
      symbol: "mereni",
      unikovky: []
    },
    {
      nazev: "7. třída",
      symbol: "obvod",
      unikovky: []
    },
    {
      nazev: "8. třída",
      symbol: "sila",
      unikovky: []
    },
    {
      nazev: "9. třída",
      symbol: "optika",
      unikovky: []
    }
  ]
};
