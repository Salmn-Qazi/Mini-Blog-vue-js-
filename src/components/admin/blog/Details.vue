<template>
    <Master>
        <template v-slot:content>
            <div class="page-header">
                <h3 class="page-title">
                  Blog Details
                </h3>
            </div>
            <div class="row">
                <div class="col-lg-12">
                   <h3 class="text-center">{{ blogName }}</h3>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-12">
                    <img class="img-fluid mx-auto d-block" :src="imgUrl" alt="" height="200" width="200">
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-12">
                    <h6 class="text-align:justify">{{ blogContent }}</h6>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-12">
                    <h3>Category</h3>
                    <h5>{{ category }}</h5>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-lg-12">
                    <h3>Tags</h3>
                    <ul>
                        <li v-for="tag in tags" :key="tag">{{ tag }}</li>
                    </ul>
                </div>
            </div>

        </template>
      </Master>
</template>

<script>
import Master from '@/components/admin/layouts/Master.vue'
import jQuery from 'jquery'
import axios from '@/config/axios_config'
import { onBeforeMount, onMounted, ref, nextTick } from 'vue'
import { useRoute } from 'vue-router'


export default {
    name: 'adminDetailsBlog',
    components: {
        Master
    },
    setup()
    {
       const route = useRoute()
       let blogName = ref(null)
       let blogContent = ref(null)
       let category = ref(null)
       let tags = ref([])
       let imgUrl = ref(null)
       onMounted(() => {
            axios.get('/getBlogDetails/' + route.params.id)
            .then(response => {
                //console.log(response)
                blogName.value = response.data.blog.name
                blogContent.value = response.data.blog.content.replace(/<[^>]+>/g, '')
                category.value = response.data.category[0].name
                tags.value = response.data.tags.map(item => item.name)
                imgUrl.value = response.data.blog.media[0].original_url
                
            })
            .catch(error => {
                console.log(error)
            })
       })

        return {
           blogName,
           blogContent,
           category,
           tags,
           imgUrl
        }
    }
}
</script>

<style>

</style>