/**
 * Created by crawler on 07/12/2017.
 */
app.controller("ChunkingController", function ($scope, $state, $stateParams, Document) {

  $scope.updateDocument = function (listAnnotation) {
    $scope.document.chunking = JSON.stringify(listAnnotation);
    Document.update({id: $scope.document.id}, $scope.document);
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

  $scope.getInfoDocument();


});