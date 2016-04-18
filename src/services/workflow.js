function WorkflowService($compile, $rootScope){
  const svc = this;
  let _stage = null;
  let state = {lineNo: 'foo'}; // TODO: move to svc
  svc.config = {
    primary: [
      [
        {text: 'Line No', key: 'lineNo', component: 'generic-step', resolve: () => ({'step': 'lineNo'})},
        {text: 'Sheet No', key: 'sheetNo'},
        {text: 'Rev No', key: 'revNo'},
        {text: 'Spec', key: 'spec'},
        {text: 'Size', key: 'size'},
        {text: 'Abbr', key: 'abbr'},
        {text: 'Quantity', key: 'quantity'}
      ]
    ],
    secondary: [
      [
        {text: 'Class', key: 'class'},
        {text: 'Schedule', key: 'schedule'}
      ],
      [
        {text: 'Size 2', key: 'size2'},
        {text: 'Size 3', key: 'size3'}
      ],
      [
        {text: 'End 1', key: 'end1'},
        {text: 'End 2', key: 'end2'}
      ],
      [
        {text: 'End Condition', key: 'endCondition'}
      ],
      [
        {text: 'Labor/Material', key: 'laborMaterial'},
        {text: 'X-Ray', key: 'xRay'}
      ],
      [
        {text: 'Tag No', key: 'tagNo'}
      ],
      [
        {text: 'Notes', key: 'notes'}
      ]
    ],
    header: [
      [
        {text: 'Category', key: 'category'},
        {text: 'Shop', key: 'shop'},
        {text: 'Demo', key: 'demo'},
        {text: 'Underground', key: 'underground'},
        {text: 'Code 1', key: 'code1'},
        {text: 'Code 2', key: 'code2'},
        {text: 'Code 3', key: 'code3'}
      ],
      [
        {text: 'Drawing', key: 'drawing'},
        {text: 'Paint', key: 'paint'},
        {text: 'Insulation', key: 'insulation'},
        {text: 'Area', key: 'area'},
        {text: 'Code 4', key: 'code4'},
        {text: 'Code 5', key: 'code5'},
        {text: 'Code 6', key: 'code6'}
      ]
    ]
  };

  svc.registerStage = registerStage;
  svc.transition = transition;

  const flatten = list => list.reduce(
    (acc, arr) => acc.concat(Array.isArray(arr) ? flatten(arr) : arr), []
  );

  function registerStage(stage){
    _stage = stage;
  }

  function transition(step){
    if(!_stage){
      throw new Error('stage not set');
    }
    const stepConfig = findTransitionState(step);
    const defaults = {component: 'generic-step', resolve: () => ({step})};
    compile({...defaults, ...stepConfig});
  }

  function findTransitionState(key){
    var configs = svc.config.primary.concat(
      svc.config.secondary,
      svc.config.header
    );

    const step = flatten(configs).filter(v => v.key == key);

    if(step.length !== 1){
      throw new Error('step not found')
    }

    return step[0];
  }

  function compile(config){
    const bindings = config.resolve();
    const props = Object.keys(bindings)
      .map(key => `${key}="${key}"`) // TODO: _.kebabCase(key) maybe?
      .join(' ');

    const scope = Object.keys(bindings).reduce((acc, key) => {
      acc[key] = bindings[key];
      return acc;
    }, $rootScope.$new());

    const html = `<${config.component} ${props}></${config.component}>`;
    const el = angular.element(html);
    $compile(el)(scope);
    angular.element(_stage)
      .empty()
      .append(el);
  }
}

export default angular
  .module('wintake.digitizr.services.workflow', [])
  .service('workflowService', WorkflowService)
  .name;
