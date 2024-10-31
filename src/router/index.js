
import VueRouter from 'vue-router';

const routes = [
    {
        path:'/',
        name:'Login',
        component:()=>import('../components/Login.vue')
    },
    {
        path:'/index',
        name:'index',
        component:()=>import('../components/index.vue'),
        children:[
            {
                path:'/Home',
                name:'home',
                meta:{
                    title:'首页'
                },
                component:()=>import('../components/Home')
            },
            {
                path:'/Home2',
                name:'home2',
                meta:{
                    title:'个人中心'
                },
                component:()=>import('../components/Home2.vue')
            },
            {
                path:'/count',
                name:'count',
                component:()=>import('../components/count.vue')
            },
            {
                path:'/list',
                name:'list',
                component:()=>import('../components/list.vue')
            },
            {
                path:'/jiesuan',
                name:'jiesuan',
                component:()=>import('../components/jiesuan.vue')
            },
            {
                path:'/introduce',
                name:'introduce',
                component:()=>import('../components/introduce.vue')
            },
            {
                path:'/history',
                name:'history',
                component:()=>import('../components/history.vue')
            },
            {
                path:'/talk',
                name:'talk',
                component:()=>import('../components/talk.vue')
            },
            /*{
                path:'/Admin',
                name:'admin',
                meta:{
                    title:'管理员管理'
                },
                component:()=>import('../components/admin/AdminManage.vue')
            },
            {
                path:'/User',
                name:'user',
                meta:{
                    title:'用户管理'
                },
                component:()=>import('../components/user/UserManage.vue')
            },*/
        ]
    }
]

const router = new VueRouter({
    mode:'history',
    routes
})

export function resetRouter() {
    router.matcher = new VueRouter({
        mode:'history',
        routes: []
    }).matcher
}
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

export  default router;