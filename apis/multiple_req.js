/* Print numbers with marcopolo tag and 
 * load all required modules
 */
var express = require('express');
//var async = require('async');
var app = express(); 

var value = '';

// Create new user by registration endpoint
app.use('/', function(req, res){
	loopCount(100000)
		.then(function(response){
			console.log(' -- response: ' + response);
			res.status(200).send({message: 'Completed successfully'});
		})
		.catch(function(error){
			console.log(' -- error.message: ' + error.message);
			res.status(500).send({message: error.message});
		})
		
		/*
		// Other way to call 
		async.parallel(function(cb){
			loopCount(500),
			function(err, results) {
				console.log(err);
				console.log(results);
				// results is now equals to: {one: 1, two: 2}
			});
		*/

})

// Create server 
var server = app.listen(8081, function () { 
	var host = server.address().address; 
	var port = server.address().port;
	console.log("Example app listening at http://localhost:" + port); 
})

async function loopCount(total){

	for(var i=1; i<=total; i++){
		
		var count = 1;
		
		if(i%4 == 0 && i%7 == 0){
			value += 'MACROPOLO, ';
		}
		else if(i%4 == 0){
			value += 'MACRO, ';
		}
		else if(i%7 == 0){
			value += 'POLO, ';
		}
		else{
			value += i + ', '; 
		}
		
		while(count < 1000){
			count++;
		}
	}
	
	return value;
}





