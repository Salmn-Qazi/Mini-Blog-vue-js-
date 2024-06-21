<template>
  <Master>
    <template v-slot:content>
      <h3 class="page-title">Edit Blog</h3>
      <p v-if="isBlogUpdated" class="bg-success p-2 mt-3 rounded text-white">
        Blog updated successfully.
      </p>
      <form class="mt-4" @submit.prevent="editBlog">
        <div class="row">
          <div class="col-lg-12">
            <div class="form-group">
              <label for="name"><b>Name</b></label>
              <input
                type="text"
                v-model="blog.name"
                value="{{blog.name}}"
                id="name"
                class="form-control"
              />
              <span class="mb-3 text-danger" v-if="errors.name !== ''">{{
                errors.name
              }}</span>
            </div>
          </div>
        </div>
        <div class="row mb-5">
          <div class="col-lg-12">
            <label for="content"><b>Content</b></label>
            <ckeditor :editor="editor" v-model="blog.content"> {{ blog.content }} </ckeditor>
            <span class="mb-3 text-danger" v-if="errors.content !== ''">{{
              errors.content
            }}</span>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <label for=""><b>Image</b></label>
            <div class="image-container">
              <label for="file-upload" class="file-upload-label"
                >Upload Image</label
              >
              <input
                type="file"
                @change="updateImage"
                id="file-upload"
                class="file-upload"
              />
              <img id="image" :src="imgUrl" alt="Image" />
            </div>
            <span class="mb-3 text-danger" v-if="errors.image !== ''">{{
              errors.image
            }}</span>
          </div>
        </div>


        <div class="d-flex justify-content-center mt-3">
          <button type="submit" class="btn btn-primary btn-flat">
            Edit Blog
          </button>
        </div>
      </form>
    </template>
  </Master>
</template>

<script>
import Master from "@/components/user/layouts/Master.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";
import { onMounted, reactive, ref } from "vue";
import axios from "@/config/axios_config";
import { useRoute } from "vue-router";

export default {
  name: "editBlog",
  components: {
    Master,
    ckeditor: CKEditor.component,
  },
  setup() {
    const blogId = ref(0)
    let editor = ref(ClassicEditor);
    let imgUrl = ref(null);
    let userImage = ref(null);
    let isBlogUpdated = ref(false)

    let blog = reactive({
      name: "",
      content: "",
    });

    let errors = reactive({
      name: '',
      content: '',
      image: ''
    });

    const route = useRoute()

    onMounted(() => {
      
      blogId.value = route.params.id
      axios.get('/blog/' + blogId.value)
      .then(response => {
        console.log(response)
        blog.name = response.data.name
        blog.content = response.data.content
        imgUrl.value = response.data.media[0]?.original_url
        userImage.value = response.data.media[0]?.original_url
        if(!imgUrl.value)
        {
          imgUrl.value = require("@/assets/images/blog.png")
          
        }
      })
      .catch(error => {
        console.log(error)
      })
    });

    const updateImage = (event) => {
      if (event.target.files[0]) {
        userImage.value = event.target.files[0];
        imgUrl.value = URL.createObjectURL(event.target.files[0]);
      }
    };

    const editBlog = () => {
      isBlogUpdated.value = false;
      errors.name = ''
      errors.content = ''
      errors.image = ''
      let formData = new FormData();

      formData.append("name", blog.name);
      formData.append("content", blog.content);

      if (userImage.value) {
        formData.append("image", userImage.value);
      } else {
        formData.append("image", "");
      }
      axios
        .post("/blog/" + blogId.value, formData)
        .then((response) => {
          if (response.data.message === "success") {
            isBlogUpdated.value = true;

            window.scroll({
              top: 0,
              behavior: "smooth",
            });
          } else {
            const errs = response.data.errors;
            //console.log(errs)
            if ("name" in errs) {
              errors.name =
                errs.name.length == 1
                  ? errs.name[0]
                  : errs.name[errs.name.length - 1];
            }
            if ("content" in errs) {
              errors.content =
                errs.content.length == 1
                  ? errs.content[0]
                  : errs.content[errs.content.length - 1];
            }
            if ("image" in errs) {
              errors.image =
                errs.image.length == 1
                  ? errs.image[0]
                  : errs.image[errs.image.length - 1];
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });

    };

    return {
      blog,
      errors,
      editor,
      editBlog,
      imgUrl,
      updateImage,
      isBlogUpdated,
      
    };
  },
};
</script>

<style scoped></style>
