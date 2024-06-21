<template>
  <Master>
    <template v-slot:content>
      <h3 class="page-title">Assign Category and Tags</h3>
      <p
        v-if="isCategoryAndTagsAssigned"
        class="bg-success p-2 mt-3 rounded text-white"
      >
        Category and Tags assigned successfully.
      </p>
      <form class="mt-4" @submit.prevent="assignCategoryAndTags">
        <div class="row">
          <div class="col-lg-12">
            <div class="form-group">
              <label for="name"><b>Name</b></label>
              <input
                type="text"
                v-model="blog.name"
                id="name"
                class="form-control"
                disabled
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="form-group">
              <label for=""><b>Category</b></label>
              <select
                v-model="blog.category"
                name=""
                id=""
                class="form-control"
              >
                <option value="">-- Please Select --</option>
                <option
                  :value="category.id"
                  v-for="category in categories"
                  :key="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
              <span class="mb-3 text-danger" v-if="errors.category != ''">{{
                errors.category
              }}</span>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12">
            <div class="form-group">
              <label for=""><b>Tags</b></label>
              <select v-model="blog.tags" name="" id="" class="form-control" multiple>
                <option :value="tag.id" v-for="tag in tags" :key="tag.id">
                  {{ tag.name }}
                </option>
              </select>
              <span class="mb-3 text-danger" v-if="errors.tags != ''">{{
                errors.tags
              }}</span>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-center mt-3">
          <button type="submit" class="btn btn-primary btn-flat">Assign</button>
        </div>
      </form>
    </template>
  </Master>
</template>

<script>
import Master from "@/components/user/layouts/Master.vue";
import { onMounted, reactive, ref } from "vue";
import axios from "@/config/axios_config";
import { useRoute } from "vue-router";

export default {
  name: "AssignCategoryAndTags",
  components: {
    Master,
  },
  setup() {
    let blogId = ref(0);
    let isCategoryAndTagsAssigned = ref(false);
    let categories = ref(null);
    let tags = ref([]);

    let blog = reactive({
      name: "",
      category: "",
      tags: [],
    });

    let errors = reactive({
        category: "",
        tags: ""
    })

    const route = useRoute();

    onMounted(() => {
      blogId.value = route.params.id;
      axios
        .get("/getBlogName/" + blogId.value)
        .then((response) => {
          console.log(response.data)
          blog.name = response.data.name;
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get("/categories")
        .then((response) => {
          categories.value = response.data.categories;
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get("/tags")
        .then((response) => {
          tags.value = response.data.tags;
        })
        .catch((error) => {
          console.log(error);
        });

        axios.get('/getSelectedCategory/' + blogId.value)
        .then(response => {
          blog.category = response.data.category
          console.log("Blog Category: " + response.data.category)
        })
        .catch(error => {
          console.log(error)
        })

        axios.get('/getSelectedTags/' + blogId.value)
        .then(response => {
          blog.tags = response.data.tags
        })
        .catch(error => {
          console.log(error)
        })
    });

    const assignCategoryAndTags = () => {
      isCategoryAndTagsAssigned.value = false;
      let formData = new FormData();

      formData.append("category", blog.category);
      blog.tags.forEach((item, index) => {
        formData.append("tags[]", item)
      })
      
      axios
        .post("/assignCategoryAndTag/" + blogId.value, formData)
        .then((response) => {
          if (response.data.message === "success") {
            isCategoryAndTagsAssigned.value = true;
            blog.category = ""
            blog.tags = []
            window.scroll({
              top: 0,
              behavior: "smooth",
            });
          } else {

            const errs = response.data.errors;
            //console.log(errs)
            if ("category" in errs) {
              errors.category = errs.category[0]
            }
            if ("tags" in errs) {
              errors.tags = errs.tags[0]
            }
          }
        
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return {
      blog,
      categories,
      tags,
      isCategoryAndTagsAssigned,
      assignCategoryAndTags,
      errors,
    };
  },
};
</script>

<style scoped></style>
