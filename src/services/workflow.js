function WorkflowService(){
  const svc = this;
  svc.config = {
    primary: [
      [
        {text: 'Line No', key: 'lineNo'},
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
}

export default angular
  .module('wintake.digitizr.services.workflow', [])
  .service('workflowService', WorkflowService)
  .name;
