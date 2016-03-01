angular.module('AboutCtrl', []).controller('AboutController', function($scope) {

	
	$scope.members = [ {
		name : 'Akash Kumar Gupta',
		social : {
			fbLink : 'https://www.facebook.com/yesitsakash',
			gPlusLink : 'https://plus.google.com/+AkashGupta-Home',
		},
		works:['NodeJS, ExpressJS', 'AngularJS', 'MongoDB'],
		source : './images/akash.jpg'
	}, {
		name : 'Tushar Sinha',
		social : {
			fbLink : 'https://www.facebook.com/tushar.sinha313',
			gPlusLink : 'https://plus.google.com/106425021831414087625',
		
		},
		works:['AngularJS', 'MongoDB'],
		source :'./images/tushar.jpg'
	}, {
		name : 'Atul Gupta',
		social : {
			fbLink : 'https://www.facebook.com/atul.47u1',
			gPlusLink : 'https://plus.google.com/112850325592336796098',
		
		},
		works:['NodeJS', 'AngularJS'],
		source : './images/atul.jpg'
	}
	];
	
	
	$scope.members2 = [ {
		
		name : 'Souryadeep Mukherjee',
		social : {
			fbLink : 'https://www.facebook.com/SouryadeepM',
			gPlusLink : 'https://plus.google.com/112707188749507620839',
		
		},
		works:['AngularJS']	,
		source : './images/sourya.jpg'
	}, {
		name : 'Shubham Singh',
		social : {
			fbLink : 'https://www.facebook.com/shubhsingh01',
			gPlusLink : '',
		
		},
		works:['AngularJS'],
		source : './images/shubham.jpg'
	}, {
		name : 'Tathagatha Banerjee',
		social : {
			fbLink : 'https://www.facebook.com/tathagata.banerjee.731',
			gPlusLink : '',		
		},

		works:['SRS', 'UML Diagrams'],
		source : './images/tatta.jpg'
	}
	];
	
});