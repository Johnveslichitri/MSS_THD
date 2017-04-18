var mongoose= require("mongoose");

var techSchema = new mongoose.Schema({
	newtech:{
		type:String,
		required:true
	},
	description:{
		type:String,
		required:true
	}
	
})

module.exports=mongoose.model('technologies',techSchema);
