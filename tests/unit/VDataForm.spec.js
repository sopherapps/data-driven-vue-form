import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import VDataFormItem from "../../src/components/VDataFormItem.vue";
import VDataForm from "../../src/components/VDataForm.vue";

describe("VDataForm", () => {
  Vue.use(Vuetify);
  const formData = [
    {
      type: "input",
      name: "first",
      value: "hello world",
      options: {
        type: "email"
      }
    },
    {
      type: "text-field",
      name: "second",
      value: "hello world",
      options: {
        type: "email"
      }
    },
    {
      type: "textarea",
      name: "third",
      value: "hello world",
      options: {}
    },
    {
      type: "button",
      name: "firstButton",
      value: "submit",
      options: {
        onclick: () => 2
      }
    },
    {
      type: "autocomplete",
      value: "Jinja",
      name: "district",
      options: {
        items: ["Kampala", "Jinja"]
      }
    },
    {
      type: "select",
      value: "Kampala",
      name: "town",
      options: {
        items: ["Kampala", "Jinja"]
      }
    }
  ];
  // const expectedFormOutput = {
  //   first: "hello world",
  //   second: "hello world",
  //   third: "hello world",
  //   firstButton: "submit",
  //   district: "Jinja",
  //   town: "Kampala"
  // };
  const submissionHandler = jest.fn(formOutput => formOutput);
  const cancellationHandler = jest.fn(formOutput => formOutput);
  const styleObj = {
    "background-color": "black",
    "font-size": "11px"
  };
  const submissionButtonLabel = "Next";
  const cancellationButtonLabel = "Back";
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(VDataForm, {
      propsData: {
        formData,
        styleObj,
        submissionHandler,
        cancellationHandler,
        submissionButtonLabel,
        cancellationButtonLabel
      }
    });
  });

  describe("UI", () => {
    it("Throws error if any item in formData lacks the name or type property", async () => {
      await wrapper.vm.$nextTick();
      const formDataLackingName = formData.concat([
        { type: "input", options: { type: "email" } }
      ]);
      const formDataLackingType = formData.concat([
        { name: "input", options: { type: "email" } }
      ]);
      const formDataProp = wrapper.vm.$options.props.formData;
      expect(formDataProp.validator(formDataLackingName)).toBeFalsy();
      expect(formDataProp.validator(formDataLackingType)).toBeFalsy();
      expect(formDataProp.validator(formData)).toBeTruthy();
    });

    it("Mounts VDataFormItem components,\
    one for each item in the formData prop", async () => {
      wrapper.vm.$nextTick();
      const allDataFormItems = wrapper.findAll(VDataFormItem).wrappers;
      const allPropsOfDataFormItems = allDataFormItems.map(formItem =>
        formItem.props()
      );
      const formDataWithoutNames = formData.map(({ options, type, value }) => ({
        options,
        type,
        value
      }));
      expect(allPropsOfDataFormItems).toEqual(
        expect.arrayContaining(formDataWithoutNames)
      );
    });

    it("Adds the style prop to the styles of the form", async () => {
      wrapper.vm.$nextTick();
      const styleProps = Object.keys(styleObj);
      let styleString = "";
      styleProps.forEach(styleProp => {
        styleString += `${styleProp}: ${styleObj[styleProp]}; `;
      });

      expect(
        wrapper.find('[data-test="v-data-form-root"]').attributes("style")
      ).toMatch(styleString.trim());
    });

    // it("Sets the label of the Submission button as the \
    // submissionButtonLabel prop value", async () => {
    //   wrapper.vm.$nextTick();
    //   expect(wrapper.vm.$refs.submissionBtn.vm.label).toBe(
    //     submissionButtonLabel
    //   );
    // });

    // it("Sets the label of the Cancellation button as the \
    // cancellationButtonLabel prop value", async () => {
    //   wrapper.vm.$nextTick();
    //   expect(wrapper.vm.$refs.cancellationBtn.vm.label).toBe(
    //     cancellationButtonLabel
    //   );
    // });
  });
  // describe("Submission", () => {
  //   // it("Calls validate on each form component", async () => {
  //   //   wrapper.vm.$nextTick();
  //   // });

  //   it("Calls the submissionHandler prop function", async () => {
  //     await wrapper.vm.$nextTick();
  //     await wrapper.find('[data-test="c-submission-btn"]').trigger("click");
  //     expect(submissionHandler.mock.calls.length).toBe(1);
  //     expect(submissionHandler.mock.results[0].value).toMatchObject(
  //       expectedFormOutput
  //     );
  //   });
  // });
  // describe("Cancellation", () => {
  //   it("Calls the cancellationHandler prop function", async () => {
  //     await wrapper.vm.$nextTick();
  //     await wrapper.find('[data-test="c-cancellation-btn"]').trigger("click");
  //     expect(cancellationHandler.mock.calls.length).toBe(1);
  //     expect(cancellationHandler.mock.results[0].value).toMatchObject(
  //       expectedFormOutput
  //     );
  //   });
  // });
});
