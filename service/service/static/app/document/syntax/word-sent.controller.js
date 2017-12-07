/**
 * Created by crawler on 06/12/2017.
 */
app.controller("WordSentController", function ($scope, $state, $stateParams, Document) {

  $scope.updateDocument = function () {
    Document.update({id: $scope.document.id}, $scope.document);
  };

  $scope.getInfoDocument = function () {
    Document.query({id: $stateParams.id}).then(function (doc) {
      $scope.document = doc;
      $scope.wordSent = {
        "config": WordSentBratConfig,
        "doc": {
          "text": doc.text,
          "entities": doc.word_sent
        }
      };
    });
  };

  $scope.getInfoDocument();

});