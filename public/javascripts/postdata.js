let confirmed, confticked, pref, prefvalue
let comment = "", selectoptions, selected = "", chapter, chpt;
let activemember = document.getElementsByClassName('active')[0];

const url = 'https://api.myjson.com/bins/1d1erz';

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

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

if (activemember){
    let userid = activemember.parentNode.getAttribute("id")
    let userrow = document.getElementById(userid)
    let submitconf = document.getElementById("submitconf")
    let message = document.getElementById("message")

    let selectchapter = document.getElementById("chapter")
    let haskellbook = document.getElementById("toggle-bk")
    //console.log("hask",haskellbook)
    // if(haskellbook){
    //     pref = userrow.querySelectorAll('input[name="preference"]')
    //     pref.forEach(function(prefoption){
    //         prefoption.addEventListener('click', () => {
    //             if(!haskellbook.checked){
    //                 setTimeout(function(){
    //                     selectchapter.className == "hidden"
    //                 }, 500)
    //             }
    //             haskellbook.checked 
    //             ? selectchapter.className = "fade-in"
    //             : selectchapter.className = "fade-out"
 
    //         })
    //     })
    // }

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
                }
            })
            selectoptions = userrow.querySelectorAll('option');
            selectoptions.forEach(function(option){
                if(option.selected){
                    selected = option.value                    
                }
            })
            if (selected && selected > 0){
                chapter = chapters[selected].title;
            }
            comment = userrow.querySelector('textarea').value; 
            comment = comment.substring(0,280);
        }

        let newjson = myjson.map((member) => {
            if (member.id == userid) {
                member.confirmed = confticked
                member.preference = prefvalue,
                member.chapter = chapter,
                member.comment = comment
            }
            return member
        })
        postData(url,newjson);        
    })
}
