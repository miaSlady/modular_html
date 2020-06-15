import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Routes = [
  { path: '*', redirect: '/readPlan' },
  {
    path: '/controPanel',
    name: '欢迎页面',
    component:() => import('@/views/HomePage/pages/homePage'),
    children: [
      {
        path: '/readPlan',
        name: '读书计划表',
        icon:'cluster',
        meta:{show:true,menuPath:'/readPlan',},
        component:() => import('@/views/ReadPlan/pages/readPlanList'),
      },
      {
        path: '/account',
        name: '子账号管理',
        icon:'idcard',
        meta:{show:true,menuPath:'/account',},
        component: () => import('@/views/Account/pages/account'),
      },
    
    ]
  }, 
  {
    path: '/login',
    name: '登录',
    component:() => import('@/views/Login/pages/login'),
  },
  {
    path: '/register',
    name: '注册',
    component:() => import('@/views/Login/pages/register'),
  },
 
]

const createRouter = () => new Router({
  routes: Routes
})

const router = createRouter()

router.beforeEach((to,from,next)=>{
  //1.判断是否登录 未登录跳转登录页
  // console.log('to',to);
  // if( to.path!='/login' &&  !sessionStorage.getItem("userName") ){
  //   return next({path:'/login'})
  // }
  // if(to.path=='/account' && sessionStorage.getItem("accountType")!=1){//1直属，2非直属   
  //   return next({path:'/controPanel'})
  // }
  next()
})
export default router;