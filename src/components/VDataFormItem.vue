<template>
  <div>
    <component
      ref="component"
      :is="vType"
      v-model="model"
      :options="options"
      :children="children"
      @input="onInput"
      @change="updateModel"
    ></component>
  </div>
</template>

<script>
import CustomComponentMixin from "./mixins/CustomComponentMixin.js";

import CAutocomplete from "./custom/CAutocomplete";
import CCheckbox from "./custom/CCheckbox";
import CCombobox from "./custom/CCombobox";
import CInput from "./custom/CInput";
import CRadio from "./custom/CRadio";
import CRadioGroup from "./custom/CRadioGroup";
import CSelect from "./custom/CSelect";
import CSwitch from "./custom/CSwitch";
import CTextarea from "./custom/CTextarea";
import CTextField from "./custom/CTextField";

export const ALLOWED_COMPONENTS = new Map([
  ["autocomplete", "c-autocomplete"],
  ["checkbox", "c-checkbox"],
  ["combobox", "c-combobox"],
  ["input", "c-input"],
  ["radio", "c-radio"],
  ["radio-group", "c-radio-group"],
  ["select", "c-select"],
  ["switch", "c-switch"],
  ["textarea", "c-textarea"],
  ["text-field", "c-text-field"]
]);
export default {
  name: "v-data-form-item",
  components: {
    CAutocomplete,
    CCheckbox,
    CCombobox,
    CInput,
    CRadio,
    CRadioGroup,
    CSelect,
    CSwitch,
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
      type: [Array, Boolean, Number, Object, String],
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
    updateModel(value) {
      this.$emit("update", { key: this.$vnode.key, model: value });
      this.onChange(value);
    },
    getVtype(type) {
      return ALLOWED_COMPONENTS.get(type);
    },
    parentChange(newValue) {
      this.model = newValue;
      this.onChange(); // from mixin
    }
  },
  computed: {
    vType() {
      return ALLOWED_COMPONENTS.get(this.type);
    }
  },
  mixins: [CustomComponentMixin]
};
</script>
