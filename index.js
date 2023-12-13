import { program } from "commander";

import * as contactsService from "./contacts/contacts.js";

const invokeAction = async ({action, id, ...data})=> {
    switch(action) {
        case "list":
           const getAllContacts = await contactsService.listContacts();
           return console.log(getAllContacts);
        case "get":
            const oneMovie = await contactsService.getContactById(id);
            return console.log(oneMovie);
        case "add":
            const newMovie = await contactsService.addContact(data);
            return console.log(newMovie);
        case "remove":
            const deleteMovie = await contactsService.deleteById(id);
            return console.log(deleteMovie);
    }
}

program
    .option("-a, --action <type>")
    .option("-i, --id <type>")
    .option("-n, --name <type>")
    .option("-e, --email <type>")
    .option("-p, --phone <type>");

program.parse();

const options = program.opts();
invokeAction(options);
