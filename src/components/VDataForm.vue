<template>
  <v-form
    v-model="valid"
    lazy-validation
    ref="formRoot"
    :style="formInlineStyle"
    data-test="v-data-form-root"
  >
    <v-data-form-item
      v-for="(formItem, index) in model"
      :type="formItem.type"
      :options="formItem.options"
      :key="index"
      :children="formItem.children"
      v-model="model[index].value"
      @update="update"
      @change="change"
      @input="input"
    ></v-data-form-item>
    <v-layout>
      <v-btn
        data-test="v-data-form-submission-btn"
        @click="submit()"
        color="primary"
        >{{ submissionButtonLabel }}</v-btn
      >
      <v-spacer />
      <v-btn data-test="v-data-form-cancellation-btn" @click="cancel()">
        {{ cancellationButtonLabel }}
      </v-btn>
    </v-layout>
  </v-form>
</template>

<script>
import VDataFormItem from "./VDataFormItem.vue";
import CustomComponentMixin from "./mixins/CustomComponentMixin.js";
export default {
  components: {
    VDataFormItem
  },
  props: {
    //formData: {
    value: {
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
    },
    output() {
      return new Map(
        this.model.map(formItem => [formItem.name, formItem.value])
      );
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
    change() {
      this.$emit("change", this.model);
    },
    input() {
      this.$emit("input", this.model);
    },
    update(value) {
      const tmp = { ...this.model[value.key], value: value.model };
      this.model.splice(value.key, 1, tmp);
    }
  },
  data: () => ({
    valid: true
  }),
  mixins: [CustomComponentMixin]
};
</script>
