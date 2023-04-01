import Home from '~/pages/Home';

import { router as routerConfig } from '~/config/config';
import Message from '~/pages/Message';
import Profile from '~/pages/Profile';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Create from '~/pages/Create/Create';

const publicRoutes = [
    { path: routerConfig.login, component: Login, layout: null },
    { path: routerConfig.register, component: Register, layout: null },
];
const privateRoutes = [
    { path: routerConfig.home, component: Home },
    { path: routerConfig.search, component: Home },
    { path: routerConfig.explore, component: Home },
    { path: routerConfig.reels, component: Home },
    { path: routerConfig.message, component: Message },
    { path: routerConfig.create, component: Create },
    { path: routerConfig.profile, component: Profile },
    { path: routerConfig.login, component: Login, layout: null },
    { path: routerConfig.register, component: Register },
    { path: routerConfig.chatdetail, component: Message }
];
export { publicRoutes, privateRoutes };
