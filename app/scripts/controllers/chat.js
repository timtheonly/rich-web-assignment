'use strict';

angular.module('assignmentApp').controller('chatCtrl',function($scope,$http, socket){
	
	//forward socket events to angular
	socket.forward('joined', $scope);
	socket.forward('message',$scope);
	var room;
	$scope.messages = [];

	//when a message is received add it to the array
	$scope.$on('socket:message',function(ev,data){
		console.log('message');
		var msg = 'blah said: ' + data;
		$scope.messages.push(msg);
	});

	//when someone else logs in update users array
	$scope.$on('socket:joined', function(ev, data){
		$scope.users = data;
		console.log($scope.users);
	});

	//on initial load get all loged in users
	$http.get('/users').success(function(data){
		$scope.users = data;
	});

	//on initial load get the user's id and set up their room
	// after load their initial room is their own
	$http.get('/user').success(function(data){
		socket.emit('room', data.id);
		room = data.id;
		console.log('id: ' + room);
	});
	
	//select a different room
	$scope.chatWith = function(id){
		socket.emit('room', id);
		room = id;
		console.log('id: ' + room);
	};

	//send message to the sever
	$scope.message = function(){
		var msg = 'I said: ' + $scope.text;
		$scope.messages.push(msg);
		socket.emit('send', {room:room,message:$scope.text});
		$scope.text ='';
	};
});