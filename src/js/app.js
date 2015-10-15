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
  'router',
  'config',
  'state',
  'views/header',
  'views/widget_overview'
], function(Backbone, Router, Config, State, HeaderView, WidgetOverviewView) {
  
  var App = Backbone.View.extend({
    
    initialize: function() {
      this.router = new Router();
      this.header = new HeaderView({ el: '.header' });
      this.widgetOverview = new WidgetOverviewView({ el: '.js-widget-overview'});
      this.setListeners();
      Backbone.history.start();
    },
    
    setListeners: function() {
      this.router.on('route:home', this.routeHome, this);
      this.router.on('route:login', this.routeLogin, this);
      this.router.on('route:token', this.routeToken, this);
      this.router.on('route:activity', this.routeActivity, this);
      this.router.on('route:swim', this.routeSwim, this);
      this.router.on('route:sleep', this.routeSleep, this);
      this.router.on('route:about', this.routeAbout, this);

      this.header.listenTo(this.router, 'route', this.header.update);
      this.widgetOverview.listenTo(this.router, 'route', this.widgetOverview.update);
    },
    
    routeHome: function() {
      if(this.isLogged()) {
        this.router.navigate('activity', { trigger: true });
      }
    },
    
    routeLogin: function() {
      if(this.isLogged()) {
        this.router.navigate('activity', { trigger: true });
        return;
      }
      
      var url = 'https://api.misfitwearables.com/auth/dialog/authorize' +
          '?response_type=token' +
          '&client_id=' + Config.appKey +
          '&redirect_uri=' + location.href.replace(location.hash, '') +
          '&scope=public,birthday,email';
      location = url;
    },
    
    routeToken: function(token) {
      State.set('token', token);
      if(localStorage) {
        localStorage.setItem('token', token);
      }
      this.router.navigate('activity', { trigger: true });
    },
    
    routeAbout: function() {
      console.log('About');
    },
    
    routeActivity: function() {
      if(!this.isLogged) {
        this.router.navigate('login', { trigger: true });
        return;
      }
    },
    
    routeSwim: function() {
      if(!this.isLogged) {
        this.router.navigate('login', { trigger: true });
        return;
      }
    },
    
    routeSleep: function() {
      if(!this.isLogged) {
        this.router.navigate('login', { trigger: true });
        return;
      }
    },
    
    isLogged: function() {
      var isTokenInMemory = !!State.get('token');
      var isTokenInLocalStorage = !!localStorage.getItem('token');
      
      /* In case the token has been saved in the local storage but not in the
         State object, we set it */
      if(isTokenInLocalStorage && !isTokenInMemory) {
        State.set('token', localStorage.getItem('token'));
      }
      
      return isTokenInMemory || isTokenInLocalStorage;
    }
    
  });
  
  new App();
  
});
