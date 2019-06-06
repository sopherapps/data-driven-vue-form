<template>
  <div />
</template>

<script>
export default {
  props: {
    formData: {
      // Array of objects with properties; 'type', 'value', 'options'
      type: Array,
      default: () => []
    },
    style: {
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
  }
};
</script>
