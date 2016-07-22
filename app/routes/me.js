import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: service('session'),
  queryParams: {
    access_token: {
      refreshModel: true
    }
  },
  access_token: null,

  model: function(params) {
    return this.store.queryRecord('me', params);
  },

  actions: {
    logout() {
      this.get('session').invalidate();
    },

    updateFirstName(nameValue) {
      var token = JSON.parse(localStorage.getItem('ember_simple_auth:session')).authenticated.token;
      this.store.queryRecord('me', { access_token: token }).then(function (me) {
        me.set('username', nameValue);
        me.save({
          adapterOptions: {
            access_token: token
          }
        });
      });
    }
  }
});
