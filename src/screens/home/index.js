import styles from './index.css';
import template from './index.html';

function HomeDirective(){
  return {
    restrict: 'E',
    template: template,
    controller: HomeController,
    controllerAs: 'home'
  }
}

HomeController.$inject = []
function HomeController(){
  const home = this;

  home.text = 'hi';

}

export default angular
  .module('wintake.digitizr.home', [])
  .directive('home', HomeDirective)
  .name;
