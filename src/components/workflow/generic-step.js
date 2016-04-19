function GenericStepController(){
  const stepCtrl = this;

  stepCtrl.$onDestroy = () => {
    console.log(`$onDestroy ${stepCtrl.step}`);
  };
}

export default angular
  .module('wintake.digitizr.step.generic', [])
  .component('genericStep', {
    bindings: {
      step: '='
    },
    template: `
      <div>Generic Step: "{{$ctrl.step}}"</div>
    `,
    controller: GenericStepController
  })
  .name;
