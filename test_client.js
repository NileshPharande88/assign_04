var http = require('http');

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {
  host: '127.0.0.1',
  path: '/students/?q=Jan',
  port: '1337',
  method: 'GET',
  headers: {'accept': 'application/json,application/xml,text/plain'}
};

callback = function(response) {
  console.log("Responce: ", response);
}

http.request(options, callback).end();