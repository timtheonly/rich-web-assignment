'use strict';

angular.module('assignmentApp')
	.controller('loginCtrl', function ($scope, $http, $modal, $window) {
	$scope.hasMessage = false;

	//send off the users information for validation
	$scope.login = function(){
		$http.post('/users/login', {username: $scope.username, password: $scope.password})
		.success(function(data){
			if(data !== 'ok')//something wrong was provided
			{
				$scope.message = data;
				$scope.hasMessage = true;
				$scope.password ='';
			}else{//if all is successfull redirect the user
				$window.location.href = '/chat';
			}
		});
	};

	//load a modal when the user clicks signup
	$scope.open = function () {
	    var modalInstance = $modal.open({
	      templateUrl: 'partials/signUpModal.html',
	      controller: 'ModalCtrl',
	      keyboard: false,// ESC wont close the modal
	      resolve: {
	        items: function () {
	          return $scope.items;
	        }
	      }
	    });
	};
	
}).controller('ModalCtrl', function($scope, $http, $modalInstance){//seperate controller for the modal
	$scope.input ={};
	$scope.ok = function(){
		$http.post('/users',$scope.input)
			.success(function(data){
				if(data === 'ok'){//user was created 
					$scope.createdAccount = true;
					setTimeout(function(){
						$modalInstance.close();//close the modal after a 3 second timeout
					}, 3000);

				}else if(data ==='user exsits'){
					$scope.usernameExists = true;
				}else{
					$scope.errorHappened = true;
				}
			})
			.error(function(){
				$scope.errorHappened = true;
			});
	};

	$scope.cancel = function(){//give the option to cancel the signup
		$modalInstance.close('canceled');
	};
});
