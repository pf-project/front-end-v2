module.exports = [
  {
    key: "administration",
    name: "Administration",
    icon: "home",
    child: [
      {
        key: "utilisateurs",
        name: "Utilisateurs",
        title: true
      },
      {
        key: "gestion utilisateurs",
        name: "Gestion utilisateurs",
        link: "/app/administration/gestion-utilisateur"
      }
    ]
  },
  {
    key: "logistique",
    name: "Logistique",
    icon: "build",
    child: [
      {
        key: "paramétrage",
        name: "Paramétrage",
        title: true
      },
      {
        key: " Configuration : Article",
        name: " Configuration : Article",
        link: "/app/logistique/paramétrage/Configuration-article"
      },
      {
        key: " Configuration : Service",
        name: " Configuration : Service",
        link: "/app/logistique/paramétrage/Configuration-Service"
      },

      {
        key: " Configuration de base",
        name: " Configuration de base",
        link: "/app/logistique/paramétrage/Configuration-de-base"
      },
      {
        key: "Données de base",
        name: "Données de base",
        title: true
      },
      {
        key: "Article",
        name: "Article",
        link: "/app/logistique/Données-de-base/article"
      },
      {
        key: "Service",
        name: "Service",
        link: "/app/logistique/Données-de-base/Service"
      },
      {
        key: "Fournisseur",
        name: "Fournisseur",
        link: "/app/logistique/Données-de-base/Fournisseur"
      }
    ]
  },
  {
    key: "comptabilite",
    name: "Comptabilité",
    icon: "notes",
    child: [
      {
        key: "Données de base",
        name: "Données de base",
        title: true
      },
      {
        key: "Caisse",
        name: "Caisse",
        link: "/app/comptabilité/Données-de-base/Caisse"
      },
      {
        key: "Compte bancaire",
        name: "Compte bancaire",
        link: "/app/comptabilité/Données-de-base/Compte-bancaire"
        // link: "/app/Comptabilite/Données-de-base/Caisse"
      },
      {
        key: "Compte général",
        name: "Compte général",
        link: "/app/Comptabilite/Données-de-base/comptes-généraux"
      },
      {
        key: "Comptabilié générale",
        name: "Comptabilié générale",
        title: true
      },
      {
        key: "Ecriture comptable",
        name: "Ecriture comptable",
        link: "/app/comptabilité/comptablité-générale/écriture-journale"
      }
    ]
  }
];
