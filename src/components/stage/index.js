import styles from './index.scss';
import template from './index.html';

function StageController($element, workflowService){
  const stage = this;
  stage.text = 'stages';

  stage.$postLink = function(){
    workflowService.registerStage($element);
  }
}

export default angular
  .module('wintake.digitizr.stage', [])
  .component('stage', {
    template: template,
    controller: StageController
  })
  .name;
