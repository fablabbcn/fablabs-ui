// app/session-stores/application.js
import AdaptiveStore from 'ember-simple-auth/session-stores/adaptive';

export default AdaptiveStore.extend({
  cookieName: 'XSRF-TOKEN'
});

$(function() {
  var token = $('meta[name="csrf-token"]').attr('content');
  return $.ajaxPrefilter(function(options, originalOptions, xhr) {
      return xhr.setRequestHeader('X-CSRF-Token', token);
  });
});
