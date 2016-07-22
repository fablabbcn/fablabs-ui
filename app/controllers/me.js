import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: service('session'),
  queryParams: ['access_token'],
  access_token: JSON.parse(localStorage.getItem('ember_simple_auth:session')).authenticated.token,

});
