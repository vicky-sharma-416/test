var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var userInput = __dirname + '/../seeder/';

var str = '';
var response = ''

function get7segment(value) {
	// Split string by new line
    return value
        .split('\n')
		// Split provides an array, here our seven segment covers 3 lines that's why consider 3 params
        .reduce(function (r, a, i) {
            a.match(/.../g).forEach(function (b, j) {
                r[j] = r[j] || [];
                r[j][i] = b;
            });
            return r;
        }, [])
		.map(function (a) {
            return a.join('');
        })
		.map(function (a) {
            var bits = { 63: 0, 6: 1, 91: 2, 79: 3, 102: 4, 109: 5, 125: 6, 7: 7, 127: 8, 111: 9, 0: ' ' },
                v = '909561432'.split('').reduce(function (r, v, i) {
					return r + ((a[i] !== ' ') << v);
                }, 0);
            return v in bits ? bits[v] : '? ILLEGAL'; // ? is an illegal character
        })
		.join('');
}

function segmentNumber(lines) {
	var result = get7segment(lines);
	response += result+'\n'
}

// Create server and upload file
http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
	var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
		console.log(files)
		console.log(fields)
	  segmentFile(files.filetoupload.name, res);
	});
  }
  else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080); 

// Read file and call segment method to print number
function segmentFile(fileName, res){
	fs.readFileSync((userInput+fileName)).toString().split('\n').forEach(function(line){
		if(line){
			str += line+'\n' 
		}
		else{
			var lineValue = str.slice(0,-1);
			str = '';
			if(lineValue)
				segmentNumber(lineValue);
		}
	})
	
	//console.log(response);
	res.end(response);
}

/**
// For single seven segment in a line
var fs = require('fs');
var str = '';
var obj = {
	' _ |_ |_|': 6, 
	' _ |_  _|': 5 
};

fs.readFileSync('input_user_story_1.txt').toString().split('\n').forEach(function(line){
	str += line 
	if(obj.hasOwnProperty(str)){
		console.log('\n\n-- array: ', str);
		str = ''
	}
})

**/