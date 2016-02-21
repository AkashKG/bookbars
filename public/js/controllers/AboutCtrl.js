angular.module('AboutCtrl', []).controller('AboutController', function($scope) {

	$scope.tagline = 'Nothing beats a pocket protector!';
	$scope.members = [ {
		name : 'Akash Kumar Gupta',
		social : {
			fbLink : '',
			gPlusLink : '',
		},
		works:['NodeJS, ExpressJS', 'AngularJS', 'MongoDB'],
		source : './images/akash.jpg'
	}, {
		name : 'Tushar Sinha',
		social : {
			fbLink : '',
			gPlusLink : '',
		
		},
		works:['AngularJS', 'MongoDB'],
		source :'./images/tushar.jpg'
	}, {
		name : 'Atul Gupta',
		social : {
			fbLink : '',
			gPlusLink : '',
		
		},
		works:['NodeJS', 'AngularJS'],
		source : './images/atul.jpg'
	}, {
		name : 'Souryadeep Mukherjee',
		social : {
			fbLink : '',
			gPlusLink : '',
		
		},
		works:['AngularJS']	,
		source : './images/sourya.jpg'
	}, {
		name : 'Shubham Singh',
		social : {
			fbLink : '',
			gPlusLink : '',
		
		},
		works:['AngularJS'],
		source : './images/shubham.jpg'
	}, {
		name : 'Tathagatha Banerjee',
		social : {
			fbLink : '',
			gPlusLink : '',		
		},

		works:['SRS', 'UML Diagrams'],
		source : './images/tatta.jpg'
	}
	];
	

});