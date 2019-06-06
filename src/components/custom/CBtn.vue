<template>
  <v-btn
    v-model="model"
    v-bind="options"
    @change="onChange"
    @input="onInput"
  ></v-btn>
</template>

<script>
import CustomComponentMixin from "../mixins/CustomComponentMixin";
export default {
  name: "c-btn",
  mixins: [CustomComponentMixin]
};
</script>
