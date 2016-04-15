export default function routeConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: '/',
      template: '<home></home>'
    })
    .state('home.sample', {
      url: 'sample',
      template: '<sample></sample>'
    });
}
