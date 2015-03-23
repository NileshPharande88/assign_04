try {
  var http = require('http');

  //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
  var options = {
    host: '127.0.0.1',
    path: '/students/',
    port: '1337',
    method: 'GET',
//    headers: {'accept': 'text/plain'}
//    headers: {'accept': 'application/xml'}
   headers: {'accept': 'application/json'}
  };

  var chunks = "";
  var callback = function(response) {
    console.log("Status code: ", response.statusCode);
    console.log("Status: ", response.statusMessage);
    response.on('data', function (chunk) {
      chunks += chunk;
      //console.log('BODY: '+ chunk);
    });
    response.on('end', function () {
      console.log('BODY: ', chunks);
    });
  }

  http.request(options, callback).end();
}catch (err) {
  console.log("Catched error: ",err);
}