define([
  'backbone'
], function(Backbone) {
  
  var Router = Backbone.Router.extend({
    
    routes: {
      '(/)':                 'home',
      'login':               'login',
      'access_token=*token': 'token',
      'activity':            'activity',
      'swim':                'swim',
      'sleep':               'sleep',
      'about':               'about',
      'privacy':            'privacy'
    }
    
  });
  
  return Router;
  
});