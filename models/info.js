const mongoose = require ('mongoose')
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose
// const bcrypt = require('bcrypt-nodejs');

const infoSchema = new mongoose.Schema({
    email : { type:String,
        required: 'Email can\'t be empty',
        unique:true
    },
    password : { type: String,
        required: 'Password can\'t be empty',
        minlength : [4,'Password must be atleast 4 character long'] },
    technologies : { type : String },
    facilities: { type : String },
    experience: { type : String },
    timeStart: { type : Date },
    timeEnd : { type : Date },
    url : { type : String },
    number: { type : String },
    role : { type : String },
})

infoSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');


// infoSchema.pre('save', function(next) {
//     // Ensure password is new or modified before applying encryption
//     if (!this.isModified('password'))
//       return next();
  
//     // Apply encryption
//     bcrypt.hash(this.password, null, null, (err, hash) => {
//       if (err) return next(err); // Ensure no errors
//       this.password = hash; // Apply encryption to password
//       next(); // Exit middleware
//     });
//   });
  
  // Methods to compare password to encrypted password upon login
  infoSchema.methods.comparePassword = function(password) {
   
    return password.toString().trim()=== this.password.toString().trim(); // Return comparison of login password to password in database (true or false)
  };

module.exports = mongoose.model('info',infoSchema) //model of type standup