import Loadable from "react-loadable";

// logistique :
// // Parametrage :
export const CreerCategorie = Loadable({
  loader: () =>
    import(
      "./Pages/modules/Logistique/parametrage/CreeCategorie/CreeCategorie"
    ),
  loading: Loading
});

//// Donne de bas :
export const CreerArticle = Loadable({
  loader: () =>
    import("./Pages/modules/Logistique/donneDeBase/CreeArticle/CreerArticle"),
  loading: Loading
});

import Loading from "enl-components/Loading";

export const AdvancedTable = Loadable({
  loader: () => import("./Tables/AdvancedTable"),
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
