var fetch = require('node-fetch');

var fetchData = {
    "url": "https://api.myjson.com/bins/17fagr",
    "post": function postData(url, data) {
            return fetch(url, {
            body: JSON.stringify(data), 
            headers: {
                'content-type': 'application/json'          
            },
            mode: 'cors',
            method: 'PUT',                 
            })
            .then(response => {
            let successmsg = (response.status == 200) ? "Data saved successfully" : "There was a problem"
            let message = document.getElementById("message")
            message.innerHTML = successmsg
            })
            .catch(error => console.error(error)) 
    },
    "get": function getData(url){
        return fetch(this.url)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            return myJson;     
        })
    }
}

module.exports = fetchData

// var save = document.getElementById("save");
// var show = document.getElementById("show");

// save.addEventListener("click", () => {
//     postData(url_saved_tournament, tournaments)
// })

// show.addEventListener("click", () => {
//     getData(url_saved_tournament)
// })
