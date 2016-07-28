import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  host: 'http://fablabs.dev:8080',
  namespace:  'v1',
  authorizer: 'authorizer:fablabs',
  headers: {
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('ember_simple_auth:session')).authenticated.token
  }
});
