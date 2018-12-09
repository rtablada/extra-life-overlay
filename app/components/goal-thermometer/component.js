import Component from '@ember/component';

import { scheduleOnce } from '@ember/runloop';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    scheduleOnce('afterRender', this, this.setThermometer);
  },

  setThermometer() {
    let outerEl = this.element.querySelector('[data-outer]');
    let innerEl = this.element.querySelector('[data-inner]');

    let outerHeight = outerEl.offsetHeight;
    innerEl.style.height = `calc(${outerHeight}px / ${this.nextGoal} * ${this.value}`;
  }
});
