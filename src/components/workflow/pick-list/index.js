import './index.scss';
import template from './index.html';

function PickListController(){
  const pickList = this;

  pickList.$onInit = () => {
    if(!pickList.items || !pickList.items.length){
      throw new Error('pick-list requires items');
    }
  }

  pickList.$onDestroy = () => {
    console.log(`pick-list ::: $onDestroy ::: ${pickList.step.text}`);
  };
}


export default angular
  .module('wintake.digitizr.step.pickList', [])
  .component('pickList', {
    bindings: {
      step: '=',
      items: '<',
      onSelect: '&'
    },
    template: template,
    controller: PickListController
  })
  .name;
