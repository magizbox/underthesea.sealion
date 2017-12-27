/**
 * Created by crawler on 07/12/2017.
 */
app.controller("ClassificationController", function ($scope, $state, $stateParams, Document, DialogueDocument, Corpus) {

  $scope.updateDocument = function (listAnnotation) {
    Document.update({id: $scope.document.id}, angular.copy($scope.document));
  };

  Corpus.get({id: $stateParams.idCorpus}, function (corpus) {
      $scope.tasks = corpus.tasks.split(",");
    });


  $scope.checkTaskDocument = function (task) {
    if($scope.tasks && $scope.tasks.length > 0){
       return _.contains($scope.tasks, task);
    }
  };


  $scope.getInfoDocument = function () {
    Document.query({id: $stateParams.idDocument}).then(function (doc) {
      $scope.document = angular.copy(doc);
    });
  };

 $scope.getInfoDialogueCorpus = function () {
    DialogueDocument.get({id: $stateParams.dialogueId}).then(function (dialogue) {
      $scope.document = angular.copy(dialogue);
    });
  };

  if($stateParams.idDocument){
     $scope.getInfoDocument();
  }
  else if($stateParams.dialogueId){
    $scope.getInfoDialogueCorpus();
  }
});

