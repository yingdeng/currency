'use strict';
// create the module and name it scotchApp
var app = angular.module('app', ['ngRoute', 'ngResource', 'inputAmount', 'demo']);

// configure our routes
app.config(function($routeProvider, $locationProvider) {
	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'pages/exchange.html',
			controller  : 'exchController'
		})

		// route for the about page
		.when('/news', {
			templateUrl : 'pages/news.html',
			controller  : 'newsController'
		})

		// otherwise
		.otherwise({
            redirectTo: 'pages/exchange.html'
        });

});

// create the controller and inject Angular's $scope
app.controller('exchController', function($scope) {
	// create a message to display in our view
	//$scope.message = 'Everyone come and see how good I look!';
	$scope.amountNo = {number: 1000, validity: true};

	$scope.title = "exchange";
	$scope.exchangePackage = [
	    {exchType: "USD / RMB", base:1.25},
	    {exchType: "EUR / GBP", base:2.25},
	    {exchType: "USD / CAD", base:3.25},
	    {exchType: "AUD / CAD", base:4.25},
	    {exchType: "AUD / JPY", base:5.25},
	    {exchType: "GBP / RMB", base:6.25}
	/*
	    {leftCur: "USD", rightCur: "RMB", base:1.25},
	    {leftCur: "EUR", rightCur: "GBP", base:2.25},
	    {leftCur: "USD", rightCur: "CAD", base:3.25},
	    {leftCur: "AUD", rightCur: "CAD", base:4.25},
	    {leftCur: "AUD", rightCur: "JPY", base:5.25},
	    {leftCur: "GBP", rightCur: "JPY", base:6.25}
	*/
	]

});

app.controller('newsController', function($scope, Feedlist){
	$scope.message = "This is News page.";
	$scope.feeds = FeedList.get();
		$scope.$on('FeedList', function (event, data) {
			$scope.feeds = data;
		});
});
/*
app.factory('FeedLoader', function($resource){
	return $resource('http://ajax.googleapis.com/ajax/services/feed/load', {}, {
			fetch: { method: 'JSONP', params: {v: '1.0', callback: 'JSON_CALLBACK'} }
		});
});

app.services('Feedlist', function($rootScope, FeedLoader){
	this.get = function() {
			var feedSources = [
				{title: 'Slashdot', url: 'http://rss.slashdot.org/Slashdot/slashdot'},
				{title: 'Tweakers', url: 'http://feeds.feedburner.com/tweakers/mixed'},
				{title: 'Wired', url: 'http://feeds.wired.com/wired/index'},
			];
			if (feeds.length === 0) {
				for (var i=0; i<feedSources.length; i++) {
					FeedLoader.fetch({q: feedSources[i].url, num: 10}, {}, function (data) {
						var feed = data.responseData.feed;
						feeds.push(feed);
					});
				}
			}
			return feeds;
	};
});
*/
/*
app.controller('newsController', ['$scope', 'FeedService', function($scope, Feed){
	$scope.loadButonText = 'Choose News Feed';
	$scope.RSSList = [
	    {Title: "CNN", url: "http://rss.cnn.com/rss/cnn_topstories.rss"},
	    {Title: "Hacker News", url: "http://news.ycombinator.com/rss"},
	    {Title: "Mashable", url: "http://feeds2.feedburner.com/Mashable"}
	];

	// Load the News Item
	$scope.loadFeed = function (url, e) {
        $scope.url= url;
        Feed.parseFeed(url).then(function (res) {
            $scope.loadButtonText = angular.element(e.target).text();
            $scope.feeds = res.data.query.results.item;
        });
    }
}]);
*/

var inputAmount = angular.module('inputAmount', []);
inputAmount.directive('isNumber', function(){
	return {
		require: 'ngModel',
		link: function(scope){
			scope.$watch('amountNo.number', function(newValue, oldValue){
				var arr = String(newValue).split("");
				if (arr.length === 0) return;
				if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.')) return;
				if (arr.length === 2 && newValue === '-.') return; 
				if (isNaN(newValue)) {
					scope.amountNo.number = oldValue;
				}
			});
		}
	}
});

var demo = angular.module('demo', []);
demo.directive('tradeBoard', function(){
	return {
		restrict : 'E',
        replace : true,
        scope : {
        	exchange: '=exchange'
        },
        templateUrl : 'pages/template.html',
        link : function(scope, element, attrs, controller) {
        	//var updateTime = 10000;
            console.log(scope.exchange);
            console.log(scope.exchange.base);
        }
	}
}); 

