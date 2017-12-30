app.controller("DetailDocumentCtrl", function ($scope, $stateParams, Corpus, Document, $state, STATUSES, QUALITIES, $filter, $http, $window, Notification, DialogueCorpus) {
  $scope.id = $stateParams.idDocument;
  $scope.dialogueId = $stateParams.dialogueId;
  $scope.documentId = $stateParams.documentId;
  if ($scope.id) {
    Document.query({id: $scope.id}, {}).then(function (doc) {
      $scope.doc = doc;
      $scope.sentiments = doc.sentiment;
      $scope.categories = doc.category;
      $scope.acts = doc.act;

      $scope.auto_acts = [{
        "name": "INFORMATION"
      }];
      $scope.corpusId = doc.corpus;
      Corpus.get({id: doc.corpus}, function (corpus) {
        $scope.corpus = corpus;
        $scope.tasks = corpus.tasks;
      })
    });
  }
  else if ($scope.dialogueId) {
    DialogueCorpus.get({id: $scope.dialogueId}, function (dialogue) {
      $scope.dialogue = dialogue;
      $scope.corpus = dialogue.corpus;
      Corpus.get({id: dialogue.corpus}, function (corpus) {
        $scope.corpus = corpus;
        $scope.tasks = corpus.tasks;
      })
    });
  }

  $scope.STATUSES = STATUSES;
  $scope.QUALITIES = QUALITIES;

  $scope.save = function () {
    try {
      $scope.LOADING = true;

      if ($scope.id) { // document cua corpus
        $scope.doc.sentiment = angular.toJson($scope.sentiments);
        $scope.doc.category = angular.toJson($scope.categories);
        Document.update({id: $scope.id}, $scope.doc,
          function (data) {
            $scope.LOADING = false;

            Notification.success({
              message: 'Document is saved successfully.',
              delay: 1000,
              positionX: 'right',
              positionY: 'bottom'
            });
          }, function (err) {
            Notification.error({
              message: 'AMR Syntax Error',
              delay: 1000,
              positionX: 'right',
              positionY: 'bottom'
            });
            $scope.LOADING = false;
          });
      }
      else if ($stateParams.dialogueId) { // truong hop la document cua dialogue
        var action = Dialogue.update({id: $stateParams.dialogueId}, $scope.dialogue);
        action.$promise.then(function () {
          Notification.success({
            message: 'Dialogue is updated successfully.',
            delay: 1000,
            positionX: 'right',
            positionY: 'bottom'
          });
        })
          .catch(function (err) {
            Notification.error({
              message: 'AMR Syntax Error',
              delay: 1000,
              positionX: 'right',
              positionY: 'bottom'
            });
          });
      }


    } catch (e) {
      Notification.error({
        message: 'AMR Syntax Error',
        delay: 1000,
        positionX: 'right',
        positionY: 'bottom'
      });
      $scope.LOADING = false;
    }
  };

  $scope.delete = function () {
    Document.delete({id: $scope.id}).$promise.then(function () {
      $state.go('detailCorpus', {"id": $scope.corpusId});
    })
  }
});
