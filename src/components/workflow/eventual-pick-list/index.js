import './index.scss';
import template from './index.html';

function EventualPickListController(){
  const pickList = this;

  pickList.$onInit = () => {
    if(!pickList.items || !pickList.items.length){
      throw new Error('eventual-pick-list requires items');
    }
  }

  pickList.$onDestroy = () => {
    console.log(`eventual-pick-List ::: $onDestroy ::: ${pickList.step.text}`);
  };
}


export default angular
  .module('wintake.digitizr.step.eventualPickList', [])
  .component('eventualPickList', {
    bindings: {
      step: '=',
      items: '<',
      onSelect: '&'
    },
    template: template,
    controller: EventualPickListController
  })
  .name;
