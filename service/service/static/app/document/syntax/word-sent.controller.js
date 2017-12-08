/**
 * Created by crawler on 06/12/2017.
 */
app.controller("WordSentController", function ($scope, $state, $stateParams, Document) {

  $scope.updateDocument = function (listAnnotation) {
    $scope.document.word_sent = JSON.stringify(listAnnotation);
    Document.update({id: $scope.document.id}, $scope.document);
  };

  $scope.getInfoDocument = function () {
    Document.query({id: $stateParams.id}).then(function (doc) {
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

  $scope.getInfoDocument();

});