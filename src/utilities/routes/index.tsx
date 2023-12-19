import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routePath";
import { useAppSelector } from "utilities/hooks";
import { RootState } from "store";

const Routing = () => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const isAuthenticated = token?.access_token;

  function PrivateRoute() {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  }
  return (
    <Routes>
      {privateRoutes.map((route, index) => {
        if (route.children) {
          const Children = () => {
            return (
              <Routes>
                {route?.children?.map((child, index) => {
                  return (
                    <Route key={`${index}-xxx`} element={<PrivateRoute />}>
                      <Route
                        path={child.path}
                        key={`${index}-sss`}
                        index={child.index}
                        element={child.element}
                      />
                    </Route>
                  );
                })}
              </Routes>
            );
          };

          return (
            <Route
              key={`${index}-yyy`}
              path={route.path}
              element={<Children />}
            />
          );
        }

        return (
          <Route key={`${index}-xxx`} element={<PrivateRoute />}>
            <Route
              key={Math.random()}
              path={route.path}
              element={route.element}
            />
          </Route>
        );
      })}

      {publicRoutes.map((publicRoute) => {
        if (publicRoute.children) {
          const Children = () => {
            return (
              <Routes>
                {publicRoute?.children?.map((child, index) => {
                  return (
                    <Route
                      path={child.path}
                      key={index}
                      index={child.index}
                      element={child.element}
                    />
                  );
                })}
              </Routes>
            );
          };
          return (
            <Route
              key={Math.random()}
              path={publicRoute.path}
              element={<Children />}
            />
          );
        }

        return (
          <Route
            key={Math.random()}
            path={publicRoute.path}
            element={publicRoute.element}
          />
        );
      })}
    </Routes>
  );
};

export default Routing;
