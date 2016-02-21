angular.module('ContactCtrl', []).controller('ContactController', function($scope) {

	$scope.contact =[{
		icon : 'phone',
		type : 'Phone',
		detail : '+91XXXXXXXXXX'
		}, {
		icon : 'home',
		type : 'Address',
		detail : 'KIIT University,Patia,Bhubanesheawar,India.'	
		}, {
		icon : 'email',
		type : 'Email',
		detail : 'bookbaterindia@gmail.com'				
	}
	];

});