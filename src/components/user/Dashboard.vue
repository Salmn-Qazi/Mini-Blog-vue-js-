<template>
    <Master>
      <template v-slot:content>
          <div class="page-header">
              <h3 class="page-title">
                Dashboard
              </h3>
            </div>
      </template>
    </Master>
  </template>
  
  <script>
  import Master from './layouts/Master.vue'
  export default {
      name: 'UserDashboard',
      components: {
          Master
      }
  }
  </script>
  
  <style>
  
  </style>