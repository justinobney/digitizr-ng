import styles from './index.scss';
import template from './index.html';

function StageController(){
  const stage = this;
  stage.text = 'stages';
}

export default angular
  .module('wintake.digitizr.stage', [])
  .component('stage', {
    template: template,
    controller: StageController
  })
  .name;
