<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <select class="form-control" @change="$emit('input', $event.target.value)">
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :selected="value === option.value"
      >
        {{ option.label || 'No label' }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'base-select',
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
      validator(opts) {
        return !opts.find((opt) => typeof opt !== 'object');
      },
    },
    value: {
      type: String,
      required: true,
    },
  },
};
</script>
