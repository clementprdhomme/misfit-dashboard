import Backbone from 'backbone';
import Handlebars from 'handlebars';
import TPL from 'text!templates/activity_overview_widget.handlebars';

export default class ActivityOverviewWidget extends Backbone.View {

  get template() { return Handlebars.compile(TPL); }

  initialize() {}

  render() {
    this.$el.html(this.template());
  }

}
