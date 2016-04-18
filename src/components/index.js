import stage from './stage/index.js';
import genericStep from './workflow/generic-step.js';

const deps = [
  stage,
  genericStep
];


export default angular.module('wintake.digitizr.components', deps).name
