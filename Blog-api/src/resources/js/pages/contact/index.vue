<template>
  <div>
    <InnerPageHero
      :image-url="'https://cdn.shrm.org/image/upload/c_crop%2Ch_705%2Cw_1254%2Cx_0%2Cy_0/c_fit%2Cf_auto%2Cq_auto%2Cw_767/v1/Tools%20and%20Samples/iStock-1190588990_psogsn?databtoa=eyIxNng5Ijp7IngiOjAsInkiOjAsIngyIjoxMjU0LCJ5MiI6NzA1LCJ3IjoxMjU0LCJoIjo3MDV9fQ%3D%3D'"
      title="Contact Us"
    />

    <div class="container mx-auto py-8 sm:py-12 px-4 sm:px-0">
      <div class="grid sm:grid-cols-3 sm:gap-4">
        <div><span class="text-gray-500">Address:</span> Lorem Ipsum</div>
        <div><span class="text-gray-500">Phone:</span> +0987654321</div>
        <div>
          <span class="text-gray-500">Email:</span> info@laratipsofficial.com
        </div>
      </div>

      <div class="mt-8 sm:mt-16 grid sm:grid-cols-2 gap-8 sm:gap-12">
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d198741.27544863918!2d-77.15466025854397!3d38.89351276362806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7c6de5af6e45b%3A0xc2524522d4885d2a!2sWashington%2C%20DC%2C%20USA!5e0!3m2!1sen!2snp!4v1604083616504!5m2!1sen!2snp"
            class="w-full"
            height="450"
            frameborder="0"
            style="border: 0"
            allowfullscreen=""
            aria-hidden="false"
            tabindex="0"
          ></iframe>
        </div>
        <a-form
          class="p-8 bg-gray-300 shadow rounded space-y-4"
          :model="formState"
          v-bind="layout"
          name="nest-messages"
          :validate-messages="validateMessages"
          @finish="onFinish"
        >
          <a-form-item
            :name="['contact', 'name']"
            :rules="[{ required: true }]"
          >
            <a-input v-model="formState.contact.name" placeholder="Name" />
          </a-form-item>
          <a-form-item
            :name="['contact', 'email']"
            :rules="[{ type: 'email' }]"
          >
            <a-input v-model="formState.contact.email" placeholder="Email" />
          </a-form-item>
          <a-form-item
            :name="['contact', 'phoneNumber']"
            :rules="[{ type: 'number' }]"
          >
            <a-input
              v-model="formState.contact.phoneNumber"
              placeholder="Phone number"
            />
          </a-form-item>
          <a-form-item :name="['contact', 'message']">
            <a-textarea
              v-model="formState.contact.message"
              placeholder="Message"
            />
          </a-form-item>
          <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 0 }">
            <a-button type="primary" html-type="submit">Submit</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import InnerPageHero from "../../component/InnerPageHero.vue";
import { reactive } from "vue";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
};
const formState = reactive({
  contact: {
    name: "",
    phoneNumber: undefined,
    email: "",
    message: "",
  },
});
const onFinish = (values) => {
  console.log("Success:", values);
};
export default {
  components: {
    InnerPageHero,
  },
  props: {},
  setup() {
    return {
      layout,
      validateMessages,
      formState,
      onFinish,
    };
  },
};
</script>
