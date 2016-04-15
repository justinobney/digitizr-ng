describe('Component: CardPractice', () => {
    let $compile, $rootScope;
    let element;

    beforeEach(angular.mock.module('wintake.digitizr.sample'));
    beforeEach(angular.mock.inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    beforeEach(() => {
        element = $compile('<sample>')($rootScope);
        $rootScope.$digest();
    });

    it('should say hello to the world', ()=> {
        expect(element.text().trim()).toEqual('samples');
    });
});
