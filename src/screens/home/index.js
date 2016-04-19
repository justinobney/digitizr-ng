import styles from './index.scss';
import template from './index.html';

function HomeController($element, workflowService){
  const home = this;

  home.workflowConfig = workflowService.config;
  home.jumpToWorkflow = jumpToWorkflow;

  home.$postLink = () => {
    const mount = $element[0].querySelector('.home-component-stage-content');
    workflowService.registerStage(angular.element(mount));
  }

  function jumpToWorkflow(key){
    workflowService.transition(key);
  }
}

export default angular
  .module('wintake.digitizr.home', [])
  .component('home', {
    template: template,
    controller: HomeController
  })
  .name;
