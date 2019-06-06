import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import VDataFormItem, {
  ALLOWED_COMPONENTS
} from "../../src/components/VDataFormItem.vue";

const testComponentType = propsData => {
  const vComponentType = ALLOWED_COMPONENTS.get(propsData.type);
  describe(`${vComponentType}`, () => {
    let wrapper = shallowMount(VDataFormItem, {
      propsData
    });

    it("Has a tag that is the same as that passed as the type prop", async () => {
      await wrapper.vm.$nextTick();
      // @ts-ignore
      expect(wrapper.vm.$refs.component.$options._componentTag).toBe(
        vComponentType
      );
    });
    it("Has value that is passed as the value prop", async () => {
      await wrapper.vm.$nextTick();
      // @ts-ignore
      expect(wrapper.vm.$refs.component.value).toBe(propsData.value);
    });
    it("has the keys in the options prop as attributes for the Form Component", async () => {
      await wrapper.vm.$nextTick();
      const optionKeys = Object.keys(propsData.options);
      const component = wrapper.vm.$refs.component;
      const mergedAttrsAndProps = Object.assign(
        {},
        component.$attrs,
        component._props
      );

      optionKeys.forEach(key => {
        expect(mergedAttrsAndProps[key]).toBe(propsData.options[key]);
      });
    });
  });
};

describe("FlexibleFormInput", () => {
  Vue.use(Vuetify);
  const propsDataList = [
    {
      type: "input",
      value: "hello world",
      options: {
        type: "email"
      }
    },
    {
      type: "text-field",
      value: "hello world",
      options: {
        type: "email"
      }
    },
    {
      type: "textarea",
      value: "hello world",
      options: {}
    },
    {
      type: "autocomplete",
      value: "Kampala",
      options: {
        items: ["Kampala", "Jinja"]
      }
    },
    {
      type: "select",
      value: "Kampala",
      options: {
        items: ["Kampala", "Jinja"]
      }
    },
    {
      type: "checkbox",
      value: "false",
      options: {
        label: "Kampala",
        color: "red"
      }
    }
  ];
  propsDataList.forEach(propsData => {
    testComponentType(propsData);
  });
});
