<template>
  <div>
    <Navbar />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Navbar from "../component/Navbar.vue";
import Footer from "../component/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },

  setup() {},
};
</script>
