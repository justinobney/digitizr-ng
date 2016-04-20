import './index.scss';
import template from './index.html';

function EventualPrefixController(){
  const eventualPrefix = this;

  eventualPrefix.$onInit = () => {
    if(!eventualPrefix.items || !eventualPrefix.items.length){
      throw new Error('eventual-pick-list requires items');
    }
  }

  eventualPrefix.$onDestroy = () => {
    console.log(`eventual-prefix ::: $onDestroy ::: ${eventualPrefix.step.text}`);
  };
}

export default angular
  .module('wintake.digitizr.step.eventualPrefix', [])
  .component('eventualPrefix', {
    bindings: {
      step: '=',      
      items: '<',
      onSelect: '&'
    },
    template: template,
    controller: EventualPrefixController
  })
  .name;
