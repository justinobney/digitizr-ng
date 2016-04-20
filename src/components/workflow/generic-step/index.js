import './index.scss';

import template from './index.html';

function GenericStepController(){
  const stepCtrl = this;

  stepCtrl.$onDestroy = () => {
    console.log(`generic-step ::: $onDestroy ::: ${stepCtrl.step.text}`);
  };
}



export default angular
  .module('wintake.digitizr.step.generic', [])
  .component('genericStep', {
    bindings: {
      step: '=',
      onSelect: '&'
    },
    
    template: template,
    controller: GenericStepController
  })
  .name;

