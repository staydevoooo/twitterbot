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



  request.send();
}, 10000);


/* fetchConfession();
var fetchInterval = setInterval(fetchConfession, 5000); */
