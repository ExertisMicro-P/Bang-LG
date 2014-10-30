module.exports.register = function (Handlebars, options) {
  'use strict';

  Handlebars.registerHelper('slugify', function (text) {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g,'')
      .replace(/ +/g,'-');
  });

  Handlebars.registerHelper('features', function (feature_ids, features, options) {
    var ret = '';

    feature_ids.forEach(function (feature_id) {
      if ( ! (feature_id in features) ) {
        throw new Error("Unrecognised feature id: " + feature_id);
      }
      ret += options.fn(features[feature_id]);
    });

    return ret;
  });

  Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    // console.log(v1 + ' ' + operator + ' ' + v2 + ' = ' + (v1 == v2));

    switch (operator) {
      case '==':
        return (v1 == v2) ? options.fn(this) : options.inverse(this);
      case '===':
        return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '<':
        return (v1 < v2) ? options.fn(this) : options.inverse(this);
      case '<=':
        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
      case '>':
        return (v1 > v2) ? options.fn(this) : options.inverse(this);
      case '>=':
        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
      case '&&':
        return (v1 && v2) ? options.fn(this) : options.inverse(this);
      case '||':
        return (v1 || v2) ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
    }
  });

};
