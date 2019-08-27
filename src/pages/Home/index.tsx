import * as React from "react";
import { Redirect } from "react-router-dom";
import { restrictedRoutes } from "../../constants/routes";

const Home = () => <Redirect to={restrictedRoutes.users.path} />;

export default Home;
