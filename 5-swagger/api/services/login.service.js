'use strict';

var _ = require('lodash');
var messageHelper = require('../helpers/message.helper');

const soapRequest = require('easy-soap-request');
const fs = require('fs');



////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

// Error Messages
//const GS_SVC_ERR_CREATE_GS_ALREADY_EXISTS_WITH_SAME_NAME = 'Not possible to create gamesystem. There is a gamesystem with the same name in the system';

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////

function getLogin(params) {
  // example data
  //This is the url
  const url = 'http://187.210.68.147:8082/ER_WS_CONTROL/ERWSINFRAService';
  //default headers
  const headers = {
    'user-agent': 'sampleTest',
    'Content-Type': 'text/xml;charset=UTF-8',
  };


  console.log("login working ...")

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

    console.log("done ...")

    return "{message : 'login ok'}";
}

module.exports = {
    getLogin
   }