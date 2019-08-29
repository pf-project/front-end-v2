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
        key: " Configuration : article",
        name: " Configuration : article",
        link: "/app/logistique/paramétrage/Configuration-article"
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
      }
    ]
  }
];
