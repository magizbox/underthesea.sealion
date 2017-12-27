/**
 * Created by crawler on 07/12/2017.
 */
app.controller("ClassificationController", function ($scope, $state, $stateParams, Document, DialogueDocument) {

  $scope.updateDocument = function (listAnnotation) {
    Document.update({id: $scope.document.id}, angular.copy($scope.document));
  };

  $scope.getInfoDocument = function () {
    Document.query({id: $stateParams.id}).then(function (doc) {
      $scope.document = angular.copy(doc);
    });
  };

 $scope.getInfoDialogueCorpus = function () {
    DialogueDocument.get({id: $stateParams.dialogueId}).then(function (dialogue) {
      $scope.document = angular.copy(dialogue);
    });
  };

  if($stateParams.id){
     $scope.getInfoDocument();
  }
  else if($stateParams.dialogueId){
    $scope.getInfoDialogueCorpus();
  }
});

