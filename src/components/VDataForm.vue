<template>
  <div :style="formInlineStyle" data-test="v-data-form-root">
    <v-data-form-item
      v-for="formItem in formData"
      :type="formItem.type"
      :value="formItem.value"
      :options="formItem.options"
      :key="formItem.name"
      :ref="formItem.name"
    ></v-data-form-item>
  </div>
</template>

<script>
import VDataFormItem from "./VDataFormItem.vue";
export default {
  components: {
    VDataFormItem
  },
  props: {
    formData: {
      // Array of objects with properties; 'type', 'value', 'options'
      type: Array,
      default: () => [],
      validator: value =>
        value.reduce(
          (accumulator, currentValue) =>
            accumulator &&
            currentValue.hasOwnProperty("name") &&
            currentValue.hasOwnProperty("type")
        )
    },
    styleObj: {
      // CSS style
      type: Object,
      default: () => ({})
    },
    submissionHandler: {
      // do this after SUBMIT button is clicked)
      type: Function,
      default: () => ({})
    },
    cancellationHandler: {
      // Do this after CANCEL button is clicked)
      type: Function,
      default: () => ({})
    },
    submissionButtonLabel: {
      type: String,
      default: "submit" // Defaults to 'submit'
    },
    cancellationButtonLabel: {
      type: String,
      default: "cancel" // Defaults to 'cancel'
    }
  },
  computed: {
    formInlineStyle() {
      const styleProps = Object.keys(this.styleObj);
      let styleString = "";
      styleProps.forEach(styleProp => {
        styleString += `${styleProp}: ${this.styleObj[styleProp]};`;
      });
      return styleString;
    }
  }
};
</script>
