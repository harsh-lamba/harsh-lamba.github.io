'use strict';

var volunteerApp = angular.module('volunteerApp', []);

volunteerApp.controller('indexController', function ($scope) {
    $scope.clickHere = function () {
        alert('here');
    }
});
