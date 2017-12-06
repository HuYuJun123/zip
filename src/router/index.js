import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Scheme from '../components/scheme/Scheme.vue'
import Text from '../components/com/Text.vue'
import Texts from '../components/com/Texts.vue'
import Bulletin from '../components/bulletin/Bulletin.vue'
import Users from '../components/users/Users.vue'
import UserAdd from '../components/users/UserAdd.vue'
import UserList from '../components/users/UserList.vue'
import BulletinList from '../components/bulletin/BulletinList.vue'
import Matter from '../components/bulletin/Matter.vue'
import Amend from '../components/bulletin/Amend .vue'
import Create from '../components/bulletin/Create.vue'
import Search from '../components/all/Search.vue'
import Ptf from '../components/pdf/pdf.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/scheme',
      name: 'Scheme',
      component: Scheme,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      beforeEnter: (to, from, next) => {
        let coo='';
        let name = 'zhh=';
        let ca = document.cookie.split(';');
        for(let i=0; i<ca.length; i++)
        {
          let c = ca[i].trim();
          if (c.indexOf(name)===0) coo=c.substring(name.length,c.length);
        }
        if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
          if (coo!=='') {
            next();
          }
          else {
            next({
              path: '/',
              query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
          }
        }
      }
    },
    {
      path: '/text',
      name: 'Text',
      component: Text,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/texts',
      name: 'Texts',
      component: Texts,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/pdf',
      name: 'Ptf',
      component: Ptf,
    },
    {
      path: '/bulletin',
      component: Bulletin,
      children: [
        {
          path: '/',
          name: 'BulletinList',
          component: BulletinList
        },
        {
          path: 'matter',
          name: 'Matter',
          component: Matter
        },
      ],
    },
    {
      path: '/bulletin/amend',
      name: 'Amend',
      component: Amend,
    },
    {
      path: '/bulletin/matter/create',
      name: 'Create',
      component: Create,
    },
    {
      path: '/users',
      component: Users,
      children: [
        {
          path: '/',
          name: 'UserAdd',
          component: UserAdd
        },
        {
          path: 'userList',
          name: 'UserList',
          component: UserList
        }
      ],
    },
  ]
})
