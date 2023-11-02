// as when we use mangoose/mongo db it always gives  a promise for wi=hich we have to make every function as async therefor 
// we have too use try catch in every function by with he help of async handler we dont have to do that as async handler automaticall
// handle the error by sending it to the errorhandler middleware

const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc Get all contacts
// @route GET/api/contacts
// @access private

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
})

// @desc create new contact
// @route POST/api/contacts
// @access private


// whenever we have to recieve the data from client to the server we have to use bodyparser as to parse the stream of the data
const createContact = asyncHandler(async (req, res) => {
    console.log("this is the body of the request made: ", req.body);

    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
})


// @desc get contact with id
// @route GET/api/contacts/:id
// @access private

const getContact = asyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
})

// @desc update contact
// @route PUT/api/contacts/:id
// @access private

const updateContact = asyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User dont have permission to update contacts associated with other users");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedContact);
})

// @desc delete contact
// @route DELETE/api/contacts/:id
// @access private

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User dont have permission to delete contacts associated with other users");
    }

    // await contact.remove();
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
});
module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };


