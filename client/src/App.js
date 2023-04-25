import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '~/router/Router';
import DefaultLayout from '~/layout/DefaultLayout';
import { useSelector, useStore } from 'react-redux';
import setUpInterceptor from './utils/interceptor';
// import { useCookies } from 'react-cookie';

function App() {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const store = useStore();
    // const [cookies, setCookie] = useCookies(['name']);
    // console.log(Cookies.get('refreshToken'));
    setUpInterceptor(store);
    // check user
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
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
