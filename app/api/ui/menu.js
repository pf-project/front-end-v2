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
      }
    ]
  }
];
