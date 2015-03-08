
;(function () {
  'use strict';

  angular.module('jobber')

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
      .otherwise('/settings');
  });

}());

