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
      element = $compile('<generic-step step="foo">')($rootScope);
      $rootScope.$digest();
    });

    it('should register the stage in the $postLink', ()=> {
      expect(element.text().indexOf('foo')).toBe(-1);
    });
});
