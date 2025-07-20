<template>
  <div id="app" class="container py-4">
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              class="form-control"
              v-model="form.firstName"
            />
          </div>
          <div class="form-group">
            <label for="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              class="form-control"
              v-model="form.lastName"
            />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              class="form-control"
              v-model="form.email"
            />
          </div>
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
export default {
  name: 'App',
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
