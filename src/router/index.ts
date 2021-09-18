// 1. Define route components.
// These can be imported from other files
import {createRouter, createWebHashHistory} from "vue-router"
import Home from "../pages/home.vue"
import Signin from "../pages/signin.vue"
import About from "../pages/about.vue"
import Write from "../pages/write.vue"
import Register from '../pages/register.vue'
import User from '../pages/user.vue'
// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Home },
  { path: '/signin', component: Signin },
  { path: '/about', component: About },
  { path: '/write', component: Write },
  { path: '/register', component: Register },
  { path: '/user', component: User }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export default createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

