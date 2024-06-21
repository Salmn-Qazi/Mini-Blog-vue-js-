<template>
  <div class="container centered-container">
    <div class="login-form">
      <form @submit.prevent="login">
        <div class="text-center mb-4">
          <img
            src="../../assets/images/logo.svg"
            class="img-fluid"
            alt="Salespro"
            style="max-width: 150px"
          />
        </div>
        <p
          class="bg-danger mb-3 text-white text-center p-2 rounded"
          v-if="showError"
        >
          {{ errorMessage }}
        </p>
        <div class="form-group">
          <label for="email"><b>Email</b></label>
          <input
            type="text"
            class="form-control"
            v-model="credentials.email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div class="form-group">
          <label for="password"><b>Password</b></label>
          <input
            type="password"
            class="form-control"
            v-model="credentials.password"
            id="password"
            placeholder="Password"
          />
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block">
            Log in
          </button>
        </div>
        <div class="clearfix">
          Don't have account?<router-link :to="{name: 'Register'}">Register</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "UserLogin",
  setup() {
    let showError = ref(false);
    let errorMessage = ref("");
    let credentials = reactive({
      email: "",
      password: "",
    });

    // onMounted(() => {
    //   localStorage.removeItem("userId")
    //   localStorage.removeItem("userName")
    //   localStorage.removeItem("userRole")
    //   localStorage.removeItem("userToken")
    // })

    const router = useRouter();
    const login = () => {
      if (credentials.email != "" && credentials.password != "") {
        axios
          .post("http://127.0.0.1:8000/api/authenticate-user", {
            email: credentials.email,
            password: credentials.password,
          })
          .then((response) => {
            if (response.data.message === 'success') {
              localStorage.setItem("userId", response.data.userId);
              localStorage.setItem("userName", response.data.userName);
              localStorage.setItem("userRole", response.data.userRole);
              localStorage.setItem("userToken", response.data.userToken);

              router.push({ name: "userDashboard" });
            } else {
              errorMessage.value = "Invalid email or password.";
              showError.value = true;
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        errorMessage.value = "Both fields are required.";
        showError.value = true;
      }
    };

    return {
      showError,
      errorMessage,
      credentials,
      login,
    };
  },
};
</script>

<style scoped>
.login-form {
  width: 100%;
  max-width: 300px;
  padding: 5px;
  margin: auto;
}
.centered-container {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
