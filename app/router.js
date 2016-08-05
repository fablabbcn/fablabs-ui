import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('me');
  this.route('labs', { path: '/labs' }, function() {
    this.route('lab', { path: '/:lab_slug' });
  });
  this.route('projects', { path: '/projects' }, function() {
    this.route('project', { path: '/:id' });
  });
});

export default Router;
