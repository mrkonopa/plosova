/* ==========================================================================
   DATA ÚNIKOVEK
   --------------------------------------------------------------------------
   Tady se upravuje OBSAH webu – třídy, únikovky a jejich ZÁMKY.
   Nemusíte rozumět programování, stačí dodržet tvar zápisu níže.

   Struktura:
     třída  ➜  únikovky  ➜  zámky

   Každá TŘÍDA má:
     - nazev:    název třídy (např. "6.A")
     - emoji:    nepovinná ikonka u třídy
     - unikovky: seznam únikovek

   Každá ÚNIKOVKA má:
     - nazev:  název únikovky
     - popis:  krátký popisek (nepovinné)
     - zamky:  seznam zámků (každý zámek = jeden kód k odemčení)

   Každý ZÁMEK má:
     - nazev:  název / úkol zámku (např. "Matematická hádanka")
     - hash:   ZAŠIFROVANÝ kód (NE samotný kód!)

   JAK ZÍSKAT HASH KÓDU?
   Otevřete soubor "admin.html" v prohlížeči, napište kód a zkopírujte
   vygenerovaný hash sem do políčka "hash".
   ========================================================================== */

const DATA_UNIKOVEK = {
  // Nadpis a podnadpis na stránce – klidně si upravte
  nadpis: "Únikovky paní učitelky Plosové",
  podnadpis: "Vyber svou třídu, vyřeš úkoly a odemkni všechny zámky 🔓",

  tridy: [
    {
      nazev: "6.A",
      emoji: "📚",
      unikovky: [
        {
          nazev: "Tajemství staré knihovny",
          popis: "Najdi ukryté šifry mezi knihami a otevři všechny zámky.",
          zamky: [
            { nazev: "Zámek 1 – Název knihy", hash: "0a64349a57ecc1ab6e9ef8638d92af7980793ab8ef41bbde46d2520b9015cd5c" }, // kód: KNIHA
            { nazev: "Zámek 2 – Tajný inkoust", hash: "87594ff78ffa5b4e2a48853af065abc0da116efc9a8c9511955552cfa07c0363" }, // kód: INKOUST
            { nazev: "Zámek 3 – Starý pergamen", hash: "c948716466dccd1ffb72639dda1bb13a0d700a8a0928b16d557958210b95614d" }  // kód: PERGAMEN
          ]
        },
        {
          nazev: "Záhada v laboratoři",
          popis: "Slož správné chemické pojmy.",
          zamky: [
            { nazev: "Zámek 1 – Nejmenší částice", hash: "d41a7ab11ec9c1b99de034b9ee304c1b4d61778355d9bfcff9570b5ad56aac48" }, // kód: ATOM
            { nazev: "Zámek 2 – Plyn pro dýchání", hash: "b7ea834e8de8f4fc59eab525b7acf6779679b108e3d244ffceda5a0cd66dd88d" }, // kód: KYSLIK
            { nazev: "Zámek 3 – Co se děje v baňce", hash: "9e419ab3726fefbdc0a0583c670536670b4a64856240ff2ee0609d7dd0cf60bd" }  // kód: REAKCE
          ]
        }
      ]
    },
    {
      nazev: "6.B",
      emoji: "🏛️",
      unikovky: [
        {
          nazev: "Poklad faraonů",
          popis: "Rozlušti hieroglyfy a otevři hrobku.",
          zamky: [
            { nazev: "Zámek 1 – Vládce Egypta", hash: "d9e6bd1aba3310af255b244d7f7dd9a53f295f8e8b807a60948112152dfff835" }, // kód: FARAON
            { nazev: "Zámek 2 – Stavba v poušti", hash: "0ff6b347439d374e5599b04f9eb421a070235cc714d8ea8859a3c4b67f6ef38a" }, // kód: PYRAMIDA
            { nazev: "Zámek 3 – Strážce s tělem lva", hash: "f8b0f7b2459584a4f3b1eb4e056a90e97aba4b643c088054a8baba8ff6b5ac43" }  // kód: SFINGA
          ]
        },
        {
          nazev: "Rytířská výprava",
          popis: "Projdi hradem a najdi všechna hesla.",
          zamky: [
            { nazev: "Zámek 1 – Zbraň rytíře", hash: "adaa66d94130b2e293f75d275c11cd9a17bbc295afaa914251a699beaa732d33" }, // kód: MEC
            { nazev: "Zámek 2 – Ochrana v boji", hash: "3b7d6194342b1a83f0b80b5665882e07b4d32a87f64c6a20c50cde7df96cc359" }, // kód: STIT
            { nazev: "Zámek 3 – Sídlo pána", hash: "fe64afb690dcaa7b2a61773d62942d4ea34a62f9c21010f792ca4e32ec2fbe63" }  // kód: HRAD
          ]
        }
      ]
    },
    {
      nazev: "7.A",
      emoji: "🚀",
      unikovky: [
        {
          nazev: "Cesta do vesmíru",
          popis: "Naviguj raketu ke správnému cíli.",
          zamky: [
            { nazev: "Zámek 1 – Náš dopravní prostředek", hash: "9d9e1dea63fb2ce95989d77662f2b2ba9fdb55bf85a077ff782dafb364bd5d9a" }, // kód: RAKETA
            { nazev: "Zámek 2 – Rudá planeta", hash: "24d85ee2a5b8711a2a09801e305c1de95c4d952b99cbfc10427bdd008072dea4" }, // kód: MARS
            { nazev: "Zámek 3 – Svítí na nebi", hash: "ef66e2cee79a7cf1502d32c77d2ca78b32ea68855813786d266b32118dcc9d62" }  // kód: HVEZDA
          ]
        },
        {
          nazev: "Detektivní kancelář",
          popis: "Vyřeš případ podle indicií.",
          zamky: [
            { nazev: "Zámek 1 – Otisk na zemi", hash: "9edcfd9e07a1b3d35d2c377abbaa14a2f14bd0b7ed54cbda21e1f7b4ea4a0403" }, // kód: STOPA
            { nazev: "Zámek 2 – Nástroj detektiva", hash: "7e621229a2713555a6879a38dc2d65ee661fe5c0a30113b78160bf91954a6129" }, // kód: LUPA
            { nazev: "Zámek 3 – Kdo to udělal", hash: "cdebd2aef9917ebfce9eb435d90c6eb85ff59c2b622fa46259bd62757eb09499" }  // kód: PACHATEL
          ]
        }
      ]
    },
    {
      nazev: "8.A",
      emoji: "🌋",
      unikovky: [
        {
          nazev: "Probuzená sopka",
          popis: "Najdi cestu ven, než vybuchne.",
          zamky: [
            { nazev: "Zámek 1 – Žhavá hmota", hash: "4175a16e600190a56d8a608e9885c6dc9eeb66536cf6de8909d0380d860d8f25" }, // kód: LAVA
            { nazev: "Zámek 2 – Zbyde po ohni", hash: "43ab9e55f14c32f29b0186c8a6a513be3a8e03149de10411b63c6b27eb4c3b48" }, // kód: POPEL
            { nazev: "Zámek 3 – Záchrana", hash: "1e955c3e67362dfa4d03b5c086609987f9c25e10c2e65b2db83ba3540fe2cca4" }  // kód: UTEK
          ]
        },
        {
          nazev: "Stroj Enigma",
          popis: "Rozšifruj tajnou depeši.",
          zamky: [
            { nazev: "Zámek 1 – Otáčivá součástka", hash: "be7d6b1ae175ed50e54b252fca49bd4a54a785ccfafae2214136a0f444a989cd" }, // kód: ROTOR
            { nazev: "Zámek 2 – Tajná zpráva", hash: "da3956ebd1a4ecd2f89e47a002c6f40e52e3089c616854bf0142881a80da79b9" }, // kód: DEPESE
            { nazev: "Zámek 3 – Co odemyká", hash: "eccb56b6c6559c55e7ff9949ec3a99bbb103dde967a025e6f654776623891ad3" }  // kód: KLIC
          ]
        }
      ]
    }
  ]
};
