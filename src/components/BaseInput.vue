<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
      v-mask="mask"
      class="form-control"
    />
  </div>
</template>
<script>
export default {
  name: 'base-input',
  props: {
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
      validator(value) {
        return ['text', 'email', 'password'].includes(value);
      },
    },
    value: {
      type: String,
      required: true,
    },
    mask: {
      type: String,
      required: false,
    },
  },
};
</script>
