import jQuery from 'jquery'
var body = jQuery("body");
var contentWrapper = jQuery(".content-wrapper");
var scroller = jQuery(".container-scroller");
var footer = jQuery(".footer");
var sidebar = jQuery(".sidebar");

jQuery('[data-toggle="minimize"]').on("click", function () {
  if (
    jQuery("body").hasClass("sidebar-toggle-display") ||
    jQuery("body").hasClass("sidebar-absolute")
  ) {
    jQuery("body").toggleClass("sidebar-hidden");
  } else {
    console.log('icon only')
    bodyRef.value.classList.toggle('sidebar-icon-only')
  }
});

jQuery('[data-toggle="offcanvas"]').on("click", function() {
  jQuery('.sidebar-offcanvas').toggleClass('active')
});

//Close other submenu in sidebar on opening any

sidebar.on("show.bs.collapse", ".collapse", function () {
  sidebar.find(".collapse.show").collapse("hide");
});

//Change sidebar and content-wrapper height

jQuery('.nav-link[data-toggle="collapse"]').on("click", function (event) {
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
});