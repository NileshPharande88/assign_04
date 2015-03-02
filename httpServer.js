try{
    var http = require("http");
    var fs = require('fs');
    var qs = require('querystring');
    var jsonReader = require("json-reader");

    //Checks the  required modules are available or not.
    if ((http === undefined)) throw new Error( " Can't access http module" );
    if ((fs === undefined)) throw new Error( " Can't access fs module" );
    if ((qs === undefined)) throw new Error( " Can't access qs module" );
    if ((jsonReader === undefined)) throw new Error( " Can't access json-reader module" );
    
    //Function which get called everytime when server receives therequest from client.
    var server = http.createServer ( function (req,res) {
        //Checks and allows only the GET requests from the requests coming from client.
        if ( req.method === 'GET' ) {
            var folderName = req.url.split('/')[1]; //devided url on bas of "/".
            folderName = folderName.toLowerCase(); //Converte folder name to lower case.

            if ( folderName === "favicon.ico" ) { ;}  //Avoid un necessory execution of code.
            else if(folderName === "students") {
                var qParam = qs.parse( req.url.split('?')[1] );
                jsonReader.jsonObject("source.json", function ( err,object ) {
                	console.log("Inside students exesits: ", err);
                	if(err) console.log(object);
                	else {
                		console.log("JSON: ",object);
                		;
                		;
                	}
                });
                if( qParam.q === undefined ) {
                	;
                	;
                	;
                } else {
                	;
                	;
                	;
                }
                ;
                ;
                ;
                console.log("Correct URL is entered: ", qParam.q);
                res.end("Correct URL is entered.");
            } else {
                console.log("Wrong URL is entered."); //Returns the message in case of wrong URL is entered. 
                res.end("Wrong URL is entered.");
            }
        } else {
            console.log("Server closed: Request is other than GET request.");
            res.end("Server closed: Request is other than GET request.");
        }
    });
    ;
    server.listen( 1337, "127.0.0.1", function() {
        console.log( "Listening on: 127.0.0.1: 1337" );
    });
} catch (errorMessage) {
    console.log(errorMessage);
}