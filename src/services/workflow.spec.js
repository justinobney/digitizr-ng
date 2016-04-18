describe('Service: workflowService', () => {
    let $injector, $rootScope;
    let workflow;

    beforeEach(() => {
      angular.mock.module(
        'wintake.digitizr.services.workflow',
        'wintake.digitizr.step.generic'
      );

      angular.mock.inject(
        _$injector_ => {
          $injector = _$injector_;
          $rootScope = $injector.get('$rootScope');
          workflow = $injector.get('workflowService');
        }
      );
    });

    it('transition should throw if stage has not been registered', () => {
      const action = () => workflow.transition('key');
      expect(action).toThrow();
    });

    describe('with stage registered', () => {
      const stage = angular.element('<div></div>');
      beforeEach(() => {
        workflow.registerStage(stage);
      });

      it('transition should throw if key not found', () => {
        const action = () => workflow.transition('key');
        expect(action).toThrow();
      });

      it('transition should compile and load step', () => {
        // component and resolve found
        workflow.transition('lineNo');
        $rootScope.$digest();
        expect(stage.text().indexOf('lineNo')).not.toBe(-1)
        const component = angular.element(stage.children()[0]);
        const componentCtrl = component.controller('genericStep');
        spyOn(componentCtrl, '$onDestroy');

        // uses default config
        workflow.transition('spec');
        $rootScope.$digest();
        expect(componentCtrl.$onDestroy).toHaveBeenCalled();
        expect(stage.text().indexOf('spec')).not.toBe(-1)
      });
    });
});
