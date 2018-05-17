const mongoose = require("mongoose");
const connectionstring = require("./connectionstring.js")

// remote db connection settings. For security, connectionString should be in a separate file not committed to git
mongoose.connect(connectionstring.x);

const conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));

const mySchema = mongoose.Schema({
 id: { type: Number, required: true },
 category: String,
 make: String,
 model: String,
 serialnumber: String
}); 

module.exports = mongoose.model('Gear', mySchema);