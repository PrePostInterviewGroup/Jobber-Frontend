

// var createUserURL = 'https://pre-post-interview.herokuapp.com/users',
//     user = {
//       email: 'e@e.com',
//       password: 'password'
//     };

// $.post(createUserURL, {user: user}, function (data) {
//   console.log(data);
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
      // .when('/profile', {
      //   templateUrl: 'scripts/users/profile.html',
      //   controller: 'Users'
      // });
      // .when('/companies', {
      //   templateUrl: 'scripts/companies/companies.html',
      //   controller: 'Companies'
      // })
      // .when('/upcoming', {
      //   templateUrl: 'scripts/schedule/schedule.html',
      //   controller: 'Schedule'
      // })
      .otherwise('/');
  });

}());

