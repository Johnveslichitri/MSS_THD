var mongoose= require("mongoose");

var adminSchema = new mongoose.Schema({
	userid:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	}	
	
})

module.exports=mongoose.model('Admins',adminSchema);
