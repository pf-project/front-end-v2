import Loadable from "react-loadable";
import Loading from "enl-components/Loading";

// Gestion Utilisateur
export const GestionUtilisateur = Loadable({
  loader: () =>
    import(
      "./Pages/modules/Administration/GestionUtilisateur/GestionUtilisateur"
    ),
  loading: Loading
});

// logistique :
// // Parametrage :
// // // Catgeorie :
// // // // index :

export const Categorie = Loadable({
  loader: () =>
    import("./Pages/modules/Logistique/parametrage/Categorie/index"),
  loading: Loading
});

// // // // Create Categorie

export const CreerCategorie = Loadable({
  loader: () =>
    import(
      "./Pages/modules/Logistique/parametrage/Categorie/CreeCategorie/CreeCategorie"
    ),
  loading: Loading
});

//// Donne de bas :
// // // Article
// // // // index :
export const Article = Loadable({
  loader: () => import("./Pages/modules/Logistique/donneDeBase/Article/index"),
  loading: Loading
});

// // // // Create Article
export const CreerArticle = Loadable({
  loader: () =>
    import(
      "./Pages/modules/Logistique/donneDeBase/Article/CreeArticle/CreerArticle"
    ),
  loading: Loading
});

// // // // Gerer Article
export const GererArticle = Loadable({
  loader: () =>
    import(
      "./Pages/modules/Logistique/donneDeBase/Article/GererArticle/GererArticle"
    ),
  loading: Loading
});

// // // // List Article
export const ListerArticles = Loadable({
  loader: () =>
    import(
      "./Pages/modules/Logistique/donneDeBase/Article/ListerArticles/ListerArticles"
    ),
  loading: Loading
});

// export const DashboardPage = Loadable({
//   loader: () => import("./Pages/Dashboard"),
//   loading: Loading
// });
// export const Table = Loadable({
//   loader: () => import("./Pages/Table/BasicTable"),
//   loading: Loading
// });
// export const Form = Loadable({
//   loader: () => import("./Pages/Forms/ReduxForm"),
//   loading: Loading
// });
export const Login = Loadable({
  loader: () => import("./Pages/Users/Login"),
  loading: Loading
});
// export const Register = Loadable({
//   loader: () => import("./Pages/Users/Register"),
//   loading: Loading
// });
export const ResetPassword = Loadable({
  loader: () => import("./Pages/Users/ResetPassword"),
  loading: Loading
});
export const ComingSoon = Loadable({
  loader: () => import("./Pages/ComingSoon"),
  loading: Loading
});

export const FirstLogin = Loadable({
  loader: () => import("./Pages/First-Login"),
  loading: Loading
});
export const BlankPage = Loadable({
  loader: () => import("./Pages/BlankPage"),
  loading: Loading
});
export const NotFound = Loadable({
  loader: () => import("./NotFound/NotFound"),
  loading: Loading
});
export const Error = Loadable({
  loader: () => import("./Pages/Error"),
  loading: Loading
});
export const Maintenance = Loadable({
  loader: () => import("./Pages/Maintenance"),
  loading: Loading
});
export const Parent = Loadable({
  loader: () => import("./Parent"),
  loading: Loading
});
export const NotFoundDedicated = Loadable({
  loader: () => import("./Pages/Standalone/NotFoundDedicated"),
  loading: Loading
});
