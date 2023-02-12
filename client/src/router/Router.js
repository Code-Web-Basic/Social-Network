import Home from '~/pages/Home';

import { router as routerConfig } from '~/config/config';
import Login from '~/pages/Login';
import Register from '~/pages/Register';

const publicRoutes = [
    { path: routerConfig.login, component: Login, layout: null },
    { path: routerConfig.register, component: Register, layout: null },
];
const privateRoutes = [
    { path: routerConfig.home, component: Home },
    { path: routerConfig.search, component: Home },
    { path: routerConfig.explore, component: Home },
    { path: routerConfig.reels, component: Home },
    { path: routerConfig.message, component: Home },
    { path: routerConfig.notification, component: Home },
    { path: routerConfig.create, component: Home },
    { path: routerConfig.profile, component: Home },
    { path: routerConfig.login, component: Login, layout: null },
    { path: routerConfig.register, component: Register },
];
export { publicRoutes, privateRoutes };
