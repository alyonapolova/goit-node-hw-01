const fs = require("node:fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const readFileDb = async () => {
  const content = await fs.readFile(contactsPath);
  const entries = JSON.parse(content.toString());
  return entries;
};
const writeFileDb = async (db) => {
  const content = JSON.stringify(db, null, 2);
  await fs.writeFile(contactsPath, content);
};

async function listContacts() {
  const list = await readFileDb();
  console.log("list", list);
  return list;
}

async function getContactById(contactId) {
  const list = await readFileDb();
  const result = list.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(contactId) {
  const list = await readFileDb();
  const index = list.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = list.splice(index, 1);
  await writeFileDb(list);
  return result;
}

async function addContact(id, name, email, phone) {
  const list = await readFileDb();
  const newContact = { id: nanoid(), name, email, phone };
  list.push(newContact);
  await writeFileDb(list);
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
