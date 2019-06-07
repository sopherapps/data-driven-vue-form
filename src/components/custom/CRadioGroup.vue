<template>
  <v-radio-group
    v-model="model"
    v-bind="options"
    @change="onChange"
    @input="onInput"
  >
    <v-radio
      v-for="(child, index) in radioChildren"
      :key="index"
      :value="child.value"
      v-bind="child.options"
    ></v-radio>
  </v-radio-group>
</template>

<script>
import CustomComponentMixin from "../mixins/CustomComponentMixin";
export default {
  name: "c-radio-group",
  mixins: [CustomComponentMixin],
  props: {
    children: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    radioChildren() {
      return this.children
        ? this.children.filter(child => child.type === "radio")
        : [];
    }
  }
};
</script>
