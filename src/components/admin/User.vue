<template>
    <Master>
        <template v-slot:content>
            <div class="page-header">
                <h3 class="page-title">
                  Users
                </h3>
            </div>
            <table id="myTable" class="display">
                <thead>
                  <tr>
                     <th>ID</th>
                     <th>Name</th>
                     <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
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
    name: 'Users',
    components: {
        Master
    },
    setup()
    {
        let users = ref(null)
        const getUsers = () => {
        
            axios.get('/admin/users/')
            .then(response => {
                
                console.log(response.data.users)
                users.value = response.data.users
                nextTick(() => {
                    jQuery("#myTable").DataTable()
                })
            })
            .catch(error => {
                console.log(error)
            })
        }
        onMounted(() => {
            getUsers()
        })

        // const deleteuser = (id) => {
        //     let response = confirm("Are you sure to delete user #" + id + "?")
        //     if(response)
        //     {
        //         axios.delete('/user/' + id)
        //         .then(response => {
        //             if(response.data.message === "success")
        //             {
        //                 alert("user deleted successfully.")
        //                 getUsers()
        //             }
        //         })
        //         .catch(error => {
        //             console.log(error)
        //         })
        //     }
        // }

        return {
            users,
        }
    }
}
</script>

<style>

</style>