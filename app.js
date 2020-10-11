
//import validator from 'validator'
const chalk = require('chalk');
const validator = require('validator');
const { string, demandOption } = require('yargs');
const yargs = require('yargs');
const { listNotes } = require('./notes.js');
const utilities = require('./notes.js');
const log = console.log

// version yards
yargs.version('1.1.0')

// create an add command
yargs.command({
    command:'add',
    describe: 'Add a new note',
    builder:{
        title:{
            describe: 'Note Title',
            demandOption: true,
            type:'string'
        },
        body:{
            describe: 'Enter your Note body here',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        utilities.addNote(argv.title, argv.body)
        //log(chalk.green.bold('Adding a new note'),argv)
        //log(chalk.green.bold('\nNote Title:'),argv.title,chalk.green.bold('\nText Body:'),argv.body,'\n')
    }
})

// create a command for remove operation

yargs.command({
    command:'remove',
    describe:'Removing a note',
    builder:{
        title:{
            describe: 'Note Title',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv){
        utilities.removeNote(argv.title)
        //log(chalk.red.bold('Removing a note'))
    }
})

//create a new command for show list of notes

yargs.command({
    command:'list',
    describe:'Show List of Notes',
    handler(){
        utilities.listNotes()
    }
})

// create a new command for read operation

yargs.command({
    command:'read',
    describe:'Reading a note',
    builder:{
        title:{
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        utilities.readNote(argv.title)
    }
})

//log(yargs.argv)
yargs.parse()
