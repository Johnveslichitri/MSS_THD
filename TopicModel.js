var mongoose= require("mongoose");

var topicSchema = new mongoose.Schema({
	userid:{
		type:String,
		required:true
	},
	topicname:{
		type:String,
		required:true
	},
	technology:{
		type:String,
		required:true
	},
	content:{
		type:String,
		required:true
	},
	links:{
		type:String,
		required:true
	},
	authorname:{
		type:String,
		required:true
	}
})

module.exports=mongoose.model('topics',topicSchema);
