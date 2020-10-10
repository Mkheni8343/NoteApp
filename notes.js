const chalk = require('chalk')
const fs = require('fs')

const getNotes = function () {
    return 'Your notes are ...'
}

const addNote = function(title,body){
    const notes = loadNotes()

    const duplicateNotes = notes.filter(function(note){
        return note.title === title
    })

    if(duplicateNotes.length === 0 ){
        notes.push({
            title:title,
            body:body
        })
    
        saveNotes(notes)
        console.log(chalk.green.bold('Note Successfully Added Into The List'))    
    }
    else{
        console.log(chalk.red.bold('Duplicate Title Found') )
    }
}   

const removeNote = function(title){
    const notes = loadNotes()
    const notesToKeep = notes.filter(function(note){
        return note.title !== title
    })
    
    
    if(notesToKeep.length === notes.length){
        console.log(chalk.red.bold('Title: '), chalk.red.bold(title) , chalk.red.bold('does not exists'))
    }
    else{
        console.log(chalk.green.bold('Title: '), chalk.green.bold(title) , chalk.green.bold('has been removed'))
        saveNotes(notesToKeep)
    }
    
}

const loadNotes  = function(){
    try{
        const dataBuffer = fs.readFileSync('userNotes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e) {
        return []
    }
}

const saveNotes = function(notes){
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('userNotes.json',dataJSON)
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}
