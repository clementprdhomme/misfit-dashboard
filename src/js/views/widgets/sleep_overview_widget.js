define([
  'backbone',
  'handlebars',
  'text!templates/sleep_overview_widget.handlebars'
], function(Backbone, Handlebars, TPL) {

  var SleepOverviewWidget = Backbone.View.extend({

    template: Handlebars.compile(TPL),

    initialize: function() {

    },

    render: function() {
      this.$el.html(this.template());
    }

  });

  return SleepOverviewWidget;

});
