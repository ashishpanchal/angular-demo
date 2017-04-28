var express = require('express'),
	app = express();

var port = 8085;
app.use(express.static(__dirname+"/"));
app.listen(port);
console.log("Server listing on port 8085");