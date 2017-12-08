/**
 * Created by crawler on 07/12/2017.
 */
app.controller("NerController", function ($scope, $state, $stateParams, Document) {
  $scope.updateDocument = function () {
    Document.update({id: $scope.document.id}, $scope.document);
  };

  $scope.getInfoDocument = function () {
    Document.query({id: $stateParams.id}).then(function (doc) {
      $scope.document = doc;
      $scope.ner = {
        "config": NERTagBratConfig,
        "doc": {
          "text": doc.text,
          "entities": doc.ner
        }
      };
    });
  };

  $scope.getInfoDocument();
});