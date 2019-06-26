<template>
  <v-form
    v-model="valid"
    lazy-validation
    ref="formRoot"
    :style="formInlineStyle"
    data-test="v-data-form-root"
  >
    <v-data-form-item
      v-for="(formItem, index) in value"
      :type="formItem.type"
      :options="formItem.options"
      :key="index"
      :children="formItem.children"
      :value="value[index].value"
      @update="update"
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
  name: "v-data-form",
  components: {
    VDataFormItem
  },
  props: {
    value: {
      // Array of objects with properties; 'type', 'value', 'options'
      type: Array,
      default: () => [],
      validator: value =>
        value.length == 0 ||
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
      const obj = {};
      for (let item of this.model) {
        obj[item.name] = item.value;
      }
      return obj;
    }
  },
  watch: {
    value: function(val) {
      this.model = val;
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
    update(value) {
      const tmpArray = Array.from(this.model);
      const tmp = { ...tmpArray[value.key], value: value.model };
      tmpArray.splice(value.key, 1, tmp);
      this.$emit("change", tmpArray);
      this.model = tmpArray;
    }
  },
  data: () => ({
    valid: true,
    model: []
  }),
  mixins: [CustomComponentMixin],
  mounted() {
    this.model = Array.from(this.value);
  }
};
</script>
