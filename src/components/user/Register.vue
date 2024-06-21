<template>
    <div class="container centered-container">
      <div class="login-form mt-5">
        <form @submit.prevent="register">
          <div class="text-center mb-4">
            <img
              src="../../assets/images/logo.svg"
              class="img-fluid"
              alt="Salespro"
              style="max-width: 150px"
            />
          </div>
          <div class="form-group">
            <label for="name"><b>Name</b></label>
            <input
              type="text"
              class="form-control"
              v-model="credentials.name"
              id="name"
              placeholder="Name"
            />
            <span class="text-danger mb-3" v-if="errors.name">{{errors.name}}</span>
          </div>
          <div class="form-group">
            <label for="email"><b>Email</b></label>
            <input
              type="text"
              class="form-control"
              v-model="credentials.email"
              id="email"
              placeholder="Email"
            />
            <span class="text-danger mb-3" v-if="errors.email">{{errors.email}}</span>
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
            <span class="text-danger mb-3" v-if="errors.password">{{errors.password}}</span>
          </div>
          <div class="form-group">
            <label for="confirm-password"><b>Confirm Password</b></label>
            <input
              type="password"
              class="form-control"
              v-model="credentials.confirmPassword"
              id="confirm-password"
              placeholder="Confirm Password"
            />
            <span class="text-danger mb-3" v-if="errors.confirmPassword">{{errors.confirmPassword}}</span>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">
              Sign in
            </button>
          </div>
          <div class="clearfix">
            Already have an account?<router-link :to="{name: 'Login'}">Login</router-link>
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
    name: "UserRegister",
    setup() {
      let showError = ref(false);
      let errorMessage = ref("");
      let credentials = reactive({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
      let errors = reactive({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
  
      const router = useRouter();
      const register = () => {
       if(credentials.password !== credentials.confirmPassword)
       {
            errors.password = 'Passwords does not match.'
       }
       else
       {
        axios
            .post("http://127.0.0.1:8000/api/register", {
              name: credentials.name,
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
                const errs = response.data.errors
                if('name' in errs)
                {
                    errors.name = errs.name.length == 1 ? errs.name[0] : errs.name[errs.name.length - 1]
                }
                if('email' in errs)
                {
                    errors.email = errs.email.length == 1 ? errs.email[0] : errs.email[errs.email.length - 1]
                }
                if('password' in errs)
                {
                    errors.password = errs.password.length == 1 ? errs.password[0] : errs.password[errs.password.length - 1]
                }
              }
            })
            .catch((error) => {
              console.error(error);
            });
       }
      };
  
      return {
        credentials,
        register,
        errors
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
  