<template>
  <div>
    <v-autocomplete
      v-model="model"
      v-bind="options"
      @change="onChange"
      @input="onInput"
      data-test="c-autocomplete"
    >
      <slot />
    </v-autocomplete>
  </div>
</template>

<script>
import CustomComponentMixin from "../mixins/CustomComponentMixin";
export default {
  name: "c-autocomplete",
  mixins: [CustomComponentMixin]
};
</script>
