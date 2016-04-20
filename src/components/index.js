import eventualPickList from './workflow/eventual-pick-list/index.js';
import eventualPrefix from './workflow/eventual-prefix/index.js';
import genericStep from './workflow/generic-step/index.js';
import number from './workflow/number/index.js';
import pickList from './workflow/pick-list/index.js';
import text from './workflow/text/index.js';
import toggle from './workflow/toggle/index.js';
import pipeSize from './workflow/pipe-size/index.js';

const deps = [
  genericStep,
  pickList,
  eventualPickList,
  eventualPrefix,
  number,
  text,
  toggle,
  pipeSize
];


export default angular.module('wintake.digitizr.components', deps).name
