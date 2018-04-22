let confirmed, confticked, pref, prefvalue;
let activemember = document.getElementsByClassName('active')[0];

const url = 'https://api.myjson.com/bins/17fagr';


function getData(url){
    return fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        return myJson;     
    })
    .catch(error => console.error(error))
}

function postData(url, data) {
    return fetch(url, {
        body: JSON.stringify(data), 
        headers: {
            'content-type': 'application/json'          
        },
        mode: 'cors',
        method: 'PUT',                 
    })
    .then(response => {
        let msg = (response.status == 200) ? "Data saved successfully" : "There was a problem"
        message.innerHTML = msg        
    })
    .catch(error => console.error(error)) 
}

if (activemember){
    let userid = activemember.parentNode.getAttribute("id")
    let userrow = document.getElementById(userid)
    let submitconf = document.getElementById("submitconf")
    let message = document.getElementById("message")

    submitconf.addEventListener('click', function(e){
    e.preventDefault();
    if(message){
        message.innerHTML = ''
    }
    if(userrow){       
        confirmed = userrow.querySelector('input[name="confirmation"]')
        confticked = confirmed.checked
        pref = userrow.querySelectorAll('input[name="preference"]')
        pref.forEach(function(prefoption){
            if(prefoption.checked){
                prefvalue = prefoption.getAttribute("value");
                //console.log("pref",prefvalue);
            }
        })
    }
            
    getData(url).then((myJson) => {
        //console.log("pref again",prefvalue);
        let newjson = myJson.map((member) => {
            if (member.id == userid) {
                member.confirmed = confticked
                member.preference = prefvalue
            }
            return member
        })
        return newjson
    })
    .then((newj) => {
        postData(url, newj)
    })
    .catch(error => console.error(error))        
    })
}
