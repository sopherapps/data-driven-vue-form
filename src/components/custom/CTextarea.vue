<template>
  <v-textarea
    v-model="model"
    v-bind="options"
    @change="onChange"
    @input="onInput"
  ></v-textarea>
</template>

<script>
import CustomComponentMixin from "../mixins/CustomComponentMixin";
export default {
  name: "c-textarea",
  mixins: [CustomComponentMixin]
};
</script>
