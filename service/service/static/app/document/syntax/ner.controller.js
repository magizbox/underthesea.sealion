/**
 * Created by crawler on 07/12/2017.
 */
app.controller("NerController", function ($scope, $state, $stateParams, Document,DialogueDocument) {
  $scope.update = function (listAnnotation) {
    $scope.document.ner = JSON.stringify(listAnnotation);
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
      $scope.ner = {
        "config": NERTagBratConfig,
        "doc": {
          "text": $scope.document.text,
          "entities": $scope.document.ner
        }
      };
    });
  };

  $scope.getInfoDialogueCorpus = function () {
    DialogueDocument.get({id: $stateParams.documentId}).then(function (dialogue) {
      $scope.document = angular.copy(dialogue);
      $scope.ner = {
        "config": NERTagBratConfig,
        "doc": {
          "text": $scope.document.text,
          "entities": $scope.document.ner
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