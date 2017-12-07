/**
 * Created by crawler on 07/12/2017.
 */
app.controller("PosTagController", function ($scope, $state, $stateParams, Document) {

  $scope.updateDocument = function () {
    Document.update({id: $scope.document.id}, $scope.document);
  };

  $scope.getInfoDocument = function () {
    Document.query({id: $stateParams.id}).then(function (doc) {
      $scope.document = doc;
      $scope.pos_tag = {
        "config": POSTagBratConfig,
        "doc": {
          "text": doc.text,
          "entities": doc.pos_tag
        }
      };
    });
  };

  $scope.getInfoDocument();

});