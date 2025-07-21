<template>
  <div id="app" class="container py-4">
    <div class="row">
      <div class="col-12">
        <form>
          <base-input
            id="firstName"
            label="First Name"
            v-model="$v.form.firstName.$model"
            :validator="$v.form.firstName"
          />
          <base-input
            id="lastName"
            type="text"
            label="Last Name"
            v-model="$v.form.lastName.$model"
            :validator="$v.form.lastName"
          />
          <base-input
            id="email"
            label="Email"
            type="email"
            v-model="$v.form.email.$model"
            :validator="$v.form.email"
          />
          <base-input
            id="telephone"
            label="Telephone"
            v-model="$v.form.telephone.$model"
            :validator="$v.form.telephone"
            :mask="telephoneMask"
          />
          <base-input
            id="website"
            label="Website"
            v-model="$v.form.website.$model"
            :validator="$v.form.website"
          />

          <base-select
            id="occupation"
            label="Occupation"
            :options="optionsOfSelect"
            v-model="$v.form.occupation.$model"
            :validator="$v.form.occupation"
          />

          <div class="form-group mt-4">
            <button
              type="submit"
              :disabled="$v.form.$invalid"
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
import { url, alpha, email, required } from 'vuelidate/lib/validators';

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
        occupation: '',
        website: '',
      },
      telephoneMask: '(+##) ## ## ## ## ##',
      optionsOfSelect: [
        { label: '', value: '' },
        { label: 'Software developer', value: 'dev' },
        { label: 'Product Manager', value: 'PO' },
        { label: 'DevOps', value: 'devops' },
        { label: 'Tester', value: 'tester' },
        { label: 'UI/UX designer', value: 'ui-ux' },
      ],
    };
  },
  validations: {
    form: {
      firstName: { alpha, required },
      lastName: { alpha, required },
      email: { email, required },
      telephone: {
        validPhone: (phone) =>
          phone.match(
            /((\(\d{3}\) ?)|(\d{3}-))?\d{2} \d{2} \d{2} \d{2} \d{2}/
          ) !== null,
      },
      occupation: { required },
      website: { url },
    },
  },
  methods: {
    onSubmit() {
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
  computed: {},
};
</script>

<style></style>
