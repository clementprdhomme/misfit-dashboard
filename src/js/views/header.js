import Backbone from 'backbone';
import Handlebars from 'handlebars';
import headerTPL from 'text!templates/header.handlebars';

export default class HeaderView extends Backbone.View {

  get template() { return Handlebars.compile(headerTPL); }

  initialize() {
    this.render();
  }

  update() {
    if(!!arguments.length) {
      var page = arguments[0];
      var menuClass = '';
      switch(page) {
        case 'activity':
          menuClass = 'header__menu--activity';
          break;
        case 'swim':
          menuClass = 'header__menu--swim';
          break;
        case 'sleep':
          menuClass = 'header__menu--sleep';
          break;
      }

      this.$menu.removeClass(function() {
        return (this.className.match(/header__menu--.*/g) || []).join(' ');
      });
      this.$menu.addClass(menuClass);
    }
  }

  render() {
    this.$el.html(this.template());
    this.$menu = this.$el.find('.js-header-menu');
  }

}
