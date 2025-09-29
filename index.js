import { createRouter, createWebHistory } from 'vue-router'
import RecipeList from '../components/RecipeList.vue'
import RecipeDetails from '../components/RecipeDetails.vue'

const routes = [
  { path: '/', name: 'RecipeList', component: RecipeList },
  { path: '/recipes/:id', name: 'RecipeDetails', component: RecipeDetails, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
   scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {

      return { top: 0 } // appears at the top when navigating to a new route
    }
  }
})
export default router
