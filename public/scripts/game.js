
angular.module('Game', [])

.controller('gameController', ['$scope', '$http', function ($scope, $http) {
  $scope.showGame = true;
  $scope.computerScore = 0;
  $scope.humanScore = 0;
  $scope.ties = 0;

  $scope.setChoice = function(choice) {
    $scope.choice = choice;
  }

  $scope.play = function(choice) {
    playGame(choice)
  }

  $scope.playAgain = function(){
    $scope.showResults = false;
    $scope.showGame = true;
    $scope.choice = false;
  }

  function playGame(choice) {
    $scope.showGame = false;
    $http({
      method: 'POST',
      url: '/match',
      data: { 'choice' : choice }
    }).then( successCallback, errorCallback )
  }

  function successCallback(response) {
    var data = response['data'];
    var result = data['result'];
    adjustScore(result)
    $scope.result = result;
    $scope.computerChoice =  data['computerChoice'];
    $scope.playerChoice =  data['playerChoice'];
    $scope.showResults = true;
  }

  function adjustScore(result){
    if (result === "win") {
      $scope.humanScore += 1;
    } else if (result === "lose") {
      $scope.computerScore += 1;
    } else {
      $scope.ties += 1;
    }
  }

  function errorCallback(response) {
    playGame($scope.choice);
  }

}])
