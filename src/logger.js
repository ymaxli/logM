/**
 * @fileOverview Logger object
 *               log methods for user
 * @author Max
 * created at Tue Aug 19 2014 15:24:22 GMT+0800 (CST)
 */

var colors = require('colors');
var moment = require('moment');
var loggerLevel = require('./logger-level');

colors.setTheme({
    log: 'grey',
    debug: 'green',
    warn: 'yellow',
    error: 'red',
    trace: 'blue'
});

var Logger = {
    create: function(category, fileAppender) {
        var obj = {};
        
        obj.log = function(text) {
            console.log(getPrefix(loggerLevel.LOG).log + text);
            if(fileAppender) fileAppender.appendToFile(getPrefix(loggerLevel.LOG) + text);
        }
        obj.debug = function(text) {
            console.log(getPrefix(loggerLevel.DEBUG).debug + text);
            if(fileAppender) fileAppender.appendToFile(getPrefix(loggerLevel.DEBUG) + text);
        }
        obj.warn = function(text) {
            console.warn(getPrefix(loggerLevel.WARN).warn + text);
            if(fileAppender) fileAppender.appendToFile(getPrefix(loggerLevel.WARN) + text);
        }
        obj.error = function(text) {
            console.error(getPrefix(loggerLevel.ERROR).error + text);
            if(fileAppender) fileAppender.appendToFile(getPrefix(loggerLevel.ERROR) + text);
        }
        obj.trace = function(text) {
            console.trace(getPrefix(loggerLevel.TRACE).trace + text);
            if(fileAppender) fileAppender.appendToFile(getPrefix(loggerLevel.TRACE) + text);
        }
        
        // get yyyy-MM-dd HH:mm:ss format moment
        function getMoment() {
            return moment().format('YYYY-MM-DD HH:mm:ss');
        }
        // get prefix
        function getPrefix(level) {
            return '[' + getMoment() + '] ' + category + ' - ' + level + ': '; 
        }
        
        return obj;
    }
}

exports.create = Logger.create;