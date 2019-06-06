<template>
  <v-radio value="model" v-bind="options" @change="onChange" @input="onInput">
    <slot />
  </v-radio>
</template>

<script>
import CustomComponentMixin from "../mixins/CustomComponentMixin";
export default {
  name: "c-radio",
  mixins: [CustomComponentMixin]
};
</script>
