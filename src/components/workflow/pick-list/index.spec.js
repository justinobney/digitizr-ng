describe('Component: pick-list', () => {
    let $injector, $compile, $rootScope;
    let workflow, element;

    beforeEach(() => {
      angular.mock.module(
        'wintake.digitizr.step.pickList'
      );

      angular.mock.inject(
        _$injector_ => {
          $injector = _$injector_;
          $compile = $injector.get('$compile');
          $rootScope = $injector.get('$rootScope');
        }
      );
    });

    describe('with all requirements', () => {
      beforeEach(() => {
        $rootScope.items = [{text: 'Value 1', value: '1'}, {text: 'Value 2', value: '2'}];
        compile($rootScope);
      });

      it('should register the stage in the $postLink', ()=> {
        let button = element.find('button');
        expect(element.text().indexOf('foo')).not.toBe(-1);
        expect(button.length).toBe($rootScope.items.length);
      });

      it('should call workflow service when button clicked', () => {
        let button = element.find('button');
        angular.element(button[0]).triggerHandler('click');
        expect($rootScope.onSelect).toHaveBeenCalledWith('1');
      });
    })

    describe('compile tests', () => {

      it('should register the stage in the $postLink', ()=> {
        const action = () => compile($rootScope);
        expect(action).toThrowError();
      });
    })

    function compile(scope){
      scope.step = {text: 'foo', key: 'foo'};
      scope.onSelect = jasmine.createSpy();
      element = $compile(`<pick-list step="step" on-select="onSelect(value)" items="items">`)(scope);
      $rootScope.$digest();
    }
});
