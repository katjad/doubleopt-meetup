var fetch = require('node-fetch');

var fetchData = {
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
        return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            return myJson;     
        })
        .catch(error => console.error(error))
    }
}

module.exports = fetchData

