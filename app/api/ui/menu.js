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
        key: " Configuration : Article",
        name: " Configuration : Article",
        link: "/app/logistique/paramétrage/configuration-Article"
      },
      {
        key: "Données de base",
        name: "Données de base",
        title: true
      },
      {
        key: "Ajouter Article",
        name: "Ajouter Article",
        link: "/app/logistique/Données-de-base/ajouter-Article"
      },
      {
        key: "modifier-Article",
        name: "Modifier Article",
        link: "/app/logistique/Données-de-base/modifier-Article"
      }
    ]
  }
];
