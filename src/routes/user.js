import Login from '@/components/user/Login.vue'
import Register from '@/components/user/Register.vue'
import Dashboard from '@/components/user/Dashboard.vue'

import Index from '@/components/user/blog/Index.vue'
import Create from '@/components/user/blog/Create.vue'
import Edit from '@/components/user/blog/Edit.vue'
import AssignCategoryAndTags from '@/components/user/blog/CategoryAndTag.vue'
import Details from '@/components/user/blog/Details.vue'

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        meta: {
            title: 'Login'
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            title: 'Register'
        }
    },
    {
        path: '/user/dashboard',
        name: 'userDashboard',
        component: Dashboard,
        meta: {
            title: 'Dashboard'
        }
    },
    {
        path: '/user/blog',
        name: 'userBlog',
        component: Index,
        meta: {
            title: 'Blogs'
        }
    },
    {
        path: '/user/blog/create',
        name: 'userCreateBlog',
        component: Create,
        meta: {
            title: 'Create Blog'
        }
    },
    {
        path: '/user/blog/edit/:id',
        name: 'userEditBlog',
        component: Edit,
        meta: {
            title: 'Edit Blog'
        }
    },
    {
        path: '/user/blog/assign-category-tags/:id',
        name: 'userAssignCategoryAndTags',
        component: AssignCategoryAndTags,
        meta: {
            title: 'Assign Category and Tags Blog'
        }
    },
    {
        path: '/user/blog/details/:id',
        name: 'userBlogDetails',
        component: Details,
        meta: {
            title: 'Blog Details'
        }
    }
]

export default routes

