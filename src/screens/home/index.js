import styles from './index.scss';
import template from './index.html';

function HomeController(){
  const home = this;
  home.text = 'hi component';
}

export default angular
  .module('wintake.digitizr.home', [])
  .component('home', {
    template: template,
    controller: HomeController
  })
  .name;
