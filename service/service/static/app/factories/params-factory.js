/**
 * Created by crawler on 25/12/2017.
 */
app.factory('Params', function () {
  return function (params, defaults) {
    var output = defaults;
    for (var key in defaults) {
      if (params[key]) {
        output[key] = params[key];
      }
    }
    return output;
  }
});