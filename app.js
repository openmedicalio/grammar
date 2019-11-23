const fetch = require('node-fetch')
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const cors = require('cors')

async function grammarRequest(text){

    const requestObj = {
        'api_key': 'KS9C5N3Y',
        'text': text,
        'language': "en-US"
    }
    let url = 'http://api.grammarbot.io/v2/check?'
    
    for(const key in requestObj){ 
        url += `${key}=${encodeURI(requestObj[key])}${(key === 'language') ? '' : '&' }`
    }
    const response = await fetch(url)
    const data = await response.json()



    const ysRequestObj = {
        "text": text
    }
    const ysUrl = 'https://us-central1-project-318531836785902414.cloudfunctions.net/correct'
    const ysResponse = await fetch(ysUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ysRequestObj)
      })
    
    const ysData = await ysResponse.text()


    return [data.matches, ysData]
}

app.use(cors())

app.get('/grammar', (req,res)=>{
    const text = req.query.text
    grammarRequest(text)
    .then(grammarResponse=>{
        res.send(JSON.stringify(grammarResponse))
    })
})


http.listen(3000, function(){
    console.log('on port 3000')
})