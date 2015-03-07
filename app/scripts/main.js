
;(function () {
  'use strict';

  angular.module('app', [
    'ngRoute',
    'nav',
    'users',
    'companies'
  ])

  .constant('JOBBER', {
    URL: 'http://brian.t.proxylocal.com/'
    // URL: 'https://pre-post-interview.herokuapp.com/'
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
      .when('/', {
        templateUrl: 'scripts/dashboard/dashboard.html',
      //   controller: 'Dashboard'
      })
      .when('/signup', {
        templateUrl: 'scripts/users/user.signup.html',
        controller: 'Users'
      })
      .when('/signin', {
        templateUrl: 'scripts/users/user.signin.html',
        controller: 'Users'
      })
      .when('/profile', {
        templateUrl: 'scripts/users/user.profile.html',
        controller: 'UserProfile'
      })
      .when('/companies', {
        templateUrl: 'scripts/companies/companies.html',
        controller: 'Companies'
      })
      .when('/jobs', {
        templateUrl: 'scripts/jobs/jobs.html',
        // controller: 'Jobs'
      })
      .when('/upcoming', {
        templateUrl: 'scripts/schedule/schedule.html',
      //   controller: 'Schedule'
      })
      .otherwise('/');
  })

  .run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeStart', function () {

      console.log('Route request: ', $location.path());

    });
  });


}());

