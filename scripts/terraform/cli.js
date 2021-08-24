#!/bin/env node
const Environment = require("../shared/environment");
const Help = require("./help");
const OUTPUT = require("./resources/output");
const STATE = require("./resources/state");

Object.byString = function(o, s) {
  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, '');           // strip a leading dot
  var a = s.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (k in o) {
          o = o[k];
      } else {
          return;
      }
  }
  return o;
}

const env = Environment(true);

const ACTIONS = [
  'get',
  'set'
]

const RESOURCES = [
  'output',
  'state'
]

if (
  ACTIONS.indexOf(env.action.toLowerCase()) >= 0 &&
  RESOURCES.indexOf(env.resource.toLowerCase()) >= 0
) {
  try {
    let mod = null
    switch (env.resource) {
      case 'output':
        mod = OUTPUT
        break;
      case 'state':
        mod = STATE
        break;
      default:
        break;
    }

    if (mod && typeof mod[env.action]) {
      mod[env.action](env.args).then(()=> {
        console.log("ok");
      }).catch(err => {
        Help(err);
      });
    }
  } catch (error) {
    Help(error);
  }
} else {
  if (ACTIONS.indexOf(env.action.toLowerCase()) < 0) {
    Help(`Missing \'action\' or Invalid action\nAllowed Actions:\n - ${ACTIONS.join('\n - ')}`);
  } else if (RESOURCES.indexOf(env.resource.toLowerCase()) < 0) {
    Help(`Missing \'resources\' or Invalid resource\nAllowed RESOURCES:\n - ${RESOURCES.join('\n - ')}`);
  }
}



