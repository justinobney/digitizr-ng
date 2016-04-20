import './index.scss';
import template from './index.html';

function ToggleController(){
  const stepCtrl = this;

  stepCtrl.$onDestroy = () => {
    console.log(`toggle ::: $onDestroy ::: ${stepCtrl.step.text}`);
  };
}

export default angular
  .module('wintake.digitizr.step.toggle', [])
  .component('toggle', {
    bindings: {
      step: '=',
      onSelect: '&'
    },
    template: template,
    controller: ToggleController
  })
  .name;
