try{
    var http = require("http");
    var fs = require('fs');
    var qs = require('querystring');
    var jsonReader = require("json-reader");
    var jsonSort = require("json-sort");

    //Checks the  required modules are available or not.
    if ((http === undefined)) throw new Error( " Can't access http module" );
    if ((fs === undefined)) throw new Error( " Can't access fs module" );
    if ((qs === undefined)) throw new Error( " Can't access qs module" );
    if ((jsonReader === undefined)) throw new Error( " Can't access json-reader module" );
    if ((jsonSort === undefined)) throw new Error( " Can't access json-sort module" );

    var searchMatch = function ( data, queryParam ){
        data = data.toLowerCase();
        queryParam = queryParam.toLowerCase();
        return data.search( queryParam );
    }


    var generateOutputFile = function (req, sortedArray, cb) {
        console.log("Request: ", req.headers.accept );



        console.log("Return filtered data: ", filteredSortedArray);
        res.end("Return filtered data.");
        return cb(0);
    }


    var giveResponce = function (req, res, sortedStudentArray, cb) {
        var qParam = qs.parse( req.url.split('?')[1] );  //Splits parameter from the URL.

        var filteredSortedArray = [];//new empty local elementArray to store filtered data.
        if( qParam.q === undefined ) {//if q param is not given in url then return all the data from the json file.
            sortedStudentArray.forEach(function (value) {
                filteredSortedArray.push(value);
            });
        } else {
            sortedStudentArray.forEach(function (value) {//filling of the elementArray.
                if ( searchMatch(value.fName, qParam.q) !== -1 ) {
                    filteredSortedArray.push(value);
                } else if ( searchMatch(value.lName, qParam.q) !== -1 ) {
                    filteredSortedArray.push(value);
                }
            });//end of filling of the filteredSortedArray
        }//work about qParam.q is completed and sortedArray is ready.

        generateOutputFile(req, filteredSortedArray , cb);
    }
    


    //Function which get called everytime when server receives therequest from client.
    var server = http.createServer ( function (req,res) {
        //Checks and allows only the GET requests from the requests coming from client.
        if ( req.method === 'GET' ) {
            var folderName = req.url.split('/')[1]; //devided url on bas of "/".
            folderName = folderName.toLowerCase(); //Converte folder name to lower case.

            if ( folderName === "favicon.ico" ) {
                res.end();   //Avoid un necessory execution of code.
            }
            else if(folderName === "students") { //Got correct folderName from URL.
                //Read source.json file using "json-reader" module.
                jsonReader.jsonObject("source.json", function ( err,object ) {
                    if(err) {
                        console.log(object); //Returns error if failed to read JSON file.
                        res.end("Error in reading JSON.");
                    }
                    else {// Executes code further as the json file read successfully.
                        jsonSort.sortJSON ( object, function (err,sortedStudentArray) {
                            if(err) {  //Returns error if failed to return sorted array of information.
                                console.log(err);
                                res.end("Error on sorting JSON.");
                            } else { //if array of the sorted data is returned from the module then execute following code.
                                giveResponce(req, res, sortedStudentArray, function (err) {
                                    ;
                                    ;
                                    ;
                                });
                            }
                        });//Work of sorted json is completed.
                    }
                });//Work of reading json is completed.
            } else {
                console.log("Wrong URL is entered."); //Returns the message in case of wrong URL is entered. 
                res.end("Wrong URL is entered.");
            }//Work of folder name is completed.
        } else {
            console.log("Server closed: Request is other than GET request.");
            res.end("Server closed: Request is other than GET request.");
        }//Work of GET method is completed.
    });//Work of createServer is completed.

    server.listen( 1337, "127.0.0.1", function() {
        console.log( "Listening on: 127.0.0.1: 1337" );
    });
} catch (errorMessage) {
    console.log(errorMessage);
}