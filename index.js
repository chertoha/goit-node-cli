import { program } from "commander";
import {
    addContact,
    getContactById,
    listContacts,
    removeContact,
} from "./contacts.js";
program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, ...data }) {
    switch (action) {
        case "list":
            const list = await listContacts();
            return list;

        case "get":
            const contact = await getContactById(id);
            return contact;

        case "add":
            const newContact = await addContact(data);
            return newContact;

        case "remove":
            const deletedContact = await removeContact(id);
            return deletedContact;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(options).then(console.log);
// invokeAction({ action: "remove", id: "Z5sbDlS7pCzNsnAHLtDJd" }).then(
//     console.log
// );

// invokeAction({
//     action: "remove",
//     id: "w7s5zudvo6WC1M83Y9Rui",
// }).then(console.log);
