const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactsList = await listContacts();
      return console.log(contactsList);

    case "get":
      const getContact = await getContactById(id);
      return console.log(getContact);

    case "add":
      const addNewContact = await addContact(id, name, email, phone);
      return console.log(addNewContact);

    case "remove":
      const deletedContact = await removeContact(id);
      return console.log(deletedContact);

    default:
      return console.log("Unknown action");
  }
};

invokeAction(argv);
