
;(function () {
  'use strict';

  angular.module('companies')

    .factory('CompaniesFactory', function ($http, $rootScope, $location, JOBBER, PATHS, UsersFactory) {

      var config = function () {
        var token = UsersFactory.getCookie().user.authentication_token;
        // return {headers: {authentication_token: token}};
        // return {headers: {authentication_token: 'abcdefghijklmnopqrst'}};
        return {headers: {authentication_token: 'sZHgJcxsM7Hp9Rx9KU33'}};
      };

      var broadcast = function(action, obj) {
        $rootScope.$broadcast('companies:' + action, obj);
      };

      return {

        create: function (obj) {
          console.log('obj: ', obj);
          console.log('config(): ', config());
          $http.post(JOBBER.URL + 'company', obj, config())
            .success(function (res) {

              console.log('res: ', res);

              obj.id = res.id;

              console.log('obj: ', obj);

              broadcast('created', obj);
            });
        },

        retrieveAll: function () {
          return $http.get(JOBBER.URL + 'company', config());
        },

        update: function(obj) {
          $http.put(JOBBER.URL, obj, config())
            .success(function () { broadcast('updated'); });
        },

        delete: function(obj) {
          $http.delete(JOBBER.URL, config())
            .success(function () { broadcast('deleted', obj); });
        }

      };

    });

}());

