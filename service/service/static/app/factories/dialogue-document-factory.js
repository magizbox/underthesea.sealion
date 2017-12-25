/**
 * Created by crawler on 25/12/2017.
 */
app.factory('DialogueDocument', function ($resource) {
  var resource = $resource('/api/dialogue_documents/:id/', {
    'filter': '@filter'
  }, {
    '_query': {method: 'GET'},
    '_get': {method: 'GET'},
    '_update': {method: 'PUT'}
  });

  DialogueDocumentSerializer = {
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
      _.each(["word_sent", "pos_tag", "chunking", "ner", "auto_act"], function (field) {
        document = DialogueDocumentSerializer.formatDataType(document, field);
      });

      document["hasSentiment"] = document["sentiment"] != "[]" && document["sentiment"] != "";
      document["hasAct"] = document["act"] != "[]" && document["act"] != "";
      document["hasCategory"] = document["category"] != "[]" && document["category"] != "";
      return document;
    },

    serialize: function (object) {
      _.each(["word_sent", "pos_tag", "chunking", "ner", "auto_act"], function (field) {
        if (_.isArray(object[field])) {
          object[field] = JSON.stringify(object[field]);
        }
      });
      return object;
    }
  };

  resource.query = function () {
    return resource._query.apply(null, arguments).$promise.then(function (data) {
      var documents = _.map(data["results"], function (document) {
        document["hasSentiment"] = document["sentiment"] != "[]" && document["sentiment"] != "";
        document["hasAct"] = document["act"] != "[]" && document["act"] != "";
        document["hasCategory"] = document["category"] != "[]" && document["category"] != "";
        return document;
      });
      return Promise.resolve(documents);
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

  resource.get = function () {
    // call the original get method via the _get alias, chaining $then to facilitate
    // processing the data
    return resource._get.apply(null, arguments).$promise.then(function (data) {
      data = DialogueDocumentSerializer.deserialize(data);
      return Promise.resolve(data);
    });
  };

  resource.update = function (callback) {
    arguments[1] = DialogueDocumentSerializer.serialize(arguments[1]);
    return resource._update.apply(null, arguments).$promise.then(callback);
  };

  return resource;
});