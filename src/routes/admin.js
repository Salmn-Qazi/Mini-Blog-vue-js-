import AdminLogin from '@/components/admin/Login.vue'
import Dashboard from '@/components/admin/Dashboard.vue'
import Users from '@/components/admin/User.vue'
import Blogs from '@/components/admin/blog/Index.vue'
import EditBlog from '@/components/admin/blog/Edit.vue'
import BlogDetails from '@/components/admin/blog/Details.vue'


const routes = [
    {
        path: '/admin',
        name: 'AdminLogin',
        component: AdminLogin,
        meta: {
            title: 'Admin Login'
        }
    },
    {
        path: '/admin/dashboard',
        name: 'adminDashboard',
        component: Dashboard,
        meta: {
            title: 'Dashboard'
        }
    },
    {
        path: '/admin/users',
        name: 'Users',
        component: Users,
        meta: {
            title: 'Users'
        }
    },
    {
        path: '/admin/blogs',
        name: 'Blogs',
        component: Blogs,
        meta: {
            title: 'Blogs'
        }
    },
    {
        path: '/admin/blog/edit/:id',
        name: 'adminEditBlog',
        component: EditBlog,
        meta: {
            title: 'Edit Blog'
        }
    },
    {
        path: '/admin/blog/details/:id',
        name: 'adminBlogDetails',
        component: BlogDetails,
        meta: {
            title: 'Blog Details'
        }
    }
]

export default routes

