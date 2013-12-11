'use strict';

angular.module('assignmentApp').controller('chatCtrl',function($scope,$http, socket){
	socket.forward('joined', $scope);
	$scope.$on('socket:joined', function(ev, data){
		$scope.users = data;
		console.log('triggered');
	});

	$http.get('/users').success(function(data, status, headers, config){
		$scope.users = data;
	});

	$scope.message = function(){
		socket.emit('message', $scope.)
	};
});