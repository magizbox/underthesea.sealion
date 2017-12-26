/**
 * Created by crawler on 25/12/2017.
 */
app.factory('Dialogue', function ($resource, DialogueDocument) {

  DialogueDocumentService = DialogueDocument;
  var resource = $resource('/api/dialogues/:id/', {
    'filter': '@filter'
  }, {
    '_query': {method: 'GET'},
    'update': {method: 'PUT'}
  });

  resource.query = function () {
    return resource._query.apply(null, arguments).$promise.then(function (data) {
      dialogues = data.results;
      return new Promise(function (fulfill, reject) {
        var p = _.map(dialogues, function (dialogue) {
          var docId = JSON.parse(dialogue.content)[0];
          return DialogueDocumentService.get({"id": docId});
        });

        Promise.all(p).then(function (documents) {
          var output = _.zip(dialogues, documents);
          dialogues = _.map(output, function (item) {
            var dialogue = item[0];
            var comments = _.flatten(JSON.parse(dialogue.content)).length - 1;
            dialogue["text"] = item[1].text;
            dialogue["comments"] = comments;
            return dialogue;
          });
          fulfill(dialogues);
        });
      });
    });
  };

  resource.getDocuments = function () {
    return resource._query.apply(null, arguments).$promise.then(function (data) {

      function merge(ids, data) {
        var output = [];
        for (var i = 0; i < ids.length; i++) {
          if (_.isArray(ids[i])) {
            output.push(merge(ids[i], data))
          } else {
            output.push(data[ids[i]])
          }
        }
        return output;
      }

      return new Promise(function (fulfill, reject) {
        documentIds = JSON.parse(data["content"]);
        ids = _.flatten(documentIds);
        var r = _.map(ids, function (id) {
          return DialogueDocumentService.get({"id": id});
        });
        console.log(r);
        Promise.all(r).then(function (data) {

          _.each(data, function (item) {
            if (_.isArray(item["auto_act"]) == false) {
              item["auto_act"] = JSON.parse(item["auto_act"]);
            }
            return item;
          });
          console.log(data);
          data = data.reduce(function (map, obj) {
            map[obj["id"]] = obj;
            return map;
          }, {});
          var output = merge(documentIds, data);
          fulfill(output);
        });
      })
    });
  };
  resource.pagination = function () {
    params = arguments[0];
    return resource._query.apply(null, arguments).$promise.then(function (data) {
      var output = {};
      output["totalItems"] = data["count"];
      output["itemsPerPage"] = params["limit"];
      output["currentPage"] = Math.floor(params["offset"] / params["limit"]) + 1;
      return Promise.resolve(output);
    });
  };
  return resource;
});