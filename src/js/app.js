require.config({
  baseUrl: 'js',

  paths: {
    jquery: '../lib/jquery/dist/jquery.min',
    underscore: '../lib/underscore/underscore-min',
    backbone: '../lib/backbone/backbone-min',
    handlebars: '../lib/handlebars/handlebars.min',
    text: '../lib/text/text'
  }
});

require([
  'backbone',
  'router'
], function(Backbone, Router) {
  
  var App = Backbone.View.extend({
    
    initialize: function() {
      this.router = new Router();
      Backbone.history.start();
      this.setListeners();
    },
    
    setListeners: function() {
      this.router.on('route:home', this.routeHome, this);
      this.router.on('route:about', this.routeAbout, this);
    },
    
    routeHome: function() {
      console.log('Homepage');
    },
    
    routeAbout: function() {
      console.log('About');
    }
    
  });
  
  new App();
  
});