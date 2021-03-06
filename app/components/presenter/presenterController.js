app.controller('PresenterCtrl', function($scope, $firebaseObject, $firebaseArray) {

  // On load
  var refArray = new Firebase("https://getbubble.firebaseio.com/attendees");
  $scope.attendees = $firebaseArray(refArray);

  var refArray = new Firebase("https://getbubble.firebaseio.com/quizzes");
  $scope.quizQuestions = $firebaseArray(refArray);

  $scope.$watch('attendees', function(newVal, oldVal) {
    var numAttendees = $scope.attendees.length

    var lostAttendees = _.filter($scope.attendees, function(attendee) {
      return attendee.overall == 'lost';
    })
    $scope.lostPercent = Math.round(lostAttendees.length * 100 / numAttendees);

    var speedValue = _.reduce($scope.attendees, function(memo, attendee) {
      return memo + attendee.speed;
    }, 0);
    $scope.speedStatus = speedStatus(Math.round(speedValue * 100 / numAttendees));

    var volumeValue = _.reduce($scope.attendees, function(memo, attendee) {
      return memo + attendee.volume;
    }, 0);
    $scope.volumeStatus = volumeStatus(Math.round(volumeValue * 100 / numAttendees));

    $scope.questions = [];
    _.each($scope.attendees, function(attendee) {
      _.each(attendee.questions, function(question) {
        $scope.questions.push({ name: attendee.name, content: question.content, answered: question.answered })
      });
    });
  }, true);


  $scope.pushQuestion = function() {
    var randomKey = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
    var questionData = { content: $scope.questionContent, key: randomKey };
    var refObject = new Firebase("https://getbubble.firebaseio.com/quizzes/" + questionData.key);
    var syncObject = $firebaseObject(refObject);
    refObject.set(questionData);

    var refArray = new Firebase("https://getbubble.firebaseio.com/quizzes");
    $scope.quizQuestions = $firebaseArray(refArray);
  };

  $scope.resetStats = function() {
    _.each($scope.attendees, function(attendee) {
      attendee.overall = 'good';
      attendee.speed = 0;
      $scope.attendees.$save(attendee);
    });
  };


  /***** UTILITY FUNCTIONS *****/
  function speedStatus(percent) {
    if (percent > 20) {
      return { content: 'TOO FAST!', class: 'text-danger' };
    } else if (percent > 10) {
      return { content: 'Little fast', class: 'text-warning' };
    } else if (percent < -20) {
      return { content: 'TOO SLOW!', class: 'text-danger' };
    } else if (percent < -10) {
      return { content: 'Little slow', class: 'text-warning' };
    } else {
      return { content: 'Good', class: 'text-success' };
    }
  }

  function volumeStatus(percent) {
    if (percent > 10) {
      return { content: 'SPEAK UP!', class: 'text-danger' };
    } else if (percent > 5) {
      return { content: 'Little louder', class: 'text-warning' };
    } else if (percent < -10) {
      return { content: 'SHH!!', class: 'text-danger' };
    } else if (percent < -5) {
      return { content: 'Little quieter', class: 'text-warning' };
    } else {
      return { content: 'Good', class: 'text-success' };
    }
  }

});