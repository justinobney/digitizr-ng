function WorkflowService($q, $compile, $injector, $rootScope){
  const svc = this;
  let _stage = null;
  let _stageScope = null;
  let state = {lineNo: 'foo'}; // TODO: move to svc
  svc.config = {
    primary: [
      [
        {
          text: 'Line No',
          key: 'lineNo',
          component: 'generic-step',
          $inject:['$q', '$http'],
          resolve: ($q, $http) => {
            // can return object
            // or promise that resolves with full object
            return $q.resolve({'step': 'lineNo'});
          }
        },
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
        {text: 'Code 1', key: 'code1'},
        {text: 'Code 2', key: 'code2'},
        {text: 'Code 3', key: 'code3'},
        {text: 'Code 4', key: 'code4'},
        {text: 'Code 5', key: 'code5'},
        {text: 'Code 6', key: 'code6'}
      ],
      [
        {text: 'Drawing', key: 'drawing'},
        {text: 'Paint', key: 'paint'},
        {text: 'Insulation', key: 'insulation'},
        {text: 'Area', key: 'area'},
        {text: 'Shop', key: 'shop'},
        {text: 'Demo', key: 'demo'},
        {text: 'Underground', key: 'underground'}
      ]
    ]
  };

  svc.registerStage = registerStage;
  svc.transition = transition;

  const flatten = list => list.reduce(
    (acc, arr) => acc.concat(Array.isArray(arr) ? flatten(arr) : arr), []
  );

  const identityFn = x => x;

  function registerStage(stage){
    _stage = stage;
  }

  function transition(step){
    // ensure stage
    if(!_stage){
      throw new Error('stage not set');
    }

    // cleanup previously staged component
    if(_stageScope){
      _stageScope.$broadcast('$destroy');
    }

    // mount new component
    const stepConfig = findTransitionState(step);
    const defaults = {component: 'generic-step', resolve: () => ({step})};
    const config = {...defaults, ...stepConfig};

    // resolve and compile
    resolveBindings(config).then((bindings) => {
      compile(config, bindings);
    });
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

  function resolveBindings(config){
    const deps = (config.$inject || []).map(
      dep => $injector.get(dep)
    );

    const bindings = config.resolve(...deps);

    if(bindings.then){
      return bindings.then(identityFn);
    } else {
      return $q.resolve(bindings);
    }
  }

  function compile(config, bindings){
    const props = Object.keys(bindings)
      .map(key => `${key}="${key}"`) // TODO: _.kebabCase(key) maybe?
      .join(' ');

    _stageScope = Object.keys(bindings).reduce((acc, key) => {
      acc[key] = bindings[key];
      return acc;
    }, $rootScope.$new());

    const html = `<${config.component} ${props}></${config.component}>`;
    const el = angular.element(html);
    $compile(el)(_stageScope);
    angular.element(_stage)
      .empty()
      .append(el);
  }
}

export default angular
  .module('wintake.digitizr.services.workflow', [])
  .service('workflowService', WorkflowService)
  .name;
