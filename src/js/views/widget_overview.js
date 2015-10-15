define([
  'backbone',
  'views/widgets/activity_overview_widget',
  'views/widgets/swim_overview_widget',
  'views/widgets/sleep_overview_widget'
], function(Backbone, ActivityOverviewWidgetView, SwimOverviewWidgetView,
  SleepOverviewWidgetView) {

  var WidgetOverview = Backbone.View.extend({

    initialize: function() {
      this.widget = null;
      this.activityWidget = new ActivityOverviewWidgetView({ el: this.$el });
      this.swimWidget = new SwimOverviewWidgetView({ el: this.$el });
      this.sleepWidget = new SleepOverviewWidgetView({ el: this.$el });
    },

    update: function() {
      if(!!arguments.length) {
        this.$el.html();

        var page = arguments[0];
        switch(page) {
          case 'activity':
            this.widget = this.activityWidget;
            break;
          case 'swim':
            this.widget = this.swimWidget;
            break;
          case 'sleep':
            this.widget = this.sleepWidget;
            break;
        }

        if(!!this.widget) {
          this.widget.render();
        }
      }
    }

  });

  return WidgetOverview;

});
