'use strict';

var _ = require('lodash');

var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
var loginService = require('../services/login.service');
var utils = require('../utils/writer.js');

//const soapRequest = require('easy-soap-request');
//const fs = require('fs');


var soap = require('strong-soap').soap;
var parser = require('xml2json');

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

// Module Name
const MODULE_NAME = '[Operador Controller]';

// Error Messages
const GS_CT_ERR_GAMESYSTEM_NOT_FOUND = 'Operador not found';

// Success Messages
const GS_CT_DELETED_SUCCESSFULLY = 'Operador deleted successfully';

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////

function getLogin(req, res) {

  try {

/*
    // Receiving parameters
    var params = {
      usuario: req.swagger.params.usuario.value,
      password: req.swagger.params.password.value
    };

    // Call to service

    loginService.getLogin(params)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
    });
   
  */

 // example data
  //This is the url
  /*
  const url = 'http://187.210.68.147:8082/ER_WS_CONTROL/ERWSINFRAService';
  //default headers
  const headers = {
    'user-agent': 'sampleTest',
    'Content-Type': 'text/xml;charset=UTF-8',
  };
*/

// wsdl of the web service this client is going to invoke. For local wsdl you can use, url = './wsdls/stockquote.wsdl'
var url = 'http://187.210.68.147:8082/ER_WS_CONTROL/ERWSINFRAService?wsdl';

var requestArgs = {
  symbol: 'IBM'
};

var options = {};
var json;

soap.createClient(url, options, function(err, client) {
  var method = client['getDestinos'];
  method(requestArgs, function(err, result, envelope, soapHeader) {
    //response envelope
    var myoptions = {
      object: false,
      reversible: false,
      coerce: false,
      sanitize: true,
      trim: true,
      arrayNotation: false,
      alternateTextNode: false
    };

    json = parser.toJson(envelope);
    var goals = json.split(',')
    var result = [];

    for (var i in goals) {
      if (i > 1)
      {
        var item = goals[i].split('-');
        var clave = item[0].replace("\"\"", "\"");
        var descripcion = item[1].replace("\"\"", "\"");
        result.push({id: 1, codigo: 1000, nombre: clave, email: descripcion});
        console.log(clave);
        console.log(descripcion);
      }
    }

    utils.writeJson(res, result);
  
  });
});



 // console.log("login working ...")
/*
    //here in the folder test/zipCodeEnvelope.xml i will put the xml request
    const xml = fs.readFileSync('../utils/zipCodeEnvelope.xml', 'utf-8');

    // usage of module
    (async () => {
      console.log("calling ...")

      const { response } = await soapRequest(url, headers, xml);
      const { body, statusCode } = response;
      console.log(body);
      console.log(statusCode);
    })();
*/
  //  console.log("done ...")
    //res.writeHead(200, {'Content-Type': 'application/json'});
    //json = "[{\"id\": 1,\"codigo\": 1000, \"nombre\": \"adsoft-sito\", \"email\": \"adsoft@live.com.mx\"}]";
    //res.writeHead('Content-Type', 'application/json');
    
    //res.contentType('application/json');
    //res.send(JSON.stringify(result));
  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, getLogin.name, error, res);
  }
}


module.exports = {
    getLogin,
    MODULE_NAME
  }