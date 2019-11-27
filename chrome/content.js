const global = { // store in global instead of window
    //find the textarea to modify
    activation: (e)=>{
        if(e.target.isContentEditable){ // user interacted with dom[contentediable]
            const textarea = e.target
            return textarea
        }
    },
    //check content of the select textarea
    checkContent: function(keyEvent,textarea){
        const self = global
        const fullText = textarea.textContent
        if(keyEvent.key.match(/[.|?|!|;]/)){
            const sentencesArray = fullText.split(/[.|?|!|;]/) //split textContent into sentences
            const lastSentence = sentencesArray[sentencesArray.length-2] // check the last sentence
            console.log(`%c Checking: ${lastSentence}`, 'background-color: #000; color: #fff;')
            self.fetchGrammar(lastSentence)
        }
    },
    //fetch grammar suggestions from ys's grammar api
    fetchGrammar: async function(text){
        const response = await fetch(`http://34.70.101.68:8000/correct`,{
            method:'POST',
            header:{
                "Accept": 'application/json',
                "Content-Type" : 'application/json'
            },
            body: `${encodeURI(text)}`
        })
        const data = await response.json()
        console.log('%c Response:', 'background-color: #000; color: #fff;', data[1])
    }
}

// main()
document.onreadystatechange = function(){
    const {activation, checkContent} = global
    if(document.readyState === "complete"){ //// NOTE: gmail think it's 'complete' but it's not, editor shows up after 'complete'. fucking annoying as shit.
        const events = ['keyup','click'] // NOTE: gmail is fucked, 'complete' doesn't work. This checks to see if editor exists after user events.
        events.forEach(event => {
            window.addEventListener(event, function(e){ //read all user events on the global level and see if target is contenteditable.
                const textarea = activation(e)
                if(textarea){
                    textarea.addEventListener('keyup', function(keyEvent){
                        checkContent(keyEvent, textarea)
                    })
                }
            })
        })
    }
}