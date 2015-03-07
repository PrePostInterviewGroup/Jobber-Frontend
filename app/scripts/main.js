

// var createUserURL = 'https://pre-post-interview.herokuapp.com/users',
//     user = {
//       email: 'h@h.com',
//       password: 'password'
//     };

// $.post(createUserURL, {user: user}, function (data) {
//   console.log(data);
// });


// var linkedInURL = 'https://api.linkedin.com/v1/people';

// $.getJSON(linkedInURL, function (res) {
//   console.log(res);
// });


;(function () {
  'use strict';

  angular.module('app', [
    'ngRoute',
    'users'
  ])

  .constant('HEROKU', {
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
        // controller: 'Users'
      })
      .when('/companies', {
        templateUrl: 'scripts/companies/companies.html',
        // controller: 'Companies'
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
  });

}());

