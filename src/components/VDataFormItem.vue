<template>
  <component
    ref="component"
    :is="vType"
    v-model="value"
    v-bind="options"
    @change="updateModel('change')"
    @input="updateModel('input')"
  >
    <slot name="group-components" />
  </component>
</template>

<script>
import CAutocomplete from "./custom/CAutocomplete";
import CCheckbox from "./custom/CCheckbox";
import CInput from "./custom/CInput";
import CSelect from "./custom/CSelect";
import CTextarea from "./custom/CTextarea";
import CTextField from "./custom/CTextField";

export const ALLOWED_COMPONENTS = new Map([
  ["autocomplete", "c-autocomplete"],
  ["checkbox", "c-checkbox"],
  ["input", "c-input"],
  ["select", "c-select"],
  ["textarea", "c-textarea"],
  ["text-field", "c-text-field"]
]);
export default {
  components: {
    CAutocomplete,
    CCheckbox,
    CInput,
    CSelect,
    CTextarea,
    CTextField
  },
  props: {
    type: {
      type: String,
      default: "text-field",
      validator: value => ALLOWED_COMPONENTS.has(value)
    },
    value: {
      type: String,
      default: ""
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    updateModel(event) {
      this.$emit(event, this.value);
    }
  },
  computed: {
    vType() {
      return ALLOWED_COMPONENTS.get(this.type);
    }
  }
};
</script>
