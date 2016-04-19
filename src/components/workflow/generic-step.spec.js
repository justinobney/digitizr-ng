describe('Component: generic-step', () => {
    let $injector, $compile, $rootScope;
    let workflow, element;

    beforeEach(() => {
      angular.mock.module(
        'wintake.digitizr.step.generic'
      );

      angular.mock.inject(
        _$injector_ => {
          $injector = _$injector_;
          $compile = $injector.get('$compile');
          $rootScope = $injector.get('$rootScope');
        }
      );
    });

    beforeEach(() => {
      $rootScope.step = {text: 'foo', key: 'foo'};
      $rootScope.onSelect = jasmine.createSpy();
      element = $compile(`<generic-step step="step" on-select="onSelect(value)">`)($rootScope);
      $rootScope.$digest();
    });

    it('should register the stage in the $postLink', ()=> {
      expect(element.text().indexOf('foo')).not.toBe(-1);
    });

    it('should call workflow service when button clicked', () => {
      let button = element.find('button');
      button.triggerHandler('click');
      expect($rootScope.onSelect).toHaveBeenCalledWith('foo');
    });
});
