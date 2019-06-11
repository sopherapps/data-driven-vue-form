// Type definitions for v-data-form 0.1.3
// Project: v-data-form
// Definitions by: Martin Ahindura <https://github.com/Tinitto>

/*~ This is the module template file for class modules.
 *~ You should rename it to index.d.ts and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */

// Note that ES6 modules cannot directly export class objects.
// This file should be imported using the CommonJS-style:
//   import x = require('[~THE MODULE~]');
//
// Alternatively, if --allowSyntheticDefaultImports or
// --esModuleInterop is turned on, this file can also be
// imported as a default import:
//   import x from '[~THE MODULE~]';
//
// Refer to the TypeScript documentation at
// https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require
// to understand common workarounds for this limitation of ES6 modules.

import Vue from "vue";

interface formItem {
  type: string;
  name: string;
  options?: any;
  children?: formItem;
}

export = VDataForm;

declare class VDataForm extends Vue {
  readonly output: Map<string, any>;
  readonly formInlineStyle: string;

  readonly $props: {
    options?: Object;
    value?: Array<formItem>;
    styleObj?: any;
    submissionButtonLabel?: string;
    cancellationButtonLabel?: string;
  };

  readonly $data: { valid: boolean; model: any };

  resetValidation(): void;
  submit(): void;
  cancel(): void;
  change(): void;
  input(): void;
  update(value: { key: string; model: any }): void;
  onChange(value: any): void;
  onInput(value: any): void;
}
