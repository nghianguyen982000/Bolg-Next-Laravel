<template>
  <div>
    <InnerPageHero
      :image-url="'https://cdn.shrm.org/image/upload/c_crop%2Ch_705%2Cw_1254%2Cx_0%2Cy_0/c_fit%2Cf_auto%2Cq_auto%2Cw_767/v1/Tools%20and%20Samples/iStock-1190588990_psogsn?databtoa=eyIxNng5Ijp7IngiOjAsInkiOjAsIngyIjoxMjU0LCJ5MiI6NzA1LCJ3IjoxMjU0LCJoIjo3MDV9fQ%3D%3D'"
      title="Articles"
    />

    <div class="py-8 sm:py-20 px-4 sm:px-0 container mx-auto">
      <div
        :class="{
          'space-y-8 sm:space-y-16': isList,
          'grid sm:grid-cols-3 sm:gap-12': isGrid,
        }"
      >
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
      </div>

      <div v-if="showViewAll" class="mt-8 sm:mt-12">
        <router-link
          to="/articles"
          class="px-4 py-2 sm:px-6 bg-red-400 rounded focus:outline-none"
          >View All</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import InnerPageHero from "../../component/InnerPageHero.vue";
import Article from "../../component/Article.vue";
import { computed } from "vue";

export default {
  components: {
    InnerPageHero,
    Article,
  },
  props: {
    layout: {
      type: String,
      default: "list",
    },
    showViewAll: {
      type: Boolean,
      default: true,
    },
    articles: Array,
  },

  setup(props) {
    let isGrid = computed(() => {
      return props.layout === "grid";
    });

    let isList = computed(() => {
      return props.layout === "list";
    });

    return {
      isGrid,
      isList,
    };
  },
};
</script>
