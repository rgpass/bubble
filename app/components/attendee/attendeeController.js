app.controller('AttendeeCtrl', function($scope, $firebaseObject, $firebaseArray) {

  // CREATE USER ON LOAD
  var randomKey = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
  var defaultAttendee = { name: '', overall: 'good', speed: 0, volume: 0, key: randomKey };
  var refObject = new Firebase("https://getbubble.firebaseio.com/attendees/" + defaultAttendee.key);
  var syncObject = $firebaseObject(refObject);
  refObject.set(defaultAttendee);
  syncObject.$bindTo($scope, "attendee");


  // LOAD IN USER'S QUESTIONS
  var refArray = new Firebase("https://getbubble.firebaseio.com/attendees/" + defaultAttendee.key + '/questions');
  $scope.questions = $firebaseArray(refArray);

  $scope.addQuestion = function() {
    $scope.questions.$add({
      content: $scope.questionContent
    });
  };

  $scope.setToAnswered = function(question) {
    question.answered = true;
    $scope.questions.$save(question);
  };


  // LOAD IN QUIZ QUESTIONS
  var refArray = new Firebase("https://getbubble.firebaseio.com/quizzes");
  $scope.quizQuestions = $firebaseArray(refArray);

  $scope.submitAnswer = function(question) {
    var answer = { content: question.answer, name: $scope.attendee.name };
    var refObject = new Firebase("https://getbubble.firebaseio.com/quizzes/" + question.key + "/answers/" + defaultAttendee.key);
    refObject.set(answer);
  }

  $scope.answeredQuestion = function(question) {
    if (question.answers) {    
      if (question.answers[defaultAttendee.key]) {
        question.answer = question.answers[defaultAttendee.key].content;
        return true;
      } else {
        return question.answers[defaultAttendee.key];
      }
    }
  }
});