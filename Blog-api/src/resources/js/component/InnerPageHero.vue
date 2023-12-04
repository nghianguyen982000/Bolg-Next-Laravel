<template>
  <div :class="`relative z-0 ${heightClass}`">
    <img
      :src="
        imageUrl
          ? imageUrl
          : 'https://cdn.shrm.org/image/upload/c_crop%2Ch_705%2Cw_1254%2Cx_0%2Cy_0/c_fit%2Cf_auto%2Cq_auto%2Cw_767/v1/Tools%20and%20Samples/iStock-1190588990_psogsn?databtoa=eyIxNng5Ijp7IngiOjAsInkiOjAsIngyIjoxMjU0LCJ5MiI6NzA1LCJ3IjoxMjU0LCJoIjo3MDV9fQ%3D%3D'
      "
      alt="about"
      class="h-full w-full object-cover"
    />

    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div
      class="absolute inset-0 bg-gradient-to-t from-primary opacity-50"
    ></div>

    <div class="absolute inset-0">
      <div
        class="container mx-auto px-4 sm:px-0 text-white h-full w-full flex flex-col items-center justify-center sm:justify-end text-2xl sm:text-5xl"
      >
        <div class="sm:mb-8 text-center">
          {{ title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    height: String,
  },

  setup(props) {
    let heightClass = computed(() => {
      if (props.height === "articleDetail") {
        return "h-auto sm:h-600px";
      }

      return "h-40 sm:h-64";
    });

    return {
      heightClass,
    };
  },
};
</script>
