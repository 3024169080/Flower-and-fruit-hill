import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router= new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: 'active',
  routes: [
    {
      path: "/",
      component: () => import('./views/index')
    },
    {
      path: "/manzhan",
      component: () => import("./views/manzhan")
    },
    {
      path: "/login",
      component: () => import("./views/login")
    },
    {
      path: "/quanzi",
      component: () => import("./views/quanzi"),
      meta:{
        auth:true
      },
      children:[
        {
          path:"",
          component:()=>import("./components/quanzicom")
        },
        {
          path:"quanzidianzan",
          component:()=>import("./components/quanzidianzan")
        },
        {
          path:"quanzipinglun",
          component:()=>import("./components/quanzipinglun")
        },
        {
          path:"quanzishoucang",
          component:()=>import("./components/quanzishoucang")
        }
      ]
    },
    {
      path: "/zhuce",
      component: () => import("./views/zhuce")
    },
    {
      path: "/pay",
      component: () => import("./views/pay"),
      meta:{
        auth:true
      }
    },
    {
      path:"/geren",
      component:() =>import("./views/geren"),
      redirect:"/ziliao",
      meta:{
        auth:true
      },
      children:[
        {
          path:"/ziliao",
          component:()=>import("./views/geren/ziliao")
        },
        {
          path:"/dingdan",
          component:()=>import("./views/geren/dingdan")
        },
        {
          path:"/menpiao",
          component:()=>import("./views/geren/menpiao")
        },
        {
          path:"/xiugaimima",
          component:()=>import("./views/geren/xiugaimima")
        }
      ]
    },
    {
      path:"/yonghu",
      component:()=>import('./views/yonghu'),
      meta:{
        auth:true
      },
      children:[
        {
          path:"/yonghu",
          component:()=>import('./components/yonghu/shuliandong')
        },
        {
          path:"/xiangce",
          component:()=>import('./components/yonghu/xiangce')
        },
        {
          path:"/guanzhu",
          component:()=>import('./components/yonghu/guanzhu')
        },{
          path:"/fensi",
          component:()=>import('./components/yonghu/fensi')
        }
      ]
    },
    {
      path:'/fabu',
      component:()=>import('./views/fabu'),
      meta:{
        auth:true
      }
    },
    {
      path:'/banqu',
      component:()=>import('./views/banqu')
    },
    {
      path:"/qianbao",
      component:()=>import("./views/qianbao"),
      meta:{
        auth:true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(route => route.meta.auth)) {
		if (localStorage.getItem("login")) {
      next();
		} else {
			next("/login")
		}
	} else {
		next();
	}
})

export default router;