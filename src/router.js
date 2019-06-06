import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index.vue'
import AddBurger from '@/components/AddBurger.vue'
import EditBurger from '@/components/EditBurger.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-burger',
      name: 'AddBurger',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AddBurger
    },
    {
      path: '/edit-burger/:burger_slug',
      name: 'EditBurger',
      component: EditBurger
    }
  ]
})
