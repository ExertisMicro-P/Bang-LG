module.exports.register = function (Handlebars, options) {
  'use strict';

  Handlebars.registerHelper('slugify', function (text) {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g,'')
      .replace(/ +/g,'-');
  });

  Handlebars.registerHelper('lookup', function (target_ids, dataset, options) {
    var ret = '';

    target_ids.forEach(function (target_id) {
      if ( ! (target_id in dataset) ) {
        throw new Error("Unrecognised lookup id: " + target_id);
      }
      ret += options.fn(dataset[target_id]);
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
