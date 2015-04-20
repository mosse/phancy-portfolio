var http = require('http');
var fs = require('fs');
var urlParser = require('url');
var utils = require('./utils');
//TODO refactor for path
// var path = require('path');

var port = 3000;
var ip = "127.0.0.1";

var routes = {
  '/': require('./request-handler').requestHandler
};
 
var server = http.createServer(function(req, res){
  console.log("Serving request type " + req.method + " for url " + req.url);

  var parts = urlParser.parse(req.url);
  var route = routes[parts.pathname];
  if( route ){
    route(req, res);
  } else {
    utils.sendResponse(res, "Not Found", 404);
  }
});

console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);