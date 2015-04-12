app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/components/attendee/attendeeView.html',
        controller: 'AttendeeCtrl'
      })
      .state('presenter', {
        url: '/presenter',
        templateUrl: 'app/components/presenter/presenterView.html',
        controller: 'PresenterCtrl'
      })
      .state('attendee', {
        url: '/attendee',
        templateUrl: 'app/components/attendee/attendeeView.html',
        controller: 'AttendeeCtrl'
      })

    // default fall back route
    $urlRouterProvider.otherwise('/');
}]);