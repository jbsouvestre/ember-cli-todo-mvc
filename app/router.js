import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.resource('todos', {
    path: '/'
  }, function() {
    this.route('active');
    this.route('completed');
  });
});
