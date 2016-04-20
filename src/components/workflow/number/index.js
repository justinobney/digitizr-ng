import './index.scss';
import template from './index.html';

function NumberController(){
  const stepCtrl = this;
  stepCtrl.text = '';

  stepCtrl.clear = clear;
  stepCtrl.numberButtonPress = numberButtonPress;
  
  function numberButtonPress(value){
    stepCtrl.text += value;
  }  

  function clear(){
    stepCtrl.text = '';
  }

  stepCtrl.$onDestroy = () => {
    console.log(`number ::: $onDestroy ::: ${stepCtrl.step.text}`);
  };
}

export default angular
  .module('wintake.digitizr.step.number', [])
  .component('number', {
    bindings: {
      step: '=',
      onSelect: '&'
    },
    template: template,
    controller: NumberController
  })
  .name;
