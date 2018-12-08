import Component from '@ember/component';

export default Component.extend({
  didInsertElement() {
    let dimensionElement = this.element.querySelector('.dimensions');

    let [xRatio, yRatio] = this.ratio.split(',');
    dimensionElement.style.paddingTop = `calc(100% / ${xRatio} * ${yRatio})`

    let width = dimensionElement.offsetWidth;
    let height = dimensionElement.offsetHeight;
    var rect = dimensionElement.getBoundingClientRect();
    let left = rect.left.toFixed(2);
    let top = rect.top.toFixed(2);

    this.setProperties({
      width,
      height,
      left,
      top,
    });
  }
});
