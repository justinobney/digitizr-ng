import './index.scss';
import template from './index.html';

function PipeSizeController(){
  const pipeSize = this;

  pipeSize.$onInit = () => {
    if(!pipeSize.items || !pipeSize.items.length){
      throw new Error('pipe-size requires items');
    }
  }

  pipeSize.$onDestroy = () => {
    console.log(`pick-list ::: $onDestroy ::: ${pipeSize.step.text}`);
  };
}


export default angular
  .module('wintake.digitizr.step.pipeSize', [])
  .component('pipeSize', {
    bindings: {
      step: '=',
      items: '<',
      onSelect: '&'
    },
    template: template,
    controller: PipeSizeController
  })
  .name;
