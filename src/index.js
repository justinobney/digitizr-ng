// npm
import angular from 'angular';
import uibs from 'angular-ui-bootstrap';
import uiRouter from 'angular-ui-router';

// screens
import home from './screens/home/index.js';

// components
import sample from './components/sample.js'

// services
// import api from './services/api.js';

// style
import styles from 'index.css';

// app template
import appTemplate from './screens/app.html';

AppConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function AppConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: '/',
      template: '<home></home>'
    })
    .state('home.sample', {
      url: 'sample',
      template: '<sample></sample>'
    });
}

AppBootstrap.$inject = ['config'];
function AppBootstrap (config) {
  config.apiHeader = localStorage.getItem('apiHeader');
}

const deps = [
  uibs,
  uiRouter,
  home,
  sample
];


angular.module('wintake.digitizr', deps)
  .component('app', {
    template: appTemplate
  })
  .value('config', {})
  .config(AppConfig)
  .run(AppBootstrap, AppBootstrap);

angular.bootstrap(document, ['wintake.digitizr']);