export default function routeConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: '/',
      template: '<home></home>'
    })
    .state('home.takeoff', {
      url: 'takeoff/:id/:step',
      template: '<generic-step>'
    });
}
