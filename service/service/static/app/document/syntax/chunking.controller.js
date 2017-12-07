/**
 * Created by crawler on 07/12/2017.
 */
app.controller("ChunkingController", function ($scope, $state, $stateParams, Document) {

  $scope.updateDocument = function (newAnnotation) {
    Document.update({id: $scope.document.id}, $scope.document);
  };

  $scope.getInfoDocument = function () {
    Document.query({id: $stateParams.id}).then(function (doc) {
      $scope.document = doc;
      $scope.chunking = {
        "config": ChunkingBratConfig,
        "doc": {
          "text": doc.text,
          "entities": doc.chunking
        }
      };
    });
  };

  $scope.getInfoDocument();


});