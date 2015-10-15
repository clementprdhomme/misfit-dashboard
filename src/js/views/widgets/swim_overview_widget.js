define([
  'backbone',
  'handlebars',
  'text!templates/swim_overview_widget.handlebars'
], function(Backbone, Handlebars, TPL) {

  var SwimOverviewWidget = Backbone.View.extend({

    template: Handlebars.compile(TPL),

    initialize: function() {

    },

    render: function() {
      this.$el.html(this.template());
    }

  });

  return SwimOverviewWidget;

});
