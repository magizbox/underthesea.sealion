/**
 * Created by crawler on 25/12/2017.
 */
app.factory('Document', function ($resource) {
  var resource = $resource('/api/documents/:id/', {
    'filter': '@filter'
  }, {
    '_query': {method: 'GET'},
    '_update': {method: 'PUT'}
  });

  DocumentSerializer = {
    formatDataType: function (document, column_name) {
      try {
        if (document[column_name]) {
          document[column_name] = $.parseJSON(document[column_name]);
        } else {
          document[column_name] = [];
        }
      } catch (e) {
        document[column_name] = [];
      }
      return document;
    },

    deserialize: function (document) {
      _.each(["word_sent", "pos_tag", "chunking", "ner", "act"], function(field){
        document = DocumentSerializer.formatDataType(document, field);
      });

      document["hasSentiment"] = document["sentiment"] != "[]" && document["sentiment"] != "";
      document["hasAct"] = document["act"] != "[]" && document["act"] != "";
      document["hasCategory"] = document["category"] != "[]" && document["category"] != "";
      return document;
    },

    serialize: function(object){
      _.each(["word_sent", "pos_tag", "chunking", "ner", "act"], function(field){
        if(_.isArray(object[field])){
          object[field] = JSON.stringify(object[field]);
        }
      });
      return object;
    }
  };

  resource.query = function () {
    return resource._query.apply(null, arguments).$promise.then(function (data) {
      if (data["results"]) {
        var documents = _.map(data["results"], DocumentSerializer.deserialize);
        return Promise.resolve(documents);
      } else {
        var document = DocumentSerializer.deserialize(data);
        return Promise.resolve(document);
      }
    });
  };

  resource.update = function (callback) {
    arguments[1] = DocumentSerializer.serialize(arguments[1]);
    return resource._update.apply(null, arguments).$promise.then(callback);
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