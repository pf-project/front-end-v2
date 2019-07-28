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
        icon: "border_color",
        link: "/app/gestion-utilisateur"
      }
    ]
  },
  {
    key: "logistique",
    name: "Logistique",
    icon: "home",
    child: [
      {
        key: "paramétrage",
        name: "Paramétrage",
        title: true
      },
      {
        key: " Configuration : Article",
        name: " Configuration : Article",
        icon: "border_color",
        link: "/app/logistique/paramétrage/configuration-Article"
      },
      {
        key: "Données de base",
        name: "Données de base",
        title: true
      },
      {
        key: " Article",
        name: "Article",
        icon: "border_color",
        link: "/app/logistique/Données-de-base/Article"
      }
    ]
  }
];
