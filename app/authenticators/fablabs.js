import Devise from 'ember-simple-auth/authenticators/devise';

const { RSVP: { Promise }, isEmpty, run, get, $ } = Ember;

export default Devise.extend({
  serverTokenEndpoint: 'http://api.fablabs.dev/sessions',
  identificationAttributeName: 'email_or_username',
  resourceName: 'user',
  tokenAttributeName: 'token',

  makeGetRequest(payload) {
    return $.ajax({
      type: "GET",
      url: "/oauth/authorize?client_id=c0015d629941172c06cdfee6744b7dd173d5398e0ea0d48b7d9e557dd43a22fa&redirect_uri=http%3A%2F%2Ffablabs.dev%3A4200%2Fme&response_type=code",
      data: { },
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      }
    }).then(function(response, status, xhr) {
      var token = "";
      response.match(/\<meta.*?\>/g).map(function(meta) {
        meta = $(meta)[0];
        if (meta.name === "csrf-token") {
          token = meta.content;
        }
      });
      $('meta[name="csrf-token"]').attr('content', token);
      $('input[type=hidden]').val(token);
      //payload['authenticity_token'] = token;
      payload['goto'] = "";
    });
  },

  authenticate(identification, password) {
    return new Promise((resolve, reject) => {
      const { resourceName, identificationAttributeName } = this.getProperties('resourceName', 'identificationAttributeName');
      const data         = {};
      data['password'] = password;
      data[identificationAttributeName] = identification;
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
        }).then(function(response, status, xhr) {
          $token = response['authenticity_token'];
        });
        var options = {
          beforeSend(xhr, settings) {
            xhr.setRequestHeader('X-CSRF-TOKEN', $token);
          }
        };
        $this.makeRequest(data, options).then(
          (response) => run(null, resolve, response),
          (xhr) => run(null, reject, xhr.responseJSON || xhr.responseText)
        ).then(function(){
          var token = JSON.parse(localStorage.getItem('ember_simple_auth:session')).authenticated.session[1][1];
          $.ajax({
            type: "GET",
            url: "/v0/me",
            dataType: "json",
            data: { access_token: token },
            crossDomain: true,
            xhrFields: {
              withCredentials: true
            },
            success: function(response, status, xhr) {
              console.log(response);
            }
          });
        });
      });

    });
  }
});
