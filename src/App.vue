<template>
  <v-app>
    <v-container fluid app class="grey-background">
      <v-layout wrap row>
        <v-flex xs12 md9 mb-4 mt-2 ml-2>
          <h2 class="display-2 font-weight-thin">Data Driven Form</h2>
        </v-flex>
        <v-flex xs12 md2 mb-4 mt-2>
          <v-btn color="primary" block @click="refreshForm()">Update</v-btn>
        </v-flex>
      </v-layout>
      <v-layout wrap row class="elevation-2 white-background">
        <v-flex xs12 px-5 pt-3>
          <p class="text-xs-center display-1 font-weight-thin">
            Simply change the Data in the grey editor and click update and the
            form will update.
          </p>
        </v-flex>
        <v-flex xs12 md6>
          <v-container>
            <v-data-form
              v-model="formData"
              @change="refreshEditor"
              @submit="doSubmit"
            ></v-data-form>
          </v-container>
        </v-flex>
        <v-flex xs12 md6 justify-center id="codex-editor"></v-flex>
      </v-layout>
      <v-snackbar v-model="snackbar" :color="status" v-if="message">
        {{ message }}
        <v-btn dark flat @click="hideSnackbar()">Close</v-btn>
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<script>
import EditorJS from "@editorjs/editorjs";
import Code from "@editorjs/code";

import VDataForm from "./components/VDataForm";

export default {
  name: "App",
  components: {
    VDataForm
  },
  data: () => ({
    snackbar: false,
    message: "",
    editorInitialized: false,
    status: "info",
    time: new Date(),
    version: "2.12.4",
    editor: undefined,
    formDataString: `[
      {
        type: "text-field",
        value: "",
        name: "greetingInput",
        options: {
          style: { color: "blue" }
        }
      },
      {
        type: "text-field",
        value: 9,
        name: "exampleNumber",
        options: {
          style: { color: "blue" },
          type: "number",
          label: "example number"
        }
      },
      {
        type: "autocomplete",
        value: "Kampala",
        name: "district",
        options: {
          items: ["Hoima", "Kampala", "Wakiso"]
        }
      },
      {
        type: "radio-group",
        value: "Kampala",
        name: "town",
        children: [
          { type: "radio", value: "Kampala", options: { label: "Kampala" } },
          { type: "radio", value: "Jinja", options: { label: "Jinja" } }
        ]
      }
    ]`,
    formData: []
  }),
  computed: {},
  methods: {
    transformDataToEditorjs() {
      return {
        time: this.time,
        blocks: [
          {
            type: "code",
            data: {
              code: this.formDataString
            }
          }
        ],
        version: this.version
      };
    },
    doSubmit(output) {
      alert(JSON.stringify(output));
    },
    cleanEditorData(editorData) {
      return editorData.replace("&gt;", ">").replace("&lt;", "<");
    },
    async refreshForm() {
      try {
        const data = await this.editor.save();
        // console.log(data);
        const codeBlocks = data.blocks.filter(value => value.type === "code");
        if (codeBlocks.length > 0) {
          // this.formData = JSON.parse(codeBlocks[0].data.code);
          this.formDataString = this.cleanEditorData(codeBlocks[0].data.code);
          this.updateFormData();
        }
        this.showSnackbar("Form refreshed", "success");
      } catch (err) {
        this.showSnackbar(err.message, "error");
      }
    },
    updateFormData() {
      this.formData = eval(this.formDataString);
    },
    async refreshEditor(value) {
      // console.log(value);
      try {
        this.formDataString = value
          ? JSON.stringify(value, null, 4)
          : this.formDataString;
      } catch (err) {
        console.log(err);
      }
      if (this.editorInitialized) {
        this.editor.destroy();
      }
      this.editor = new EditorJS({
        holder: "codex-editor",
        tools: {
          code: {
            class: Code,
            inlineToolbar: true
          }
        },
        data: this.transformDataToEditorjs()
      });
      await this.editor.isReady;
      this.editorInitialized = true;
    },
    showSnackbar(message, status) {
      this.message = message;
      this.snackbar = true;
      this.status = status;
    },
    hideSnackbar() {
      this.message = "";
      this.snackbar = false;
      this.status = "info";
    }
  },
  async mounted() {
    this.updateFormData();
    await this.refreshEditor();
  }
};
</script>

<style>
.ce-code__textarea {
  min-height: 85vh !important;
  color: #fff !important;
  background-color: #444 !important;
  font-size: 1rem !important;
}
.grey-background {
  background-color: #eee !important;
}
.white-background {
  background-color: #fff !important;
}
.codex-editor__redactor {
  padding-bottom: 10px !important;
}
</style>
