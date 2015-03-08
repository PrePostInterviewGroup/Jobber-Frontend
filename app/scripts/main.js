
;(function () {
  'use strict';

  angular.module('app', [
    'ngRoute',
    'users',
    'events',
    'jobs'
  ])

  .constant('JOBBER', {
    // URL: 'http://brian.t.proxylocal.com/'
    URL: 'https://pre-post-interview.herokuapp.com/'
  })

  .constant('LINKEDIN', {
    URL: 'https://api.linkedin.com/v1/',
    headers: {
      'Content-Type': 'application/json',
      'x-li-format': 'json'
    }
  })

  .constant('PATHS', {
    HOME: '/'
  })

  .config(function ($routeProvider) {
    $routeProvider
      .when('/signup', {
        templateUrl: 'scripts/users/user.signup.html',
        controller: 'Users'
      })
      .when('/signin', {
        templateUrl: 'scripts/users/user.signin.html',
        controller: 'Users'
      })
      .when('/settings', {
        templateUrl: 'scripts/users/user.settings.html',
        controller: 'UserProfile'
      })
      .when('/events', {
        templateUrl: 'scripts/events/events.html',
        controller: 'Events'
      })
      .when('/jobs', {
        templateUrl: 'scripts/jobs/jobs.html',
        controller: 'Jobs'
      })
      .otherwise('/events');
  })

  .run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeStart', function () {

      console.log('Route request: ', $location.path());

    });
  });


}());

