/*
 * code-forensics
 * Copyright (C) 2016-2019 Silvio Montanari
 * Distributed under the GNU General Public License v3.0
 * see http://www.gnu.org/licenses/gpl.html
 */

var TimePeriodResults = require('./time_period_results');

module.exports = function(streamProcessor, helpers, options) {
  var transformFn = TimePeriodResults.resultsMapper(options.metrics.selector);
  var groupParam = { '-g': helpers.files.layerGrouping() };

  return function(timePeriods) {
    return streamProcessor.mergeAll(timePeriods, function(period) {
      var vcsLogFile = helpers.files.vcsNormalisedLog(period);
      return helpers.codeMaat[options.analysis](vcsLogFile, groupParam).pipe(
        transformFn(period)
      );
    });
  };
};
