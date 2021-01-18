import Vue from "../../utils/vue";

import { breakPointOptions } from "../../utils/nly-config";
import { nlyGetOptionsByKeyEqual } from "../../utils/get-options";

const name = "NlyWrapper";

export const NlyWrapper = Vue.extend({
  name: name,
  props: {
    //layout fixed or boxed
    layout: {
      type: String
    },
    // navbar fixed
    navbarFixed: {
      type: Boolean,
      default: false
    },
    //footer fixed
    footerFixed: {
      type: Boolean,
      default: false
    },
    //top nav
    topNav: {
      type: Boolean,
      default: false
    },
    wrapperClass: {
      type: String
    },
    containerClass: {
      type: String
    }
  },
  computed: {
    breakPointNumber() {
      return nlyGetOptionsByKeyEqual(breakPointOptions, this.breakPoint);
    },
    layoutClass: function() {
      return this.layout == "fixed"
        ? "layout-fixed"
        : this.layout
        ? "layout-boxed"
        : "";
    },
    navbarFixedClass: function() {
      return this.navbarFixed ? "layout-navbar-fixed" : "";
    },
    footerFixedClass: function() {
      return this.footerFixed ? "layout-footer-fixed" : "";
    },
    topNavClass: function() {
      return this.topNav ? "layout-top-nav" : "";
    },
    containerWrapperClass: function() {
      return this.wrapperClass;
    },
    containerBodyClass: function() {
      return this.containerClass;
    }
  },
  methods: {
    setBodyClassName(newval, oldval) {
      if (newval != oldval) {
        if (newval && oldval) {
          document.body.classList.add(newval);
          document.body.classList.remove(oldval);
        } else if (newval && oldval == "") {
          document.body.classList.add(newval);
        } else if (newval == "" && oldval) {
          document.body.classList.remove(oldval);
        }
      }
    }
  },
  mounted() {
    const createdBodyClassList = [
      this.layoutClass,
      this.navbarFixedClass,
      this.footerFixedClass,
      this.topNavClass,
      this.containerBodyClass
    ];
    createdBodyClassList.forEach(item => {
      if (item) {
        document.body.classList.add(item);
      }
    });
  },
  watch: {
    layoutClass: function(newval, oldval) {
      this.setBodyClassName(newval, oldval);
    },
    navbarFixedClass: function(newval, oldval) {
      this.setBodyClassName(newval, oldval);
    },
    footerFixedClass: function(newval, oldval) {
      this.setBodyClassName(newval, oldval);
    },
    topNavClass: function(newval, oldval) {
      this.setBodyClassName(newval, oldval);
    },
    containerBodyClass: function(newval, oldval) {
      this.setBodyClassName(newval, oldval);
    },
    containerWrapperClass: function(newval, oldval) {
      this.setBodyClassName(newval, oldval);
    }
  },
  render(h) {
    return h(
      "div",
      {
        staticClass: "wrapper",
        class: [this.containerWrapperClass]
      },
      this.$slots.default
    );
  }
});
