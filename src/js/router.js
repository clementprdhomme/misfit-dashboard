import Backbone from 'backbone';

export default class Router extends Backbone.Router {
  
  get routes() {
    return {
      '(/)':                 'home',
      'login':               'login',
      'access_token=*token': 'token',
      'activity':            'activity',
      'swim':                'swim',
      'sleep':               'sleep',
      'about':               'about',
      'privacy':             'privacy'
    };
  }
  
}
