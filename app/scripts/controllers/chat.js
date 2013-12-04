'use strict';

angular.module('assignmentApp').controller('chatCtrl',function($scope){
	$scope.$on('socket:joined', function(ev, data){
		$scope.users = data;
		console.log('triggered');
	});

});