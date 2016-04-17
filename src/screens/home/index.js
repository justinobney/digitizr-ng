import styles from './index.scss';
import template from './index.html';

function HomeController(workflowService){
  const home = this;
  home.workflowConfig = workflowService.config;

  home.jumpToWorkflow = jumpToWorkflow;

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
