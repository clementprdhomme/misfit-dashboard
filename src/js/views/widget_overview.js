import Backbone from 'backbone';
import ActivityOverviewWidgetView from 'views/widgets/activity_overview_widget';
import SwimOverviewWidgetView from 'views/widgets/swim_overview_widget';
import SleepOverviewWidgetView from 'views/widgets/sleep_overview_widget';

export default class WidgetOverview extends Backbone.View {

  initialize() {
    this.widget = null;
    this.activityWidget = new ActivityOverviewWidgetView({ el: this.$el });
    this.swimWidget = new SwimOverviewWidgetView({ el: this.$el });
    this.sleepWidget = new SleepOverviewWidgetView({ el: this.$el });
  }

  update() {
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
}
