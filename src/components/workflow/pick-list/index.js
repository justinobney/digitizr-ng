import './index.scss';

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
      currentValue: '<',
      onSelect: '&'
    },
    template: `
      <div class="home-component-stage-header">
        {{$ctrl.step.text}}
      </div>
      <div class="home-component-stage-content">
        <button ng-repeat="item in $ctrl.items"
                ng-click="$ctrl.onSelect({value:item.value})"
                class="pick-list-button">
          {{item.text}}
        </button>
      </div>
    `,
    controller: PickListController
  })
  .name;
