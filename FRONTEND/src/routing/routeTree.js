import { createRootRoute } from "@tanstack/react-router";
import App from "../App";
import { homepageRoute } from "./homepage.route";
import { authRoute } from "./auth.route";
import { DashboardRoute } from "./dashboard.route";

export const rootRoute = createRootRoute({
  component: App,
});

export const routeTree = rootRoute.addChildren([
  homepageRoute,
  authRoute,
  DashboardRoute,
]);
