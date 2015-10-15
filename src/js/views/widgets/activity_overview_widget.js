define([
  'backbone',
  'handlebars',
  'text!templates/activity_overview_widget.handlebars'
], function(Backbone, Handlebars, TPL) {

  var ActivityOverviewWidget = Backbone.View.extend({

    template: Handlebars.compile(TPL),

    initialize: function() {

    },

    render: function() {
      this.$el.html(this.template());
    }

  });

  return ActivityOverviewWidget;

});
