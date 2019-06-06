<template>
  <v-form
    v-model="valid"
    lazy-validation
    ref="formRoot"
    :style="formInlineStyle"
    data-test="v-data-form-root"
  >
    <v-data-form-item
      v-for="formItem in formData"
      :type="formItem.type"
      :options="formItem.options"
      :key="formItem.name"
      v-model="output[formItem.name]"
    ></v-data-form-item>
    <v-btn data-test="v-data-form-submission-btn" @click="submit()">{{
      submissionButtonLabel
    }}</v-btn>
    <v-btn data-test="v-data-form-cancellation-btn" @click="cancel()">{{
      cancellationButtonLabel
    }}</v-btn>
  </v-form>
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
    submissionButtonLabel: {
      type: String,
      default: "submit"
    },
    cancellationButtonLabel: {
      type: String,
      default: "cancel"
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
  },
  methods: {
    resetValidation() {
      this.$refs.formRoot.resetValidation();
    },
    submit() {
      if (this.$refs.formRoot.validate()) {
        this.$emit("submit", this.output);
      }
    },
    cancel() {
      this.$emit("cancel", this.output);
    },
    generateOutput() {
      const tmp = {};
      this.formData.forEach(formItem => {
        tmp[formItem.name] = formItem.value;
      });
      this.output = { ...tmp };
    }
  },
  data: () => ({
    output: {},
    valid: true
  }),
  mounted() {
    this.generateOutput();
  }
};
</script>
