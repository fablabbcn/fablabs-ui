import Ember from 'ember';
import AdaptiveStore from 'ember-simple-auth/session-stores/adaptive';
const { $ } = Ember;

export default AdaptiveStore.extend({
  cookieName: 'XSRF-TOKEN'
});

$(function() {
  var token = $('meta[name="csrf-token"]').attr('content');
  return $.ajaxPrefilter(function(options, originalOptions, xhr) {
      return xhr.setRequestHeader('X-CSRF-Token', token);
  });
});
