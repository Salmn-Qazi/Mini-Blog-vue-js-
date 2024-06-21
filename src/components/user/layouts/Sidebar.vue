<template>
  <nav class="sidebar sidebar-offcanvas" id="sidebar">
    <ul class="nav">
      <li class="nav-item nav-profile">
        <div class="nav-link">
          <div class="profile-image">
            <img :src="imgUrl" alt="image" />
          </div>
          <div class="profile-name">
            <p class="name">{{userName}}</p>
            <p class="designation">{{userRole}}</p>
          </div>
        </div>
      </li>
      <li :class="{'nav-item': true, 'active': $route.path.includes('/user/dashboard')}">
        <router-link class="nav-link" :to="{name: 'userDashboard'}">
          <i class="fa fa-home menu-icon"></i>
          <span class="menu-title">Dashboard</span>
        </router-link>
      </li>
      <li :class="{'nav-item': true, 'active': $route.path.includes('/user/blog')}">
        <router-link class="nav-link" :to="{name: 'userBlog'}">
          <i class="fa fa-tags menu-icon"></i>
          <span class="menu-title">Blogs</span>
        </router-link>
      </li>
     
    </ul>
  </nav>
</template>

<script>
import { onMounted, ref, computed } from 'vue';

export default {
  name: "UserSidebar",
  setup()
  {

    let imgUrl = ref(null)
    let userName = ref(null)
    let userRole = ref(null)

    imgUrl.value = require('@/assets/images/default.png') 
    userName.value = localStorage.getItem('userName').toUpperCase()
    userRole.value = localStorage.getItem('userRole')

    return {
      imgUrl,
      userName,
      userRole
    }
  }
};
</script>

<style></style>
