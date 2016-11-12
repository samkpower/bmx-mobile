angular.module('bice.controllers', ['ngResource'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('UserController', function($scope, $state, $interpolate, $resource, lodash) {
  $scope.createUser = function(user) {

    let User = $resource('http://localhost:3000/api/v1/users');

    // TODO: User Adapter
    var newUser = new User({
      user: {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: user.password,
        password_confirmation: user.passwordConfirmation,
        phone: user.phoneNumber
      }
    });

    newUser.$save().then(() => {
      alert('User successfully created!');
      $state.go('app.myBikes');
    },
    (errorResponse) => {
      alert('There was an error processing your request.');
    });
  };
})

.controller('NewBikeController', function($scope, $state, $resource) {
  $scope.registerBike = function(bike) {

    let Bike = $resource('http://localhost:3000/api/v1/bikes');

    // TODO: Bike Adapter
    var newBike = new Bike({
      bike: {
        name: bike.name,
        model: bike.model,
        brand: bike.brand,
        serial_number: bike.serialNumber,
        place_of_purchase: bike.placeOfPurchase
      }
    });

    newBike.$save().then(() => {
      alert('Bike successfully registered!');
      $state.go('app.myBikes');
    },
    (errorResponse) => {
      alert('There was an error processing your request.');
    });
  };
})

.controller('MyBikesController', function($scope, $resource) {
  $scope.bikes = [];
  let Bike = $resource('http://localhost:3000/api/v1/bikes.json');
  Bike.query((bikes) => { $scope.bikes = bikes; });
})

.controller('MyBikeController', function($scope, $resource) {
  $scope.bike = [];
  let Bike = $resource('http://localhost:3000/api/v1/bikes/1.json');
  Bike.get((bike) => { $scope.bike = bike; });
});
