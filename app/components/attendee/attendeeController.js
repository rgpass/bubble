app.controller('AttendeeCtrl', function($scope, $firebaseObject, $firebaseArray) {
  // var refObject = new Firebase("https://getbubble.firebaseio.com/");

  // var syncObject = $firebaseObject(refObject);

  // syncObject.$bindTo($scope, "attendee");

  $scope.printStuff = function() {
    console.log($scope.attendee);
  }

  // var refArray = new Firebase("https://getbubble.firebaseio.com/attendees");
  // $scope.attendees = $firebaseArray(refArray);

  // $scope.addAttendee = function() {
  //   $scope.attendees.$add($scope.attendee);
  // }

  // $scope.saveAttendee = function(attendee) {
  //   var attendee = attendee || $scope.attendee;
  //   $scope.attendees.$save(attendee);
  // }

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


  // var refArray = new Firebase("https://getbubble.firebaseio.com/attendees");
  // $scope.attendees = $firebaseArray(refArray);

  // $scope.attendees.$add($scope.attendee);



  // $scope.$watch('attendee', function(newValue, oldValue) {
  //   var attendee = _.find($scope.attendees, function(attendee) {
  //     return attendee.key == randomKey;
  //   });
  //   $scope.attendees.$save(attendee);
  // })

  // On load
    // Create attendee object with defaults
      // Sidebar: disable buttons that are already clicked
    // Save to firebase

  // On click for speed
    // Set speed to the value
      // 1 for too fast
      // 0 for good
      // -1 for too slow

  // On click for volume
    // Set volume to the value
      // 1 for too quiet
      // 0 for good
      // -1 for too loud

  // On question submit
    // Add to questions array
      // content:string(don't push if blank), approved:boolean(false), answered:boolean(false)
        // TODO: Moderator functionality?

  // On question remove
    // Remove from questions array

  // On question answered
    // Set question's answered attribute to true
});