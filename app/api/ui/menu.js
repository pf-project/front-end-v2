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
        key: "Ajouter-Article",
        name: "Ajouter Article",
        icon: "border_color",
        link: "/app/logistique/Données-de-base/ajouter-Article"
      },
      {
        key: "gerer-article",
        name: "Gerer Article",
        icon: "border_color",
        link: "/app/logistique/Données-de-base/gerer-Article"
      }
    ]
  }
];
