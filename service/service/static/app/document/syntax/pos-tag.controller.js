/**
 * Created by crawler on 07/12/2017.
 */
app.controller("PosTagController", function ($scope, $state, $stateParams, Document, DialogueDocument) {

  $scope.update = function (listAnnotation) {
    $scope.document.pos_tag = JSON.stringify(listAnnotation);
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
      $scope.pos_tag = {
        "config": POSTagBratConfig,
        "doc": {
          "text": $scope.document.text,
          "entities": $scope.document.pos_tag
        }
      };
    });
  };

  $scope.getInfoDialogueCorpus = function () {
    DialogueDocument.get({id: $stateParams.dialogueId}).then(function (dialogue) {
      $scope.document = angular.copy(dialogue);
      $scope.pos_tag = {
        "config": POSTagBratConfig,
        "doc": {
          "text": $scope.document.text,
          "entities": $scope.document.pos_tag
        }
      };
    });
  };

  if ($stateParams.id) {
    $scope.getInfoDocument();
  }
  else if ($stateParams.dialogueId) {
    $scope.getInfoDialogueCorpus();
  }

});