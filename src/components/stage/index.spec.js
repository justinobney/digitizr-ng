describe('Component: stage', () => {
    let $injector, $compile, $rootScope;
    let workflow, element;

    beforeEach(() => {
      angular.mock.module(
        'wintake.digitizr.stage',
        'wintake.digitizr.services.workflow'
      );

      angular.mock.inject(
        _$injector_ => {
          $injector = _$injector_;
          $compile = $injector.get('$compile');
          $rootScope = $injector.get('$rootScope');
          workflow = $injector.get('workflowService');
        }
      );
    });

    beforeEach(() => {
      spyOn(workflow, 'registerStage');
      element = $compile('<stage>')($rootScope);
      $rootScope.$digest();
    });

    it('should register the stage in the $postLink', ()=> {
      expect(workflow.registerStage).toHaveBeenCalled();
    });
});
