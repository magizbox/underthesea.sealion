/**
 * Created by crawler on 07/12/2017.
 */
app.controller("NerController", function ($scope, $state, $stateParams, Document) {
  $scope.updateDocument = function (listAnnotation) {
    $scope.document.ner = JSON.stringify(listAnnotation);
    Document.update({id: $scope.document.id}, $scope.document);
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

  $scope.getInfoDocument();
});