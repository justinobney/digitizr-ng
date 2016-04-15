// npm
import angular from 'angular';
import uibs from 'angular-ui-bootstrap';
import uiRouter from 'angular-ui-router';

// config
import routeConfig from './config/route.js';

import screens from './screens/index.js';
import components from './components/index.js'
// import services from './services/index.js';

// app template
import appTemplate from './screens/app.html';

// style
import styles from 'index.css';

function AppBootstrap (config) {
  config.apiHeader = localStorage.getItem('apiHeader');
}

const deps = [
  uibs,
  uiRouter,
  screens,
  components
];


export default angular.module('wintake.digitizr', deps)
  .component('app', {
    template: appTemplate
  })
  .value('config', {})
  .config(routeConfig)
  .run(AppBootstrap, AppBootstrap);

angular.bootstrap(document, ['wintake.digitizr']);
