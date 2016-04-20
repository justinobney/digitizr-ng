//pick-list
//text
//number
//eventual-pick-list
//eventual-prefix
//toggle


const config = {
  primary: [
    [
      {
        text: 'Line No',
        key: 'lineNo',
        component: 'eventual-prefix',
        resolve: () => ({items:[{text:'foo', value:'bar'}]})
      },
      {
        text: 'Sheet No', 
        key: 'sheetNo', 
        component: 'eventual-pick-list',
        resolve: () => ({items:[{text:'foo', value:'bar'}]})
      },
      {
        text: 'Rev No',
        key: 'revNo',
        component: 'eventual-pick-list',
        resolve: () => ({items:[{text:'foo', value:'bar'}]})
      },
      {
        text: 'Spec',
         key: 'spec',
        component: 'pick-list',
        resolve: () => ({items:[{text:'foo', value:'bar'}]})
      },
      {
        text: 'Size',
         key: 'size', 
         component: 'pipe-size',
         resolve: () => ({items:[{value:0.25, text:'1/4'},{value:0.375, text:'3/8'},{value:0.5, text:'1/2'},{value:0.625, text:'5/8'},{value:0.75, text:'3/4'},{value:0.875, text:'7/8'},{value:1, text:'1'},{value:1.5, text:'1.5'},{value:2.5, text:'2.5'},{value:3, text:'3'},{value:4, text:'4'},{value:6, text:'6'},{value:8, text:'8'},{value:10, text:'10'},{value:12, text:'12'},{value:14, text:'14'},{value:16, text:'16'},{value:18, text:'18'},{value:20, text:'20'},{value:24, text:'24'},{value:26, text:'26'},{value:28, text:'28'},{value:30, text:'30'},{value:34, text:'34'},{value:36, text:'36'}]})
      },
      {
        text: 'Abbr',
         key: 'abbr',
        component: 'pick-list',
        resolve: () => ({items:[{text:'foo', value:'bar'}]})
      },
      {
        text: 'Quantity',
         key: 'quantity',
         component: 'number'
      }
    ]
  ],
  secondary: [

    [
      {
        text: 'Class',
        key: 'class',
        component: 'pick-list',
        resolve: () => ({items:[{text:'foo', value:'bar'}]})
      },
      {
        text: 'Schedule', 
        key: 'schedule',
        component: 'pick-list',
        resolve: () => ({items:[{text:'foo', value:'bar'}]})
      }
    ],
    [
      {
        text: 'Size 2', 
        key: 'size2',
        component: 'number'
      },
      {
        text: 'Size 3', 
        key: 'size3',
        component: 'number'
      }
    ],
    [
      {
        text: 'End 1', 
        key: 'end1',
        component: 'text'
      },
      {
        text: 'End 2', 
        key: 'end2',
        component: 'text'
      }
    ],
    [
      {
        text: 'End Condition', 
        key: 'endCondition',
        component:'text'
      }
    ],
    [
      {
        text: 'Labor/Material', 
        key: 'laborMaterial',
        component: 'pick-list',
        resolve: () => ({items:[{text:'foo', value:'bar'}]})
      },
      {
        text: 'X-Ray', 
        key: 'xRay',
        component: 'pick-list',
        resolve: () => ({items:[{text:'foo', value:'bar'}]})
      }
    ],
    [
      {
        text: 'Tag No', 
        key: 'tagNo',
        component: 'eventual-prefix',        
        resolve: () => ({items:[{text:'foo', value:'bar'}]})
      }
    ],
    [
      {
        text: 'Notes', 
        key: 'notes',
        component:'text'
      }
    ]
  ],
  header: [
    [
      {
        text: 'Category', 
        key: 'category',
        component: 'pick-list',
        resolve: () => ({items:[{text:'foo', value:'bar'}]})
      },
      {
        text: 'Code 1', 
        key: 'code1',
        component: 'eventual-pick-list',
        resolve: () => ({items:[{text:'foo', value:'bar'}]})
      },
      {
        text: 'Code 2', 
        key: 'code2',
        component: 'eventual-pick-list',
        resolve: () => ({items:[{text:'foo', value:'bar'}]})
      },
      {
        text: 'Code 3', 
        key: 'code3',
        component: 'eventual-pick-list',
        resolve: () => ({items:[{text:'foo', value:'bar'}]})
      },
      {
        text: 'Code 4', 
        key: 'code4',
        component: 'eventual-pick-list',
        resolve: () => ({items:[{text:'foo', value:'bar'}]})
      },
      {
        text: 'Code 5', 
        key: 'code5',
        component: 'eventual-pick-list',
        resolve: () => ({items:[{text:'foo', value:'bar'}]})
      },
      {
        text: 'Code 6', 
        key: 'code6',
        component: 'eventual-pick-list',
        resolve: () => ({items:[{text:'foo', value:'bar'}]})
      }
    ],
    [
      {
        text: 'Drawing', 
        key: 'drawing',
        component: 'eventual-pick-list',
        resolve: () => ({items:[{text:'foo', value:'bar'}]})
      },
      {
        text: 'Paint', 
        key: 'paint',
        component: 'eventual-pick-list',
        resolve: () => ({items:[{text:'foo', value:'bar'}]})
      },
      {
        text: 'Insulation', 
        key: 'insulation',
        component: 'eventual-pick-list',
        resolve: () => ({items:[{text:'foo', value:'bar'}]})
      },
      {
        text: 'Area', 
        key: 'area',
        component: 'eventual-pick-list',
        resolve: () => ({items:[{text:'foo', value:'bar'}]})
      },
      {
        text: 'Shop', 
        key: 'shop',
        component:'toggle'
      },
      {
        text: 'Demo', 
        key: 'demo',
        component:'toggle'
      },
      {
        text: 'Underground', 
        key: 'underground',
        component:'toggle'
      }
    ]
  ]
};

export default config;
