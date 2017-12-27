/**
 * Created by crawler on 07/12/2017.
 */
app.controller("ChunkingController", function ($scope, $state, $stateParams, Document, DialogueDocument) {

  $scope.update = function (listAnnotation) {
    $scope.document.chunking = JSON.stringify(listAnnotation);
    if ($stateParams.id) {
      Document.update({id: $scope.document.id}, $scope.document);
    }
    else if ($stateParams.dialogueId) {
      DialogueDocument.update({id: $scope.document.id}, $scope.document);
    }
  };

  $scope.getInfoDocument = function () {
    Document.query({id: $stateParams.id}).then(function (doc) {
      $scope.document = angular.copy(doc);
      $scope.chunking = {
        "config": ChunkingBratConfig,
        "doc": {
          "text": $scope.document.text,
          "entities": $scope.document.chunking
        }
      };
    });
  };

  $scope.getInfoDialogueCorpus = function () {
    DialogueDocument.get({id: $stateParams.documentId}).then(function (dialogue) {
      $scope.document = angular.copy(dialogue);
      $scope.chunking = {
        "config": ChunkingBratConfig,
        "doc": {
          "text": $scope.document.text,
          "entities": $scope.document.chunking
        }
      };
    });
  };

  if($stateParams.id){
     $scope.getInfoDocument();
  }
  else if($stateParams.dialogueId){
    $scope.getInfoDialogueCorpus();
  }


});