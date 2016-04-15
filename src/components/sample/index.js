import template from './index.html';

function SampleController(){
  const sample = this;
  sample.text = 'samples';
}

export default angular
  .module('wintake.digitizr.sample', [])
  .component('sample', {
    template: template,
    controller: SampleController
  })
  .name;
