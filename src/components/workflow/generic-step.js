function GenericStepController(){
  const stepCtrl = this;
}

export default angular
  .module('wintake.digitizr.step.generic', [])
  .component('genericStep', {
    bindings: {
      step: '='
    },
    template: `
      <div>{{$ctrl.step}}</div>
    `,
    controller: GenericStepController
  })
  .name;
