'use strict';

angular.module('assignmentApp').controller('chatCtrl',function($scope,$http, socket){
	
	//forward socket events to angular
	socket.forward('joined', $scope);
	socket.forward('message',$scope);

	$scope.messages = [];

	$scope.$on('socket:message',function(ev,data){
		$scope.messages.push(data);
	});
	$scope.$on('socket:joined', function(ev, data){
		$scope.users = data;
	});

	$http.get('/users').success(function(data, status, headers, config){
		$scope.users = data;
	});
	
	$scope.chat_with = function(id){
		console.log(id);
	};

	$scope.message = function(){
		socket.emit('send', $scope.text);
		$scope.text ='';
	};
});