<template>
  <component
    ref="component"
    :is="vType"
    v-model="value"
    v-bind="options"
    @change="updateModel('change')"
    @input="updateModel('input')"
  >
    <div v-if="children.length > 0">
      <v-data-form-item
        data-test="v-data-form-item-children"
        v-for="(child, index) in children"
        :type="child.type"
        v-model="child.value"
        :key="index"
        :options="child.options"
        :children="child.children"
      ></v-data-form-item>
    </div>
  </component>
</template>

<script>
import CAutocomplete from "./custom/CAutocomplete";

import CCheckbox from "./custom/CCheckbox";
import CInput from "./custom/CInput";
import CRadio from "./custom/CRadio";
import CRadioGroup from "./custom/CRadioGroup";
import CSelect from "./custom/CSelect";
import CTextarea from "./custom/CTextarea";
import CTextField from "./custom/CTextField";

export const ALLOWED_COMPONENTS = new Map([
  ["autocomplete", "c-autocomplete"],
  ["checkbox", "c-checkbox"],
  ["input", "c-input"],
  ["radio", "c-radio"],
  ["radio-group", "c-radio-group"],
  ["select", "c-select"],
  ["textarea", "c-textarea"],
  ["text-field", "c-text-field"]
]);
export default {
  name: "v-data-form-item",
  components: {
    CAutocomplete,
    CCheckbox,
    CInput,
    CRadio,
    CRadioGroup,
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
    },
    children: {
      type: Array,
      default: () => [],
      validator: value => {
        if (value.length === 0) {
          return true;
        }
        return value.reduce(
          (accumulator, currentValue) =>
            accumulator && ALLOWED_COMPONENTS.has(currentValue.type)
        );
      }
    }
  },
  methods: {
    updateModel(event) {
      this.$emit(event, this.value);
    },
    getVtype(type) {
      return ALLOWED_COMPONENTS.get(type);
    }
  },
  computed: {
    vType() {
      return ALLOWED_COMPONENTS.get(this.type);
    }
  }
};
</script>
