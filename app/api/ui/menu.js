module.exports = [
  {
    key: "administration",
    name: "Administration",
    icon: "home",
    child: [
      {
        key: "gestion_utilisateur",
        name: "Gestion des utilisateurs",
        title: true
      },
      {
        key: "gerer",
        name: "Gérer",
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
        key: "lister-articles",
        name: "Lister articles",
        link: "/app/logistique/Données-de-base/lister-articles"
      },
      {
        key: "ajouter article",
        name: "Ajouter article",
        link: "/app/logistique/Données-de-base/Ajouter-article"
      },
      {
        key: "Gerer Article",
        name: "Gerer Article",
        link: "/app/logistique/Données-de-base/GererArticle"
      }
    ]
  }
];
