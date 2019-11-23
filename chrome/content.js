const activation = (e)=>{
    if(e.target.isContentEditable){ // clicked on content editable space
        const textarea = e.target
        return textarea
    }
}

const fetchGrammar = async function(text){
    const response = await fetch(`http://localhost:3000/grammar?text=${encodeURI(text)}`)
    const data = await response.json()
    console.log('%c Grammarbot response:', 'background-color: #000; color: #fff;', data[0])
    console.log('%c YS response:', 'background-color: #000; color: #fff;', data[1])
}
const events = ['click', 'keyup']
events.forEach(event => {
    document.addEventListener(event, function(e){
        const textarea = activation(e)
        if(textarea){
            textarea.addEventListener('keyup', function(keyEvent){
                const fullText = this.textContent
                if(keyEvent.key === '.'){
                    const sentencesArray = fullText.split('.')
                    const lastSentence = sentencesArray[sentencesArray.length-2]
                    console.log(`%c Checking: ${lastSentence}`, 'background-color: #000; color: #fff;')
                    fetchGrammar(lastSentence)
                }
            })
        }
    })
})

