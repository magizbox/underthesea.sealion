/**
 * Created by crawler on 06/12/2017.
 */
app.controller("WordSentController", function ($scope, $state, $stateParams, Document, DialogueDocument) {

  $scope.update = function (listAnnotation) {
    $scope.document.word_sent = JSON.stringify(listAnnotation);
    if ($stateParams.id) {
      Document.update({id: $scope.document.id}, $scope.document);
    }
    else if ($stateParams.dialogueId) {
      DialogueDocument.update({id: $scope.document.id}, $scope.document);
    }
  };

  $scope.getInfoDocument = function () {
    Document.query({id: $stateParams.idDocument}).then(function (doc) {
      $scope.document = angular.copy(doc);
      $scope.wordSent = {
        "config": WordSentBratConfig,
        "doc": {
          "text": $scope.document.text,
          "entities": $scope.document.word_sent
        }
      };
    });
  };

  $scope.getInfoDialogueCorpus = function () {
    DialogueDocument.get({id: $stateParams.documentId}).then(function (dialogue) {
      $scope.document = angular.copy(dialogue);
      $scope.wordSent = {
        "config": WordSentBratConfig,
        "doc": {
          "text": $scope.document.text,
          "entities": $scope.document.word_sent
        }
      };
    });
  };

  if ($stateParams.idDocument) {
    $scope.getInfoDocument();
  }
  else if ($stateParams.dialogueId) {
    $scope.getInfoDialogueCorpus();
  }


});