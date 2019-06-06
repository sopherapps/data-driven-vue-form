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

    // console.log(wrapper.vm);

    it("Has a tag that is the same as that passed as the type prop", () => {
      // @ts-ignore
      expect(wrapper.vm.$refs.component.$options._componentTag).toBe(
        vComponentType
      );
    });
    it("Has value that is passed as the value prop", () => {
      // @ts-ignore
      expect(wrapper.vm.$refs.component.value).toBe(propsData.value);
    });
    it("has the keys in the options prop as attributes for the Form Component", () => {
      const optionKeys = Object.keys(propsData.options);
      const component = wrapper.vm.$refs.component;
      const mergedAttrsAndProps = { ...component.$attrs, ...component._props };
      // console.log(mergedAttrsAndProps);
      optionKeys.forEach(key => {
        // @ts-ignore
        expect(
          /*wrapper.vm.$refs.component._props*/ mergedAttrsAndProps[key]
        ).toBe(
          /*$attrs*/
          propsData.options[key]
        );
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
      type: "button",
      value: "submit",
      options: {
        onclick: () => 2
      }
    },
    {
      type: "autocomplete",
      value: "Kampala",
      options: {
        items: ["Kampala", "Jinja"]
      }
    }
    // {
    //   type: "select",
    //   value: "Kampala",
    //   options: {
    //     items: ["Kampala", "Jinja"]
    //   }
    // }
  ];
  propsDataList.forEach(propsData => {
    testComponentType(propsData);
  });
});
