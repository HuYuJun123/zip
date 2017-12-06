import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Scheme from '../components/scheme/Scheme.vue'
import Text from '../components/com/Text.vue'
import Bulletin from '../components/bulletin/Bulletin.vue'
import Users from '../components/users/Users.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/h',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'Scheme',
      component: Scheme
    },
    {
      path:'/text',
      name:'Text',
      component:Text
    },
    {
      path: '/bulletin',
      name:'Bulletin',
      component: Bulletin,
    },
    {
      path: '/users',
      name:'Users',
      component: Users,
    },
  ]
})
