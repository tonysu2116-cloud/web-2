// Thin wrapper around react-router-dom. vite.config.ts aliases
// "react-router-dom" to this file so every import in the app keeps working
// exactly as before, with one addition: when route messaging is enabled
// (VITE_ENABLE_ROUTE_MESSAGING=true, wired through __ROUTE_MESSAGING_ENABLED__),
// the top-level router posts the current location to the parent frame —
// used by the hosted preview/editor to track navigation inside the iframe.
import { useEffect, type ComponentType, type ReactNode } from "react";
import {
  BrowserRouter as OriginalBrowserRouter,
  HashRouter as OriginalHashRouter,
  MemoryRouter as OriginalMemoryRouter,
  useLocation,
} from "react-router-dom-original";

export * from "react-router-dom-original";

declare const __ROUTE_MESSAGING_ENABLED__: boolean | undefined;

function RouteMessenger() {
  const location = useLocation();

  useEffect(() => {
    if (typeof __ROUTE_MESSAGING_ENABLED__ === "undefined" || !__ROUTE_MESSAGING_ENABLED__) {
      return;
    }
    if (typeof window === "undefined" || window.parent === window) return;
    try {
      window.parent.postMessage(
        {
          type: "route-change",
          source: "app-preview",
          pathname: location.pathname,
          search: location.search,
          hash: location.hash,
        },
        "*",
      );
    } catch {
      // Cross-origin or sandboxed preview — nothing to do.
    }
  }, [location.pathname, location.search, location.hash]);

  return null;
}

function withRouteMessaging<P extends { children?: ReactNode }>(
  Router: ComponentType<P>,
) {
  return function RouterWithMessaging(props: P) {
    return (
      <Router {...props}>
        <RouteMessenger />
        {props.children}
      </Router>
    );
  };
}

export const BrowserRouter = withRouteMessaging(OriginalBrowserRouter);
export const HashRouter = withRouteMessaging(OriginalHashRouter);
export const MemoryRouter = withRouteMessaging(OriginalMemoryRouter);
