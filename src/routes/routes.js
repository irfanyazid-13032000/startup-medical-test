import { createRouter, createWebHistory } from 'vue-router'

// import About from '../views/About.vue'
// import Home from '../views/Home.vue'
// import Patient from '../views/Patient.vue'
// import Movie from '../views/Movie.vue'

const Home = () => import('../views/Home.vue')
const About = () => import('../views/About.vue')
const Patient = () => import('../views/Patient.vue')
const Movie = () => import('../views/Movie.vue')
const MovieDetail = () => import('../views/MovieDetails.vue')

const routes = [
  {path : '/',component:Home},
  {path : '/about',component:About},
  {path : '/patient',component:Patient},
  {path : '/movie',component:Movie},
  {path : '/movie/:id',component:MovieDetail},
]

const router = createRouter({
  history:createWebHistory(),
  routes:routes
})

export default router