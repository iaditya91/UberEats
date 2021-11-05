const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var customerSchema = new Schema({
    Name: {type:String, required:true},
    Email: {type:String, required:true},
    Password: {type:String, required:true},
    DOB : {type:Date},
    Addresses: [{ StreetAddress: String, City: String, State: String, Country:String, ZipCode:Number }],
    About : {type: String},
    NickName : {type : String},
    PhoneNumber : {type : Number},
    FavRes : [Number],
    ProfilePic : {type : String}
},
// {
//     versionKey : false
// }
)

const CustomerModel = mongoose.model('customer',customerSchema);
module.exports = CustomerModel