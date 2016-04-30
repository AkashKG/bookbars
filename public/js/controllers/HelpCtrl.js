angular.module('HelpCtrl', []).controller('HelpController', function($scope,$rootScope) {
	
	$scope.help = [ {
		head : "Registration/Login",
		data : "User can register either using sign-up option or facebook account.Similarly,login can be done by locally authenticated sign-in or facebook sign-in."

	},{
		head : "Book catalogue",
		data : "After user sign-in he/she is redirected to profile page where the book catalogue is displayed. The timeline shows the current activities, activity card shows all book transitions. All books are shown in the repository which can be further filtered into categories."

	},{
		head : "Add/Remove books",
		data : "The user can manage his repository by adding or removing books on simple button click. For adding book you have to fill out add book form."

	},{
		head : "Book Trade",
		data : "User can request books from all books section. There are several filters present book , type , category or directly searching for book name."

	},{
		head : "Search Book",
		data : "It simply filters out book according to user requirement."

	},{
		head : "Manage Account",
		data : "User can manage his account by editing user details such as name, bio, address, pincode etc. He can also deactivate his account."

	} ];

});