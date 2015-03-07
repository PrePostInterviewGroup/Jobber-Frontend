
;(function () {
  'use strict';

  angular.module('companies', [])

    .controller('Companies', function ($scope) {

      $scope.openCompanyModal = function (company) {
        $('#addCompany').openModal();
      };

      $scope.submitCompany = function (company) {
        console.log(company);
      };

      $scope.openJobModal = function (job) {
        $('#addJob').openModal();
      };

      $scope.submitJob = function (job) {
        console.log(job);
      };

    });

}());

