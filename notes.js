const chalk = require('chalk')
const fs = require('fs')
const { title } = require('process')

const addNote = (title,body) => {
    const notes = loadNotes()

    //const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)

    // if(duplicateNotes.length === 0 ){
    if(!duplicateNote){
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

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note)=> note.title !== title)
    
    if(notesToKeep.length === notes.length){
        console.log(chalk.red.bold('Title: '), chalk.red.bold(title) , chalk.red.bold('does not exists'))
    }
    else{
        console.log(chalk.green.bold('Title: '), chalk.green.bold(title) , chalk.green.bold('has been removed'))
        saveNotes(notesToKeep)
    }
}

const loadNotes  = () => {
    try{
        const dataBuffer = fs.readFileSync('userNotes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e) {
        return []
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.cyan.bold('\n *** Displaying list of notes *** \n'))
    notes.forEach((note) => {
        console.log(chalk.green.bold(note.title))
    });
}
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('userNotes.json',dataJSON)
}

const readNote = (title) => {
    const notes = loadNotes()
    const storedNote = notes.find((note) => note.title === title)

    if(storedNote){
        console.log(chalk.blue.bold('\n**** Reading a note from list ****\n'))
        console.log(chalk.green.bold(storedNote.title))
        console.log(chalk.bold(storedNote.body))
    }
    else{
        console.log(chalk.red.bold('Title does not exists in list'))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
