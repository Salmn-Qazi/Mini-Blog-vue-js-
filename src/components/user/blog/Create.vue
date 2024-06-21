<template>
  <Master>
    <template v-slot:content>
      <h3 class="page-title">Create Blog</h3>
      <p v-if="isBlogCreated" class="bg-success p-2 mt-3 rounded text-white">
        Blog created successfully.
      </p>
      <form class="mt-4" @submit.prevent="createBlog">
        <div class="row">
          <div class="col-lg-12">
            <div class="form-group">
              <label for="name"><b>Name</b></label>
              <input
                type="text"
                v-model="blog.name"
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
            <ckeditor :editor="editor" v-model="blog.content"></ckeditor>
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
            Create Blog
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
import { ErrorCodes, onMounted, reactive, ref } from "vue";
import axios from "@/config/axios_config";

export default {
  name: "CreateBlog",
  components: {
    Master,
    ckeditor: CKEditor.component,
  },
  setup() {
    let editor = ref(ClassicEditor);
    let imgUrl = ref(null);
    let userImage = ref(null);
    let isBlogCreated = ref(false)

    let blog = reactive({
      name: "",
      content: "<p>Text editor</p>",
    });

    let errors = reactive({
      name: '',
      content: '',
      image: ''
    });

    onMounted(() => {
      imgUrl.value = require("@/assets/images/blog.png");
      
    });

    const updateImage = (event) => {
      if (event.target.files[0]) {
        userImage.value = event.target.files[0];
        imgUrl.value = URL.createObjectURL(event.target.files[0]);
      }
    };

    const createBlog = () => {
      isBlogCreated.value = false;
      errors.name = ''
      errors.content = ''
      errors.image = ''

      const userId = localStorage.getItem("userId");
      let formData = new FormData();

      formData.append("user_id", userId);
      formData.append("name", blog.name);
      formData.append("content", blog.content);

      if (userImage.value) {
        formData.append("image", userImage.value);
      } else {
        formData.append("image", "");
      }
      axios
        .post("/blog/", formData)
        .then((response) => {
          if (response.data.message === "success") {
            isBlogCreated.value = true;
            blog.name = ""
            blog.content = ""
            imgUrl.value = require("@/assets/images/blog.png");

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
      createBlog,
      imgUrl,
      updateImage,
      isBlogCreated,
      
    };
  },
};
</script>

<style scoped></style>
