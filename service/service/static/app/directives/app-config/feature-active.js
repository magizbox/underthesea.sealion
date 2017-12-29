/**
 * Created by crawler on 29/12/2017.
 */
app.directive('activeReview', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attr) {
      if(attr.activeReview){
        if(window.AppConfig[attr.activeReview]){
          element.show();
        }
        else{
          element.remove();
        }
      }

    }
  }
});