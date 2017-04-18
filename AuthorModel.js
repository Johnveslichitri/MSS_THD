var mongoose= require("mongoose");

var authorSchema = new mongoose.Schema({
	userid:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	firstname:{
		type:String,
		required:true
	},
	lastname:{
		type:String,
		required:true
	},
	phone:{
		type:String,
		required:true
	},
	mailid:{
		type:String,
		required:true
	},
	location:{
		type:String,
		required:true
	},
	technology:{
		type:String,
		required:true
	},
	department:{
		type:String,
		required:true
	}
	
})

module.exports=mongoose.model('authors',authorSchema);
