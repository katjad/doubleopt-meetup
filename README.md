

# Double Opt-In for Meetups (D-O-M)

Prototype of a one-page app that let\'s users reconfirm their Meetup attendance, and add extra details.       

Node/Express + PugJS

The app needs a config file at root level, of this format, where DATA is a slug for a JSON objects stored at myjson.com:        
```
var config = {
    MEETUP_OAUTH_KEY : 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
    MEETUP_OAUTH_SECRET : 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
    HOST: 'https://127.0.0.1:3000',
    DATA:'xxxxx'
}

module.exports = config
```         

JSON object is of format       
```
[
    {
      "id":"Meetup member id",
      "name":"Name on Meetup",
      "preference":"",
      "chapter":"",
      "comment":""
    },
    ..
]