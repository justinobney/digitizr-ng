function GenericStepController($stateParams){
  const step = this;
  step.text = $stateParams.step;
}

export default angular
  .module('wintake.digitizr.step.generic', [])
  .component('genericStep', {
    template: `
      <div>{{$ctrl.text}}</div>
    `,
    controller: GenericStepController
  })
  .name;
