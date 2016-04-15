import template from './sample.html';

function Sample(){
  return {
    restrict: 'E',
    scope: {},
    template: template,
    controller: SampleController,
    controllerAs: 'sample',
    bindToController: true
  }
}

SampleController.$inject = [];
function SampleController(){
  const sample = this;

  sample.text = 'sample';
}

export default angular
  .module('wintake.digitizr.sample', [])
  .directive('sample', Sample)
  .name;
