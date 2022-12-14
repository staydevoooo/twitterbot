import fetch from "node-fetch";
import XMLHttpRequest from "xhr2";

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from "express";
var app = express();

const url = "https://opensheet.elk.sh/1HRo8seXlonLZgRBWDOvAIjhEijzC-hnJJfvl3IRO4tQ/1";
function fetchConfession() {
	/// call your function here
	let jsondata;
	fetch(url).then(
		function(u) {
			return u.json();
		}
	).then(
		function(json) {
			jsondata = json;
			let lastElement = jsondata[jsondata.length - 1];
			let name = "Name: " + lastElement.Name;
			let confession = "Confession: " + lastElement.Confession;
			console.log(name);
			console.log(confession);
		}
	);

}
fetchConfession();

let previous = null;
let current = null;
setInterval(function() {
	let request = new XMLHttpRequest();
	request.open('GET', url, true);

	request.onload = function() {
		if (this.status >= 200 && this.status < 400) {
			let json = JSON.parse(this.response);
			current = JSON.stringify(json);
			if (previous && current && previous !== current) {
				let jsondata;
				fetch(url).then(
					function(u) {
						return u.json();
					}
				).then(
					function(json) {
						jsondata = json;
						let lastElement = jsondata[jsondata.length - 1];
						let name = "Name: " + lastElement.Name;
						let confession = "Confession: " + lastElement.Confession;
						console.log(name);
						console.log(confession);
					}
				);
			}
			previous = current;
		}
	};

	request.send();
}, 10000);

app.use(express.static(__dirname + '/'));
app.get('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, './index.html'));
});
app.listen(process.env.PORT || 8080);
