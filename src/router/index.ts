import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const HelloWorld = () => import('@/components/HelloWorld.vue')
// @ts-ignore
const Home=()=>import('../page/Home')
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'index',
        meta: {
            title: '首页'
        },
        component: HelloWorld
    },{
    path:'/home',
        name:'Home',
        component:Home
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
