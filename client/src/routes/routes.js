import Home from '../views/Home'; 
import Test from '../views/test'; 
import test_input from '../views/test'; 

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/test',
        name: 'test',
        component: Test,
    },
    {
        path: '/test_input',
        name: 'test_input',
        component: test_input,
    },


];

export default routes;