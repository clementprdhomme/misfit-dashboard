define([
  'backbone',
  'handlebars',
  'text!templates/header.handlebars'
], function(Backbone, Handlebars, headerTPL) {

  var HeaderView = Backbone.View.extend({

    template: Handlebars.compile(headerTPL),

    initialize: function() {
      this.render();
    },

    update: function() {
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
    },

    render: function() {
      this.$el.html(this.template());
      this.$menu = this.$el.find('.js-header-menu');
    }

  });

  return HeaderView;

});
