import Ember from 'ember';
import Devise from 'ember-simple-auth/authenticators/devise';

const { RSVP: { Promise }, get, run, isEmpty, $ } = Ember;

export default Devise.extend({
  serverTokenEndpoint: 'http://api.fablabs.dev/sessions',
  identificationAttributeName: 'email_or_username',
  tokenAttributeName: 'token',

  makeGetRequest() {
    return $.ajax({
      type: "GET",
      url: "/oauth/authorize?client_id=c0015d629941172c06cdfee6744b7dd173d5398e0ea0d48b7d9e557dd43a22fa&redirect_uri=http%3A%2F%2Ffablabs.dev%3A4200%2Fme&response_type=code",
      data: { },
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      }
    });
  },

  restore(data) {
    const { tokenAttributeName, identificationAttributeName } = this.getProperties('tokenAttributeName', 'identificationAttributeName');
    const tokenAttribute = get(data, tokenAttributeName);
    const identificationAttribute = get(data, identificationAttributeName);
    if (!isEmpty(tokenAttribute) && !isEmpty(identificationAttribute)) {
      return Promise.resolve(data);
    } else {
      return Promise.reject();
    }
  },

  authenticate(identification, password) {
    return new Promise((resolve, reject) => {
      const { identificationAttributeName } = this.getProperties('identificationAttributeName');
      const data         = {};

      data['password'] = password;
      data[identificationAttributeName] = identification;
      data['goto'] = "";

      var $this = this;
      var $token = '';

      return this.makeGetRequest(data).done(function() {
        $.ajax({
          type: "GET",
          url: "/csrf",
          data: { },
          crossDomain: true,
          xhrFields: {
            withCredentials: true
          }
        }).then(function(response) {
          $token = response['authenticity_token'];
          $('meta[name="csrf-token"]').attr('content', $token);
          $('input[type=hidden]').val($token);
        });

        var options = {
          beforeSend(xhr) {
            xhr.setRequestHeader('X-CSRF-TOKEN', $token);
          }
        };

        $this.makeRequest(data, options).then(
          (response) => run(null, resolve, response),
          (xhr) => run(null, reject, xhr.responseJSON || xhr.responseText)
        );
      });

    });
  }
});
