import {useLocation, Routes, Route} from "react-router-dom";
import {useEffect} from "react";
import {routes} from "../../routes";

const AppRouter = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <Routes>
            <>
                {routes.map(
                    ({ path, Component, childRoutes }) => (
                        <Route
                            key={path}
                            path={path}
                            element={<Component />}
                        >
                            {childRoutes &&
                            childRoutes.map((route) => {
                                const { path: childPath, Component: ChildComponent } = route;
                                return (
                                    <Route
                                        key={childPath}
                                        path={childPath}
                                        element={ChildComponent ? <ChildComponent /> : null}
                                    />
                                );
                            })}
                        </Route>
                    )
                )}

                <Route path='*' element={<div>not found</div>} />
            </>
        </Routes>
        )
}

export default AppRouter;