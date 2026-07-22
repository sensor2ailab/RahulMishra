const mongoose =
require("mongoose");

const ContactInfoSchema =
new mongoose.Schema({

section:String,

name:String,

department:String,

institute:String,

location:String,

primaryEmail:String,

secondaryEmail:String,

skype:String,

});

module.exports =
mongoose.model(
"ContactInfo",
ContactInfoSchema
);