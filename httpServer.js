try{
    var http = require("http");
    var fs = require('fs');
    var qs = require('querystring');
    var jsonReader = require("json-reader");
    var jsonSort = require("json-sort");
    var jsonToText = require("json-to-text");
    var jsonToXML = require("json-to-xml");

    //Checks the  required modules are available or not.
    if ((http === undefined)) throw new Error( " Can't access http module" );
    if ((fs === undefined)) throw new Error( " Can't access fs module" );
    if ((qs === undefined)) throw new Error( " Can't access qs module" );
    if ((jsonReader === undefined)) throw new Error( " Can't access json-reader module" );
    if ((jsonSort === undefined)) throw new Error( " Can't access json-sort module" );
    if ((jsonToText === undefined)) throw new Error( " Can't access json-to-text module" );
    if ((jsonToXML === undefined)) throw new Error( " Can't access json-to-xml module" );

    var searchMatch = function ( data, queryParam ) {
        data = data.toLowerCase();
        queryParam = queryParam.toLowerCase();
        return data.search( queryParam );
    }

    var createJSONFile = function (fileName, sortedArray, cb) {
        fs.writeFile(fileName, JSON.stringify( { students: sortedArray } ), function(err) {
            if (err) {
                return cb(err, "Failed to create JSON.");
            } else {
                return cb(null, "JSON is get created.");
            }
        });
    }


    var sentOutputFile = function () {
        console.log("Request: ", req.headers.accept );
        if( req.headers.accept === "application/json") {
            console.log("Accept: application/json");
        } else if ( req.headers.accept === "application/xml") {
            console.log("Accept: application/xml");
        } else if ( req.headers.accept === "text/plain") {
            console.log("Accept: text/plain");
        }
    }

    var generateOutputFile = function (req, sortedArray, cb) {
        //console.log("Request: ", req.headers.accept );
        if( req.headers.accept.search("application/json") !== -1 ) {
            createJSONFile("destination.json", sortedArray, cb);
        } else if( req.headers.accept.search("application/xml") !== -1 ) {
            jsonToXML.XMLFileCreator("destination.xml", sortedArray, function(err, response){
                if (err) {
                    cb(err, response);
                } else {
                    cb(null, response);
                }
            });
        } else if( req.headers.accept.search("text/plain") !== -1 ) {
            jsonToText.TextFileCreator("destination.txt", sortedArray, function(err, response){
                if (err) {
                    cb(err, response);
                } else {
                    cb(null, response);
                }
            });
        } else {
            cb(new Error(" Proper request is not sent." ), null );
        }
    }


    var sendResponse = function (req, res, sortedStudentArray, cb) {

        var qParam = qs.parse( req.url.split('?')[1] );  //Splits parameter from the URL.
        var filteredSortedArray = [];//new empty local elementArray to store filtered data.
        if( qParam.q === undefined ) {//if q param is not given in url then return all the data from array.
            filteredSortedArray = sortedStudentArray;
        } else {  //filter data according to the qParameter.
            sortedStudentArray.forEach(function (value) {//filling of the elementArray.
                if ( searchMatch(value.fName, qParam.q) !== -1 ) {
                    filteredSortedArray.push(value);
                } else if ( searchMatch(value.lName, qParam.q) !== -1 ) {
                    filteredSortedArray.push(value);
                }
            });//end of filling of the filteredSortedArray
        }//work about qParam.q is completed and sortedArray is ready.
        //generateOutputFile(req, res, filteredSortedArray , cb);
        generateOutputFile(req, filteredSortedArray , function (err, response) {
            if(err) {
                cb(err, response);
            } else {
                ;//sentOutputFile();
                ;
                ;
            }
            ;
            ;
            ;
            console.log("Return test data");
            res.end("Return test data.");
            return cb(null, null);
        });
    }
    


    //Function which get called everytime when server receives therequest from client.
    var server = http.createServer ( function (req, res) {
        //Checks and allows only the GET requests from the requests coming from client.
        if ( req.method === 'GET' ) {

            var folderName = req.url.split('/')[1]; //devided url on bas of "/".
            folderName = folderName.toLowerCase(); //Converte folder name to lower case.
            if ( folderName === "favicon.ico" ) {
                res.end();   //Avoid un necessory execution of code.
            } else if(folderName === "students") { //Got correct folderName from URL.
                //Read source.json file using "json-reader" module.
                jsonReader.jsonObject("source.json", function ( err, object ) {
                    if(err) {  //Throw an error if failed to read JSON file. 
                        res.end("Error in reading JSON.");
                        throw err;
                    } else {  // Executes code further as the json file read successfully.
                        jsonSort.sortJSON ( object, function (err,sortedStudentArray) {
                            if(err) {  //throw an error if failed to return sorted array of information.
                                res.end("Error on sorting JSON.");
                                throw err;
                            } else {   //if array of the sorted data is returned from the module then execute following code.
                                //server is already closed in both cases of error or successful.
                                sendResponse(req, res, sortedStudentArray, function (err, response) {
                                    if(err) {  //Only throw an error message by catching error object.
                                        console.log(err);
                                        throw err;
                                    } else {  //display success message.
                                        console.log("Response is successfully sent");
                                    }
                                });//Work of sending response is completed.
                            }
                        });//Work of sorted json is completed.
                    }
                });//Callback of reading json is completed.
            } else {  //Throw an error in case of wrong URL is entered.
                res.end("Wrong URL is entered.");
                throw new Error(" Wrong URL is entered.");
            }
            //End of the processing on the GET request.

        } else {  //Close server if request coming from the client is other than GET request.
            res.end("Server closed: Request is other than GET request.");
            throw new Error(" Server closed: Request is other than GET request.");
        }
    });//Work of createServer is completed.

    server.listen( 1337, "127.0.0.1", function() {
        console.log( "Listening on: 127.0.0.1: 1337" );
    });
} catch (errorMessage) {
    console.log(errorMessage);
}