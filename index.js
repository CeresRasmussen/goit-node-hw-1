const contacts = require("./contacts");
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
      const allContacts = await contacts.listContacts();
      return console.log("Here are all your contact"), console.table(allContacts);
    case "get":
      const contactById = await contacts.getContactById(id);
      if (!contactById) {
        return console.log(`Contacts with id:${id} dose't exist`);
      }
      return console.log("Here is the contact you were looking for:"), console.table(contactById);
    case "remove":
      const removedContact = await contacts.removeContact(id);
      if (!removedContact) {
        return console.log(`Contacts with id:${id} dose't exist`);
      }
      return (
        console.log(removedContact.name, "is removed from contacts"), console.table(removedContact)
      );
    case "add":
      const addedContact = await contacts.addContact({ name, email, phone });
      return console.log(addedContact.name, "is added to contacts"), console.table(addedContact);
    default:
      return console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
