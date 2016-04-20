import genericStep from './workflow/generic-step/index.js';
import pickList from './workflow/pick-list/index.js';

const deps = [
  genericStep,
  pickList
];


export default angular.module('wintake.digitizr.components', deps).name
