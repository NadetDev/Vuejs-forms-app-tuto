<template>
  <div id="app" class="container py-4">
    <app-header />
    <div class="row">
      <div class="col-12">
        <form>
          <base-input
            id="firstName"
            label="First Name"
            :value="$store.state.user.firstName"
            @input="updateUser('firstName', $event)"
            :validator="$v.form.firstName"
          />
          <base-input
            id="lastName"
            type="text"
            label="Last Name"
            :value="$store.state.user.lastName"
            @input="updateUser('lastName', $event)"
            :validator="$v.form.lastName"
          />
          <base-input
            id="email"
            label="Email"
            type="email"
            :value="$store.state.user.email"
            @input="updateUser('email', $event)"
            :validator="$v.form.email"
          />
          <base-input
            id="telephone"
            label="Telephone"
            :value="$store.state.user.telephone"
            @input="updateUser('telephone', $event)"
            :validator="$v.form.telephone"
            :mask="telephoneMask"
          />
          <base-input
            id="website"
            label="Website"
            :value="$store.state.user.website"
            @input="updateUser('website', $event)"
            :validator="$v.form.website"
          />

          <base-select
            id="occupation"
            label="Occupation"
            :options="optionsOfSelect"
            :value="$store.state.user.occupation"
            @input="updateUser('occupation', $event)"
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
import AppHeader from './components/AppHeader.vue';
import BaseInput from './components/BaseInput.vue';
import BaseSelect from './components/BaseSelect.vue';
import { url, alpha, email, required } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    AppHeader,
    BaseInput,
    BaseSelect,
  },
  data() {
    return {
      telephoneMask: '(+##) ## ## ## ## ##',
      optionsOfSelect: [
        { label: '', value: '' },
        { label: 'Software developer', value: 'dev' },
        { label: 'Product Manager', value: 'PO' },
        { label: 'DevOps', value: 'devops' },
        { label: 'Tester', value: 'tester' },
        { label: 'UI/UX designer', value: 'ui-ux' },
      ],
      demoUserId: '6e2a',
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
      this.$v.$touch();
      if (this.$v.$invalid) return;
      axios
        .post('http://localhost:3000/users', this.form)
        .then((response) => {
          console.log('Form has been posted', response);
        })
        .catch((error) => {
          console.log('An error occured', error);
        });
    },
    updateUser(property, value) {
      this.$store.dispatch('updateUserData', {
        property,
        value,
      });
      this.$v.form[property].$touch();
    },
  },
  computed: {
    ...mapState({ form: 'user' }),
  },
  created() {
    this.$store.dispatch('getLoggedInUser', this.demoUserId);
  },
};
</script>

<style></style>
