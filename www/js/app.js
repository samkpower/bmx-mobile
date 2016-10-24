// Ionic bice App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'bice' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'bice.controllers' is found in controllers.js
angular.module('bice', ['ionic', 'bice.controllers', 'ngResource', 'ngLodash'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.signup', {
    url: '/signup',
    views: {
      'menuContent': {
        templateUrl: 'templates/signup.html'
      }
    }
  })

  .state('app.myBikes', {
    url: '/myBikes',
    views: {
      'menuContent': {
        templateUrl: 'templates/myBikes.html',
        controller: 'BikesController'
      }
    }
  })

  .state('app.myBike', {
    url: '/myBike/:bikeId',
    views: {
      'menuContent': {
        templateUrl: 'templates/myBike.html',
        controller: 'BikesController'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('app/signup');
});
