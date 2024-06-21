import { createWebHistory, createRouter } from "vue-router";
import userRoutes from './user'
import adminRoutes from './admin'

const routes = [
   ...userRoutes,
   ...adminRoutes
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


router.beforeEach((to, from, next) => {
    if(to.path === '/')
    {
        document.title = `Login - Blog`
        next()
    }
    else if(to.path === '/register')
    {
        document.title = `Register - Blog`
        next()
    }
    else if(to.path === '/admin')
    {
        document.title = `Admin Login - Blog`
        next()
    }
    else
    {   if(localStorage.getItem('userToken'))
        {
            const userRole = localStorage.getItem('userRole')
            if(userRole === "user" && to.path.includes('/user'))
            {
                document.title = `${to.meta.title} - Blog`
                next()
            }
            else if(userRole === "admin" && to.path.includes('/admin'))
            {
                document.title = `${to.meta.title} - Blog`
                next()
            }
            else
            {
                document.title = `Blog`
                next(false)
            }
           
        }
        else
        {
            document.title = `Login - Blog`
            next('/')
        }
    }
})

export default router