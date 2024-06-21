<template>
    <Master>
        <template v-slot:content>
            <div class="page-header">
                <h3 class="page-title">
                  Blogs
                </h3>
            </div>
            <table id="myTable" class="display">
                <thead>
                  <tr>
                     <th>ID</th>
                     <th>Blog Name</th>
                     <th>Slug</th>
                     <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                    <tr v-for="blog in blogs" :key="blog.id">
                        <td>{{ blog.id }}</td>
                        <td>{{ blog.name }}</td>
                        <td>{{ blog.slug }}</td>
                        <td>
                            <router-link class="btn btn-success mr-1" title="Blog Details" :to="{name: 'adminBlogDetails', params: {id: blog.id}}">
                                <i class="fa fa-eye"></i> 
                            </router-link> 
                            <router-link class="btn btn-warning mr-1" title="Edit Blog" :to="{name: 'adminEditBlog', params: {id: blog.id}}">
                                <i class="fa fa-edit"></i> 
                            </router-link> 
                            <button @click="deleteBlog(blog.id)" class="btn btn-danger mr-1" title="Delete Blog"><i class="fa fa-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
              </table>
        </template>
      </Master>
</template>

<script>
import Master from '@/components/admin/layouts/Master.vue'
import jQuery from 'jquery'
import axios from '@/config/axios_config'
import { onBeforeMount, onMounted, ref, nextTick } from 'vue'
import DataTable from 'datatables.net-dt'

export default {
    name: 'IndexBlog',
    components: {
        Master
    },
    setup()
    {
        let blogs = ref(null)
        const getBlogs = () => {
            axios.get('/admin/blogs')
            .then(response => {
                
                console.log(response.data.blogs)
                blogs.value = response.data.blogs
                nextTick(() => {
                    jQuery("#myTable").DataTable()
                })
            })
            .catch(error => {
                console.log(error)
            })
        }
        onMounted(() => {
            getBlogs()
        })

        const deleteBlog = (id) => {
            let response = confirm("Are you sure to delete blog #" + id + "?")
            if(response)
            {
                axios.delete('/blog/' + id)
                .then(response => {
                    if(response.data.message === "success")
                    {
                        alert("Blog deleted successfully.")
                        getBlogs()
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }
        }

        return {
            blogs,
            deleteBlog
        }
    }
}
</script>

<style>

</style>