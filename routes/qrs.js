var express = require('express');
var https = require('https');
var options_template = require('../options');
var fs = require('fs');

var options = {};


var router = express.Router();

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};




/* GET users listing. */
router.get('/:type', function(req, res, next) {
  //res.send('respond with a resource');
     var pathTemplate = '/qrs/[TYPE]?xrfkey=abcdefghijklmnop';

     options.hostname = options_template.hostname.replaceAll('[SERVAR-NAME]',req.headers.server_name);
     options.port = options_template.port.replaceAll('[PORT]',req.headers.port);
     options.path = pathTemplate.replaceAll("[TYPE]",req.params.type);
     options.method = options_template.method;
     options.headers = options_template.headers;

     options.key = fs.readFileSync(".\\cer\\"+req.headers.server_name+"\\client_key.pem");
     options.cert = fs.readFileSync(".\\cer\\"+req.headers.server_name+"\\client.pem");
     options.ca = fs.readFileSync(".\\cer\\"+req.headers.server_name+"\\root.pem");


	 console.log(options);     
     
     var str='';

	 var Inreq = https.get(options, function(Inres) {
		  // console.log("Got response: " + res.statusCode);

		    Inres.on('data', function (chunk) {
	        	console.log("Sono in data");
	              str += chunk;
	        });

	        Inres.on('end', function () {
	        	console.log("Sono in end : "+str);
	            res.json(JSON.parse(str));
		   
			}); 
	    })
})

.get('/:type/:id', function(req, reqs, next){

	var pathTemplate = '/qrs/[TYPE]/[ID]?xrfkey=abcdefghijklmnop';
    console.log(pathTemplate);

     var endPoint = pathTemplate.replaceAll("[TYPE]",req.params.type);
     var endPoint = endPoint.replaceAll("[ID]",req.params.id);
     console.log(endPoint);
     options.path=endPoint;
     
     var str='';

	 var req = https.get(options, function(res) {
		  // console.log("Got response: " + res.statusCode);

		    res.on('data', function (chunk) {
	        	console.log("Sono in data");
	              str += chunk;
	        });

	        res.on('end', function () {
	        	console.log("Sono in end : "+str);
	            reqs.json(JSON.parse(str));
		   
			}); 
	    })
})

.get('/:type/:id/:command', function(req, reqs, next){

	var pathTemplate = '/qrs/[TYPE]/[ID]/[COMMAND]?xrfkey=abcdefghijklmnop';
    console.log(pathTemplate);

     var endPoint = pathTemplate.replaceAll("[TYPE]",req.params.type);
     var endPoint = endPoint.replaceAll("[ID]",req.params.id);
     var endPoint = endPoint.replaceAll("[COMMAND]",req.params.command);
     console.log(endPoint);
     options.path=endPoint;
     
     var str='';

	 var req = https.get(options, function(res) {
		  // console.log("Got response: " + res.statusCode);

		    res.on('data', function (chunk) {
	        	console.log("Sono in data");
	              str += chunk;
	        });

	        res.on('end', function () {
	        	console.log("Sono in end : "+str);
	            reqs.json(JSON.parse(str));
		   
			}); 
	    })
})

.get('/:prefix/:type/:id/:command/:options', function(req, reqs, next){

	var pathTemplate = '/qrs/[PREFIX]/[TYPE]/[ID]/[COMMAND]/[OPTIONS]?xrfkey=abcdefghijklmnop';
    console.log(pathTemplate);

     var endPoint = pathTemplate.replaceAll("[TYPE]",req.params.type);
     var endPoint = endPoint.replaceAll("[ID]",req.params.id);
     var endPoint = endPoint.replaceAll("[COMMAND]",req.params.command);
     var endPoint = endPoint.replaceAll("[PREFIX]",req.params.prefix);
     var endPoint = endPoint.replaceAll("[OPTIONS]",req.params.options);
     console.log(endPoint);
     options.path=endPoint;
     
     var str='';

	 var req = https.get(options, function(res) {
		  // console.log("Got response: " + res.statusCode);

		    res.on('data', function (chunk) {
	        	console.log("Sono in data");
	              str += chunk;
	        });

	        res.on('end', function () {
	        	console.log("Sono in end : "+str);
	            reqs.json(JSON.parse(str));
		   
			}); 
	    })
})


;




module.exports = router;
