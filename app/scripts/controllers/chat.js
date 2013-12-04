'use strict';

angular.module('assignmentApp').controller('chatCtrl',function($scope, socket){
	socket.forward('joined', $scope);
	$scope.$on('socket:joined', function(ev, data){
		$scope.users = data;
		console.log('triggered');
	});
});