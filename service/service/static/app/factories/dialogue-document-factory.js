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

    transformData: function (document, column_name) {
      if (_.isArray(document[column_name])) {
        document[column_name] = _.map(document[column_name], function (item) {
          if (_.has(item, "id")) {
            item = _.omit(item, "id");
          }
          if (!_.has(item, "confirm")) {
            item["confirm"] = null;
          }
          return item;
        });
      }
      return document;
    },

    transformAutoData: function (document, column_name) {
      if (_.isArray(document[column_name])) {
        document[column_name] = _.map(document[column_name], function (item) {
          if (_.has(item, "name")) {
            item = item["name"];
          }
          return item;
        });
      }
      return document;
    },

    deserialize: function (document) {
      _.each(["word_sent", "pos_tag", "chunking", "ner", "auto_act", "category", "act", "sentiment", "auto_category", "auto_sentiment", "meta"], function (field) {
        document = DialogueDocumentSerializer.formatDataType(document, field);
      });

      _.each(["category", "act", "sentiment"], function (field) {
        document = DialogueDocumentSerializer.transformData(document, field);
      });

      _.each(["auto_category", "auto_act", "auto_sentiment"], function (field) {
        document = DialogueDocumentSerializer.transformAutoData(document, field);
      });

      document["hasSentiment"] = document["sentiment"] != "[]" && document["sentiment"] != "";
      document["hasAct"] = document["act"] != "[]" && document["act"] != "";
      document["hasCategory"] = document["category"] != "[]" && document["category"] != "";
      return document;
    },

    serialize: function (object) {
      _.each(["auto_act", "auto_category", "auto_sentiment"], function (field) {
        object = DialogueDocumentSerializer.transformAutoData(object, field);
      });

      _.each(["word_sent", "pos_tag", "chunking", "ner", "auto_act", "category", "act", "sentiment", "auto_category", "auto_sentiment", "meta"], function (field) {
        if (_.isArray(object[field]) || _.isObject(object[field])) {
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

  resource.filterSentiment = function () {
    return resource._query.apply(null, arguments).$promise.then(function (data) {
      data["results"] = _.map(data["results"], function (document) {
        document["hasSentiment"] = document["sentiment"] != "[]" && document["sentiment"] != "";
        document["hasAct"] = document["act"] != "[]" && document["act"] != "";
        document["hasCategory"] = document["category"] != "[]" && document["category"] != "";
        return document;
      });
      return Promise.resolve(data);
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

  resource.update = function (callback) {
    arguments[1] = DialogueDocumentSerializer.serialize(arguments[1]);
    return resource._update.apply(null, arguments).$promise.then(callback);
  };

  resource.get = function () {
    // call the original get method via the _get alias, chaining $then to facilitate
    // processing the data
    return resource._get.apply(null, arguments).$promise.then(function (data) {
      data = DialogueDocumentSerializer.deserialize(data);
      return Promise.resolve(data);
    });
  };

  return resource;
});