<template>
  <div :class="{ 'grid sm:grid-cols-5 gap-2 sm:gap-12': isList }">
    <div
      class="h-64"
      :class="{
        'sm:h-400px sm:col-span-3': isList,
        'sm:col-span-5': isGrid,
      }"
    >
      <img
        src="https://cdn.shrm.org/image/upload/c_crop%2Ch_705%2Cw_1254%2Cx_0%2Cy_0/c_fit%2Cf_auto%2Cq_auto%2Cw_767/v1/Tools%20and%20Samples/iStock-1190588990_psogsn?databtoa=eyIxNng5Ijp7IngiOjAsInkiOjAsIngyIjoxMjU0LCJ5MiI6NzA1LCJ3IjoxMjU0LCJoIjo3MDV9fQ%3D%3D"
        alt=""
        class="w-full h-full object-cover"
      />
    </div>
    <div class="mt-1 sm:col-span-2 flex flex-col justify-between">
      <div
        :class="{
          'sm:py-2 sm:mt-0': isGrid,
        }"
      >
        <div class="text-base text-gray-500">Article name</div>
        <h3 class="mt-1 leading-tight text-2xl">
          <router-link
            to="`/articles/`"
            class="hover:text-primary font-bold transition-colors duration-300"
          >
            Article title
          </router-link>
        </h3>
        <div class="mt-2 text-gray-700">Article small description</div>
      </div>
      <div class="mt-1 text-base text-gray-500 flex items-center">
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div class="ml-2">Article created at for human</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    layout: {
      type: String,
      default: "list",
    },
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
