import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '~/router/Router';
import DefaultLayout from '~/layout/DefaultLayout';
import { useSelector } from 'react-redux';
import { router as routerConfig } from '~/config/config';

function App() {
    const currentUser = true;
    let routerCheck = publicRoutes;

    if (currentUser) {
        routerCheck = privateRoutes;
    }
    return (
        <Router>
            <div className="App">
                <Routes>
                    {routerCheck.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        } else {
                            Layout = DefaultLayout;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
