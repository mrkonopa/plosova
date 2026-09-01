/* ==========================================================================
   DATA ÚNIKOVEK  ←  TADY SE UPRAVUJE CELÝ OBSAH WEBU
   --------------------------------------------------------------------------
   Nemusíte rozumět programování, stačí dodržet tvar zápisu.

   Struktura:   třída  ➜  únikovky  ➜  zámky

   ÚNIKOVKA:
     nazev   – název únikovky (uvidí ho žáci na úvodní stránce)
     popis   – krátký popisek (nepovinné)
     symbol  – název značky, viz js/symboly.js (nepovinné)
     zamky   – seznam zámků

   ZÁMEK = jedna aktivita:
     nazev   – název aktivity, např. "Měření odporu" (NEPOVINNÉ –
               když se vynechá, žák uvidí "Zámek 1", "Zámek 2", ...)
     symbol  – název značky (nepovinné)
     otisk   – OTISK KÓDU. Nikdy sem nepište samotný kód!

   ⚠ DŮLEŽITÉ: do souboru se píše jen OTISK, ne kód. Otisk vypadá takhle:
     "v1$200000$1f3c...$9ab2..."
   Ze stránky se z něj původní kód přečíst nedá, takže ho žáci v „zobrazit
   zdroj kódu“ nenajdou.

   JAK OTISK ZÍSKAT?
   Otevřete v prohlížeči soubor "admin.html" (Dílna kódů). Vyplníte název
   únikovky a kódy k jednotlivým zámkům a nástroj vypíše hotový blok, který
   se sem jen zkopíruje mezi hranaté závorky "unikovky: [ ]".

   ---------------------------------------------------------------------------
   VZOR – takhle vypadá jedna hotová únikovka:

     {
       nazev: "Elektrické obvody",
       popis: "Projdi měřicí stanoviště a odemkni všechny zámky.",
       symbol: "obvod",
       zamky: [
         { nazev: "Měření odporu",    symbol: "mereni", otisk: "v1$200000$....$...." },
         { nazev: "Napětí na zdroji", symbol: "sila",   otisk: "v1$200000$....$...." },
         { nazev: "Proud v obvodu",   symbol: "magnet", otisk: "v1$200000$....$...." }
       ]
     }

   Únikovek může být v jedné třídě víc – oddělují se čárkou:
     unikovky: [ { ...první... }, { ...druhá... } ]
   ========================================================================== */

const DATA_UNIKOVEK = {
  nadpis: "Únikovky paní učitelky Plosové",
  podnadpis: "Vyber svou třídu, projdi aktivity a odemkni všechny zámky.",

  tridy: [
    {
      nazev: "6. třída",
      symbol: "mereni",
      unikovky: [
        // sem přijdou únikovky pro 6. třídu
      ]
    },
    {
      nazev: "7. třída",
      symbol: "obvod",
      unikovky: [
        // sem přijdou únikovky pro 7. třídu
      ]
    },
    {
      nazev: "8. třída",
      symbol: "sila",
      unikovky: [
        // sem přijdou únikovky pro 8. třídu
      ]
    },
    {
      nazev: "9. třída",
      symbol: "optika",
      unikovky: [
        // sem přijdou únikovky pro 9. třídu
      ]
    }
  ]
};
