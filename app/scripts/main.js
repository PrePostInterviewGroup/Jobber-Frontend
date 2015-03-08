
;(function () {
  'use strict';

  angular.module('jobber', [
    'ngRoute',
    'jobber.users',
    'jobber.events',
    'jobber.jobs'
  ])

  .constant('JOBBER', {
    // URL: 'http://brian.t.proxylocal.com/'
    URL: 'https://pre-post-interview.herokuapp.com/'
  })

  .constant('AWS', {
    URL: '',
    headers: {
      '': ''
    }
  })

  .constant('LINKEDIN', {
    URL: 'https://api.linkedin.com/v1/',
    headers: {
      'Content-Type': 'application/json',
      'x-li-format': 'json'
    }
  })

  .constant('PATHS', {
    HOME: '/events'
  });

  // .run(function ($rootScope, $location) {
  //   $rootScope.$on('$routeChangeStart', function () {

  //     console.log('Route request: ', $location.path());

  //   });
  // });


}());

