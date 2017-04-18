var mongoose= require("mongoose");

var suggtopicSchema = new mongoose.Schema({
	topicname:{
		type:String,
		required:true
	},
	technology:{
		type:String,
		required:true
	},
	description:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	department:{
		type:String,
		required:true
	},
	location:{
		type:String,
		required:true
	}
})

module.exports=mongoose.model('suggtopics',suggtopicSchema);
