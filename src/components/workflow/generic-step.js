import './generic-step.scss';

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
    template: `
      <div class="home-component-stage-header">
        {{$ctrl.step.text}}
      </div>
      <div class="home-component-stage-content">
        <button ng-click="$ctrl.onSelect({value:'foo'})"
                class="generic-step-button">
          Click Me
        </button>
      </div>
    `,
    controller: GenericStepController
  })
  .name;
