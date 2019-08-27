import Users from "../pages/Users";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound/template";

export interface IRoutes {
  [key: string]: IRoute;
}

export interface IRoute {
  exact?: boolean;
  path: string;
  page: React.ComponentType<any>;
}

export const restrictedRoutes: IRoutes = {
  users: {
    page: Users,
    path: "/users"
  },
  home: {
    page: Home,
    path: "/"
  }
};

export const publicRoutes: IRoutes = {
  forgotpassword: {
    page: ForgotPassword,
    path: "/forgot-password"
  },
  login: {
    page: Login,
    path: "/login"
  },

  // Needs to be always the last route
  notFound: {
    page: NotFound,
    path: ""
  }
};
