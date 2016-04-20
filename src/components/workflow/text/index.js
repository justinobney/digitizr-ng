import './index.scss';
import template from './index.html';

function TextController(){
  const stepCtrl = this;

  stepCtrl.$onDestroy = () => {
    console.log(`text ::: $onDestroy ::: ${stepCtrl.step.text}`);
  };
}

export default angular
  .module('wintake.digitizr.step.text', [])
  .component('text', {
    bindings: {
      step: '=',
      onSelect: '&'
    },
    template: template,
    controller: TextController
  })
  .name;
