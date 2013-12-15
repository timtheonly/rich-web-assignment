'use strict';

angular.module('assignmentApp').controller('chatCtrl',function($scope,$http, socket, $modal, $timeout){
	
	//forward socket events to angular
	socket.forward('joined', $scope);
	socket.forward('message',$scope);
	var room;

	//who am I
	var myName ='';

	//who are we talking to
	$scope.talkingto ='';

	//show extras when chatting
	$scope.chatting =false;

	//hold messages that are sent/received
	$scope.messages = [];

	//time limit
	$scope.time = 30;

	//when a message is received add it to the array
	$scope.$on('socket:message',function(ev,data){
		var msg = data.from +' said: ' + data.message;
		$scope.chatting =true;
		$scope.talkingto = data.from;
		$scope.messages.push(msg);
	});

	//when someone else logs in update users array
	$scope.$on('socket:joined', function(ev, data){
		$scope.users = data;
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
		myName = data.username;
	});
	
	//select a different room
	$scope.chatWith = function(id, username){
		socket.emit('room', id);
		room = id;
		$scope.chatting =true;
		$scope.talkingto = username;
		console.log('joined room: '+ id + ' with: ' + username);
	};

	//send message to the sever
	$scope.message = function(){
		var msg = 'I said: ' + $scope.text;
		$scope.messages.push(msg);
		socket.emit('send', {room:room,message:$scope.text, from:myName});//send a message and dont forget to say who its from
		$scope.text ='';
	};

	$scope.checkSubmit = function($event){
		if($event.which === 13)
		{
			$scope.message();
		}
	};

	$modal.open({
    templateUrl: 'partials/welcomeModal.html',
    controller: 'welcomeModalCtrl',
    keyboard: true,// ESC will close the modal
    resolve: {
      items: function () {
				return $scope.items;
			}
		}
  	});

	$timeout(function(){
		if($scope.chatting && $scope.time > -1)
		{
			$scope.time--;
		}
	},1000);

}).controller('welcomeModalCtrl', function($scope, $modalInstance){
	$scope.ok = function(){
		$modalInstance.close();
	};
});