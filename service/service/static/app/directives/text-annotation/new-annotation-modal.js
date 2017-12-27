/**
 * Created by crawler on 23/11/2017.
 */
'use strict';
app.controller('NewAnnotationModalCtrl', function ($scope, $uibModalInstance, data) {
  if (data) {
    $scope.selected = {};
    if (data.textSelected) {
      $scope.selected["text"] = data.textSelected;
    }

    var startIndex = data.startIndex;
    var endIndex = data.endIndex;

    $scope.listNameExistAnnotation = _.chain(data.doc.entities)
      .filter(function (item) {
        var indexItem = item[2];
        var indexItemChild = indexItem[0];
        return indexItemChild[0] == startIndex && indexItemChild[1] == endIndex;
      })
      .map(function (item) {
        return item[1];
      }).value();

    if (data.config.entity_types.length > 1) {
      $scope.listAnnotation = _.filter(data.config.entity_types, function (entityType) {
        var index = _.indexOf($scope.listNameExistAnnotation, entityType.type);
        if (index <= -1) {
          return entityType;
        }
      });
    }
    else {
      $scope.listAnnotation = data.config.entity_types;
    }
    $scope.listAnnotation = _.map($scope.listAnnotation, function (item) {
      var borderColor = Util.adjustColorLightness(item.bgColor, -0.6);
      item["border"] = borderColor;
      return item;
    });
    //
    // var listKey = _.pluck($scope.listAnnotation, "type");
    // var arr = _.map(listKey, function (item) {
    //   var string = "";
    //   for (var i = 0; i < item.length; i++) {
    //
    //     if (i >= item.length - 1) {
    //       string += item[i];
    //     }
    //     else {
    //       string += item[i] + "+";
    //     }
    //   }
    //
    //   return string;
    // });
    // console.log(arr);
    // _.each(arr, function (item, index) {
    //   return hotkeys.bindTo($scope).add({
    //     combo: item,
    //     description: 'This one goes to 11',
    //     callback: function () {
    //       // $scope.ok();
    //       console.log(item);
    //       console.log($scope.listAnnotation[index]);
    //       $("#"+item.type).prop('checked', true);
    //     }
    //   });
    // });
  }

  $scope.checkExistEntity = function (entity) {
    return _.indexOf($scope.listNameExistAnnotation, entity.type) > -1;
  };

  $scope.selectEntity = function (item) {
    $scope.entitySelected = item;
  };

  $scope.ok = function () {
    if (!$scope.entitySelected) {
      $scope.entitySelected = $scope.listAnnotation[0];
    }
    $uibModalInstance.close({
      entity: $scope.entitySelected,
      startIndex: data.startIndex,
      endIndex: data.endIndex
    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss();
  };
});