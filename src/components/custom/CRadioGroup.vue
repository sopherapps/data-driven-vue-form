<template>
  <v-radio-group
    :value="value"
    v-bind="options"
    @change="onChange"
    @input="onInput"
    data-test="c-radio-group"
  >
    <v-radio
      data-test="v-data-radio-group-child"
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
    },
    value: {
      type: [String, Number],
      default: ""
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
