import Backbone from 'backbone';
import Handlebars from 'handlebars';
import TPL from 'text!templates/swim_overview_widget.handlebars';

export default class SwimOverviewWidget extends Backbone.View {

  get template() { return Handlebars.compile(TPL); }

  initialize() {}

  render() {
    this.$el.html(this.template());
  }

}
