import genericStep from './workflow/generic-step.js';
import pickList from './workflow/pick-list.js';

const deps = [
  genericStep,
  pickList
];


export default angular.module('wintake.digitizr.components', deps).name
