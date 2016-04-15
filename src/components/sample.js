import template from './sample.html';

function SampleController(){
  const sample = this;
  sample.text = 'sample';
}

export default angular
  .module('wintake.digitizr.sample', [])
  .component('sample', {
    template: template,
    controller: SampleController
  })
  .name;
