import Backbone from 'backbone';
import Router from 'router';
import Config from 'config';
import State from 'state';
import HeaderView from 'views/header';
import WidgetOverviewView from 'views/widget_overview';

class App extends Backbone.View {

  initialize() {
    this.router = new Router();
    this.header = new HeaderView({ el: '.header' });
    this.widgetOverview = new WidgetOverviewView({ el: '.js-widget-overview'});
    this.setListeners();
    Backbone.history.start();
  }
  
  setListeners() {
    this.router.on('route:home', this.routeHome, this);
    this.router.on('route:login', this.routeLogin, this);
    this.router.on('route:token', this.routeToken, this);
    this.router.on('route:activity', this.routeActivity, this);
    this.router.on('route:swim', this.routeSwim, this);
    this.router.on('route:sleep', this.routeSleep, this);
    this.router.on('route:about', this.routeAbout, this);

    this.header.listenTo(this.router, 'route', this.header.update);
    this.widgetOverview.listenTo(this.router, 'route',
      this.widgetOverview.update);
  }

  routeHome() {
    if(this.isLogged()) {
      this.router.navigate('activity', { trigger: true });
    }
  }
    
  routeLogin() {
    if(this.isLogged()) {
      this.router.navigate('activity', { trigger: true });
      return;
    }

    location = 'https://api.misfitwearables.com/auth/dialog/authorize' +
        '?response_type=token' +
        `&client_id=${Config.appKey}` +
        `&redirect_uri=${location.href.replace(location.hash, '')}` +
        '&scope=public,birthday,email';
  }

  routeToken(token) {
    State.set('token', token);
    if(localStorage) {
      localStorage.setItem('token', token);
    }
    this.router.navigate('activity', { trigger: true });
  }

  routeAbout() {
    console.log('About');
  }

  routeActivity() {
    if(!this.isLogged) {
      this.router.navigate('login', { trigger: true });
      return;
    }
  }

  routeSwim() {
    if(!this.isLogged) {
      this.router.navigate('login', { trigger: true });
      return;
    }
  }

  routeSleep() {
    if(!this.isLogged) {
      this.router.navigate('login', { trigger: true });
      return;
    }
  }
  
  isLogged() {
    var isTokenInMemory = !!State.get('token');
    var isTokenInLocalStorage = !!localStorage.getItem('token');

    /* In case the token has been saved in the local storage but not in the
       State object, we set it*/
    if(isTokenInLocalStorage && !isTokenInMemory) {
      State.set('token', localStorage.getItem('token'));
    }

    return isTokenInMemory || isTokenInLocalStorage;
  }
}

new App();
