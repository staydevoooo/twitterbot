import fetch from "node-fetch";
import XMLHttpRequest from "xhr2";
const url = "https://opensheet.elk.sh/1HRo8seXlonLZgRBWDOvAIjhEijzC-hnJJfvl3IRO4tQ/1";

function fetchConfession() {
  /// call your function here
  let jsondata;
  fetch(url).then(
    function(u) { return u.json(); }
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

};
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
          function(u) { return u.json(); }
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



/* fetchConfession();
var fetchInterval = setInterval(fetchConfession, 5000); */
