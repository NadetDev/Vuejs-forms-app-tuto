<template>
  <div id="app" class="container py-4">
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="onSubmit">
          <base-input
            id="firstName"
            label="First Name"
            v-model="form.firstName"
          />
          <base-input
            id="lastName"
            type="text"
            label="Last Name"
            v-model="form.lastName"
          />
          <base-input
            id="email"
            label="Email"
            type="email"
            v-model="form.email"
          />
          <base-input
            id="telephone"
            label="Telephone"
            v-model="form.telephone"
            :mask="telephoneMask"
          />
          <base-select
            id="occupation"
            label="Occupation"
            :options="optionsOfSelect"
            v-model="form.occupation"
          />

          <div class="form-group mt-4">
            <button
              type="submit"
              :disabled="!formIsValid"
              @click.prevent="onSubmit"
              class="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BaseInput from './components/BaseInput.vue';
import BaseSelect from './components/BaseSelect.vue';
export default {
  name: 'App',
  components: {
    BaseInput,
    BaseSelect,
  },
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        telephone: '',
        occupation: 'tester',
      },
      telephoneMask: '(+##) ## ## ## ## ##',
      optionsOfSelect: [
        { label: 'Software developer', value: 'dev' },
        { label: 'Product Manager', value: 'PO' },
        { label: 'DevOps', value: 'devops' },
        { label: 'Tester', value: 'tester' },
        { label: 'UI/UX designer', value: 'ui-ux' },
      ],
    };
  },
  methods: {
    onSubmit() {
      if (!this.formIsValid) return;
      axios
        .post('http://localhost:3000/users', this.form)
        .then((response) => {
          console.log('Form has been posted', response);
        })
        .catch((error) => {
          console.log('An error occured', error);
        });
    },
  },
  computed: {
    formIsValid() {
      return (
        this.form.firstName.length > 0 &&
        this.form.lastName.length > 0 &&
        this.form.email.length > 0 &&
        this.form.email.includes('@')
      );
    },
  },
};
</script>

<style></style>
