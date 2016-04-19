function WorkflowService($q, $compile, $injector, $rootScope){
  const svc = this;
  let _stage = null;
  let _stageScope = null;
  let _currentProp = null;
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
            return $q.resolve({});
          }
        },
        {
          text: 'Sheet No',
          key: 'sheetNo',
          component: 'pick-list',
          $inject:['$q', '$http'],
          resolve: ($q) => $q.resolve({items: [
            {text: 'Value 1', value: '1'},
            {text: 'Value 2', value: '2'},
            {text: 'Value 3', value: '3'},
            {text: 'Value 4', value: '4'}
          ]})
        },
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
  svc.handlePropUpdate = handlePropUpdate;

  const flatten = list => list.reduce(
    (acc, arr) => acc.concat(Array.isArray(arr) ? flatten(arr) : arr), []
  );

  const identityFn = x => x;

  function findNextStep(step){
    //TODO: Add non-naive strategy
    var configs = svc.config.primary.concat(
      svc.config.secondary,
      svc.config.header
    );

    const steps = flatten(configs).sort((a, b) => {
      if (a.key > b.key) { return 1; }
      return a.key < b.key ? -1 : 0;
    });

    const currIdx = steps.findIndex(x=>x.key === step);
    if(steps.length - 1 > currIdx){
      return steps[currIdx+1];
    }

  }

  function handlePropUpdate(value){
    state[_currentProp] = value;
    var nextStep = findNextStep(_currentProp);
    if(nextStep){
      transition(nextStep);
    }

    //TODO: remove
    console.log(state);
  }

  function registerStage(stage){
    _stage = stage;
  }


  // transition workflow

  function transition(step){
    // ensure stage
    if(!_stage){
      throw new Error('stage not set');
    }

    // cleanup previously staged component
    if(_stageScope){
      _stageScope.$broadcast('$destroy');
    }

    _currentProp = step.key;

    // mount new component
    const stepConfig = findTransitionState(step.key);
    const defaults = {component: 'generic-step', resolve: () => ({step: step})};
    const config = {...defaults, ...stepConfig};

    // resolve and compile
    resolveBindings(config, step).then((bindings) => {
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

  function resolveBindings(config, step){
    const decorateBindings = (props) => {
      props.step = step;
      props.currentValue = state[_currentProp];
    };

    const deps = (config.$inject || []).map(
      dep => $injector.get(dep)
    );

    const bindings = config.resolve(...deps);

    if(bindings.then){
      return bindings.then(resolved => {
        decorateBindings(resolved);
        return resolved;
      });
    } else {
      decorateBindings(bindings);
      return $q.resolve(bindings);
    }
  }

  function compile(config, bindings){
    const props = Object.keys(bindings)
      .map(key => `${_.kebabCase(key)}="${key}"`)
      .concat(['on-select="onSelect(value)"'])
      .join(' ');

    _stageScope = Object.keys(bindings).reduce((acc, key) => {
      acc[key] = bindings[key];
      return acc;
    }, $rootScope.$new());

    _stageScope.onSelect = (value) => svc.handlePropUpdate(value);

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
