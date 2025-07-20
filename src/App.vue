<template>
  <div id="app" class="container py-4">
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="onSubmit">
          <BaseInput
            id="firstName"
            label="First Name"
            type="text"
            v-model="form.firstName"
          />
          <BaseInput
            id="lastName"
            type="text"
            label="Last Name"
            v-model="form.lastName"
          />
          <BaseInput
            id="email"
            label="Email"
            type="email"
            v-model="form.email"
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
export default {
  name: 'App',
  components: {
    BaseInput,
  },
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
      },
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
