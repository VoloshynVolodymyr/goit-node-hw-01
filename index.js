const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  } = require('./contacts');
  const {program} = require("commander");

  const invokeAction = async({action, id, name, email, phone}) => {
    switch(action) {
        case "list": 
            const allContacts = await listContacts();
            console.table(allContacts);
            break;
        case "add":
            const newContact = await addContact({name, email, phone});
            console.log(newContact);
            break;
        case "get":
            const contact = await getContactById(id);
            console.log(contact);
            break;
        case "remove":
            const contactRemove = await removeContact(id);
            console.log(contactRemove);
            break;
        default: 
        console.warn("\x1B[31m Unknown action type!");
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
// invokeAction({action: "add", name:"ss", email:"dd@jj.ss", phone:"4356767"})