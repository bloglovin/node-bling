//
// # Bling
//

/* jslint node: true */
'use strict';

var rework     = require('rework');
var whitespace = require('css-whitespace');
var variant    = require('rework-variant');
var importer   = require('rework-importer');
var imagesize  = require('rework-imagesize');
var autoprefix = require('autoprefixer');
var mixins     = require('rework-mixins');

module.exports = function bling(str, base) {
  var css = rework(whitespace(str))
    // Import other stylesheets
    .use(importer({
      path: base,
      whitespace: true }))

    // Enable Variant variable support
    .use(variant())

    // Add imagesize support
    .use(imagesize(base))

    // Add mixins
    // Use everything but the opacity mixin, don't want ugly IE crap
    .use(rework.mixin({
      overflow: mixins.overflow,
      'border-radius': mixins['border-radius'],
      display: mixins.display,
      absolute: mixins.absolute,
      relative: mixins.relative,
      fixed: mixins.fixed,
      size: mixins.size
    }))

    // Auto-prefix properties and psuedo-selectors
    // Prefix last 2 versions (like google) and add android 4
    .use(autoprefix(['last 2 versions', 'android 4']).rework)
    .toString();

  return css;
};

