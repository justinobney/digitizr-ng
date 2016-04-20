function WorkflowService($q, $compile, $injector, $rootScope){
  const svc = this;
  let _stage = null;
  let _stageScope = null;
  let _currentProp = null;
  let state = {lineNo: 'foo'}; // TODO: move to svc

  // TODO: testing

  const items = [
    {text: 'Value 1', value: '1'}
  ];

  const randomItems = () => {
    const items = _.times(_.random(2,9), n => ({text: `Value ${n}`, value: n}))
    return {items};
  };

  svc.config = {
    primary: [
      [
        {
          text: 'Line No',
          key: 'lineNo',
          component: 'pick-list',
          $inject:['$q', '$http'],
          resolve: ($q, $http) => {
            return $q.resolve({items:[{text:'foo', value:'bar'}]});
          }
        },
        {text: 'Sheet No', key: 'sheetNo', component: 'pick-list', resolve: randomItems},
        {text: 'Rev No', key: 'revNo', component: 'pick-list', resolve: randomItems},
        {text: 'Spec', key: 'spec'},
        {text: 'Size', key: 'size'},
        {text: 'Abbr', key: 'abbr', component: 'pick-list', resolve: randomItems},
        {text: 'Quantity', key: 'quantity'}
      ]
    ],
    secondary: [
      [
        {text: 'Class', key: 'class'},
        {text: 'Schedule', key: 'schedule', component: 'pick-list', resolve: randomItems}
      ],
      [
        {text: 'Size 2', key: 'size2'},
        {text: 'Size 3', key: 'size3', component: 'pick-list', resolve: randomItems}
      ],
      [
        {text: 'End 1', key: 'end1'},
        {text: 'End 2', key: 'end2', component: 'pick-list', resolve: randomItems}
      ],
      [
        {text: 'End Condition', key: 'endCondition'}
      ],
      [
        {text: 'Labor/Material', key: 'laborMaterial'},
        {text: 'X-Ray', key: 'xRay', component: 'pick-list', resolve: randomItems}
      ],
      [
        {text: 'Tag No', key: 'tagNo', component: 'pick-list', resolve: randomItems}
      ],
      [
        {text: 'Notes', key: 'notes'}
      ]
    ],
    header: [
      [
        {text: 'Category', key: 'category'},
        {text: 'Code 1', key: 'code1'},
        {text: 'Code 2', key: 'code2', component: 'pick-list', resolve: randomItems},
        {text: 'Code 3', key: 'code3', component: 'pick-list', resolve: randomItems},
        {text: 'Code 4', key: 'code4', component: 'pick-list', resolve: randomItems},
        {text: 'Code 5', key: 'code5', component: 'pick-list', resolve: randomItems},
        {text: 'Code 6', key: 'code6', component: 'pick-list', resolve: randomItems}
      ],
      [
        {text: 'Drawing', key: 'drawing'},
        {text: 'Paint', key: 'paint'},
        {text: 'Insulation', key: 'insulation'},
        {text: 'Area', key: 'area', component: 'pick-list', resolve: randomItems},
        {text: 'Shop', key: 'shop', component: 'pick-list', resolve: randomItems},
        {text: 'Demo', key: 'demo',component:'pick-list', resolve: randomItems},
        {text: 'Underground', key: 'underground', component: 'pick-list', resolve: randomItems}
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
    const defaults = {component: 'generic-step', resolve: () => ({step: step})};
    const config = {...defaults, ...step};

    // resolve and compile
    resolveBindings(config, step).then((bindings) => {
      compile(config, bindings);
    });
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
