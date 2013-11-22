'use strict';

angular.module('assignmentApp')
  .controller('loginCtrl', function ($scope) {
	$scope.login = function(){
		console.log('U: ' +$scope.username+' P: '+$scope.password);
	};
});
