import { RouteObject, useRoutes } from "react-router-dom";

// component
import { Row, Spin } from "antd";
import { Suspense, lazy } from "react";
import { Route } from "./interface/app";
import NotFoundPage from "./pages/NotFound";
import DefaultRoute from "./routes/DefaultRoutes";
import Dev from "./pages/Dev";

export const DEFAULT_ROUTE: Route[] = [
  {
    path: "",
    element: () => import("src/pages/Home"),
  },
];
interface RouteElement {
  routeElement: () => Promise<any>;
  isPrivate?: boolean;
}
interface LazyRouteProps {
  routes: Route[];
}
function LazyElement({ routeElement }: RouteElement) {
  const LazyComponent = lazy(routeElement);
  return (
    <Suspense
      fallback={
        <Row className="h-screen w-full">
          <Spin size="large" className="m-auto" />
        </Row>
      }
    >
      <LazyComponent />
    </Suspense>
  );
}
function wrapRoutesWithLazy({ routes }: LazyRouteProps): RouteObject[] {
  return routes?.map((route: Route) => ({
    path: route.path,
    element: <LazyElement routeElement={route.element} />,
    ...(route.children && { children: wrapRoutesWithLazy({ routes: route.children }) }),
  }));
}
export default function useRouteElements() {
  const routeElements = [
    {
      path: "*",
      element: <NotFoundPage />,
    },
    {
      path: "/dev-mode",
      element: <Dev />,
    },
    {
      path: "/",
      element: <DefaultRoute />,
      children: wrapRoutesWithLazy({ routes: DEFAULT_ROUTE }),
    },
  ];
  return useRoutes(routeElements);
}
