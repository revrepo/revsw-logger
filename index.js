/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2015] Rev Software, Inc.
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Rev Software, Inc. and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Rev Software, Inc.
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Rev Software, Inc.
 */

var winston = require('winston');
var log = require('winston-rsyslog2').Syslog;

module.exports = function setup(options) {

  var transports = [];
  var transportName;

  for (transportName in options.transports || {}) {

    if (!options.transports.hasOwnProperty(transportName) || '_merge' === transportName) {
      continue;
    }

    if (!winston.transports[transportName]) {
      console.warn('WARNING: Winston logging configuration specifies undefined transport `%s` which will be ignored', transportName);
      continue;
    }

    transports.push(new winston.transports[transportName](options.transports[transportName]));
  }

  var logger = new (winston.Logger)({
    transports: transports
  });

  return logger;
};
