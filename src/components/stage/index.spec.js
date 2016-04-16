describe('Component: CardPractice', () => {
    let $compile, $rootScope;
    let element;

    beforeEach(angular.mock.module('wintake.digitizr.stage'));
    beforeEach(angular.mock.inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    beforeEach(() => {
        element = $compile('<stage>')($rootScope);
        $rootScope.$digest();
    });

    it('should say hello to the world', ()=> {
        expect(true).toBeTruthy();
    });
});
