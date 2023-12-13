import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("contacts", "contacts.json");

const updateContacts = conmtacts => fs.writeFile(contactsPath, JSON.stringify(conmtacts, null, 2));

export const getAllContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

export const listContacts = async () => {
    const contacts = await getAllContacts();
    return contacts;
}

export const getContactById = async (id) => {
    const contacts = await getAllContacts();
    const result = contacts.find(item => item.id === id);
    return result || null;
}

export const deleteById = async (id) => {
    const contacts = await getAllContacts();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
}

export const addContact = async (data) => {
    const contacts = await getAllContacts();
    const newContacts = {
        id: nanoid(),
        ...data,
    };
    contacts.push(newContacts);
    await updateContacts(contacts);
    return newContacts;
}

console.log(listContacts())