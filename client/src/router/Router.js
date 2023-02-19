import Home from '~/pages/Home';

import { router as routerConfig } from '~/config/config';
import Message from '~/pages/Message';
import Profile from '~/pages/Profile';

const publicRoutes = [
    { path: routerConfig.home, component: Home },
    { path: routerConfig.search, component: Home },
    { path: routerConfig.explore, component: Home },
    { path: routerConfig.reels, component: Home },
    { path: routerConfig.message, component: Message },
    { path: routerConfig.notification, component: Home },
    { path: routerConfig.create, component: Home },
    { path: routerConfig.profile, component: Profile },
    { path: routerConfig.login, component: Home },
    { path: routerConfig.register, component: Home },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
