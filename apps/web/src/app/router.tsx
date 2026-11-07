import { createBrowserRouter } from "react-router";

import { HomeRoute } from "@/app/routes/home";
import { ROUTE_PATHS } from "@/core/config/routes";

export const router = createBrowserRouter([{ path: ROUTE_PATHS.home, element: <HomeRoute /> }]);
