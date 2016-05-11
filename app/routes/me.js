import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: service('session'),

  model: function() {
    var token = JSON.parse(localStorage.getItem('ember_simple_auth:session')).authenticated.token;
    return this.store.queryRecord('me', { access_token: token });
  },

  actions: {
    logout() {
      this.get('session').invalidate();
    }
  }
});
