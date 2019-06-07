import { shallowMount, mount } from "@vue/test-utils";
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
    it("has its options prop equal to that passed as\
    options prop passed to VDataFormItem", async () => {
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.$refs.component.$props.options).toMatchObject(
        propsData.options
      );
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
      type: "combobox",
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
    },
    {
      type: "switch",
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

  describe("Radio Group", () => {
    const radioGroup = {
      type: "radio-group",
      value: "Kampala",
      name: "town",
      options: {
        label: "town"
      },
      children: [
        { type: "radio", value: "Kampala", options: { label: "Kampala" } },
        { type: "radio", value: "Jinja", options: { label: "Jinja" } }
      ]
    };
    it("Renders items in the children property\
     as v-radio components wrapped under the radio-group", async () => {
      let wrapper = mount(VDataFormItem, {
        propsData: radioGroup
      });
      await wrapper.vm.$nextTick();

      const allChildRadios = wrapper.findAll(
        '[data-test="v-data-radio-group-child"]'
      ).wrappers;
      const childRadioAttributes = allChildRadios.map(formItem => {
        const element = formItem.element;
        const attributes = {};
        element.getAttributeNames().forEach(value => {
          attributes[value] = element.getAttribute(value);
        });
        return {
          attributes
        };
      });

      radioGroup.children.forEach((child, index) => {
        expect(childRadioAttributes[index].attributes.type).toBe(child.type);
        expect(childRadioAttributes[index].attributes.value).toBe(child.value);
        expect(childRadioAttributes[index].attributes["aria-label"]).toBe(
          child.options.label
        );
        expect(childRadioAttributes[index].attributes["aria-checked"]).toBe(
          (child.value === radioGroup.value).toString()
        );
      });
    });
  });
});
