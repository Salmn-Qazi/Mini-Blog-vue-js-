<template>
  <div class="container-scroller">
    <Navbar />
    <div class="container-fluid page-body-wrapper">
      <Sidebar />
      <div class="main-panel">
        <div class="content-wrapper">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/vendors/iconfonts/font-awesome/css/all.min.css";
import "@/assets/vendors/css/vendor.bundle.base.css";
import "@/assets/vendors/css/vendor.bundle.addons.css";
import "@/assets/css/style.css";
import "@/assets/css/file_upload.css"
import "@/assets/css/switch.css"
import "../../../../node_modules/datatables.net-dt/css/dataTables.dataTables.css"

import jQuery from "jquery";
import "bootstrap/dist/js/bootstrap.bundle";
import "@/assets/js/hoverable-collapse";
import "@/assets/js/misc";
import "../../../../node_modules/datatables.net-dt/js/dataTables.dataTables.min.js"

import { ref, nextTick, onMounted } from "vue";
import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";

export default {
  name: "SuperAdminMaster",
  components: {
    Navbar,
    Sidebar,
  },
  setup() {
    onMounted(() => {
      nextTick(() => {
        var bodyContainer = jQuery(".main-body-container");
        var sidebar = jQuery(".sidebar");
       
        jQuery('[data-toggle="minimize"]').on("click", function () {
          if (
            bodyContainer.hasClass("sidebar-toggle-display") ||
            bodyContainer.hasClass("sidebar-absolute")
          ) {
            bodyContainer.toggleClass("sidebar-hidden");
          } else {
            console.log(bodyContainer.hasClass("sidebar-icon-only"))
            bodyContainer.toggleClass("sidebar-icon-only")
          }
        });

        jQuery('[data-toggle="offcanvas"]').on("click", function () {
          jQuery(".sidebar-offcanvas").toggleClass("active");
        });

        //Close other submenu in sidebar on opening any

        sidebar.on("show.bs.collapse", ".collapse", function () {
          sidebar.find(".collapse.show").collapse("hide");
        });

        //Change sidebar and content-wrapper height

        jQuery('.nav-link[data-toggle="collapse"]').on(
          "click",
          function (event) {
            event.preventDefault();
            var target = jQuery(this).attr("href");

            // Hide all other sub-menus
            jQuery(".collapse").not(target).collapse("hide");

            // Toggle the target sub-menu
            jQuery(target).collapse("toggle");

            // Rotate arrow icons
            jQuery(".menu-arrow").removeClass("rotate-arrow");
            jQuery(this)
              .find(".menu-arrow")
              .toggleClass("rotate-arrow", jQuery(target).hasClass("show"));
          }
        );
      });
    });

    return {
     
    };
  },
};
</script>

<style></style>
