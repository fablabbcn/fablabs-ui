import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  ajax: Ember.inject.service(),

  session: service('session'),

  actions: {

    authenticate: function() {
      let { identification, password } = this.getProperties('identification', 'password');
      return this.get('session').authenticate('authenticator:fablabs', identification, password).catch((reason) => {
        this.set('errorMessage', reason.error);
      });
    },
  }
});
