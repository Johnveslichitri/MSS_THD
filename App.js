var express= require("express");
var app=express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());         
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 8007);
console.log("Application is Running");
console.log("Server is running at:8007");

var dbAuthor=require('./AuthorModel.js');
var dbTopic=require('./TopicModel.js');
var dbsuggTopic=require('./SuggTopicModel.js');
var dbNewTech=require('./NewTechModel.js');
var dbAdmin=require('./AdminModel.js');

var mongoose= require("mongoose");
mongoose.connect('mongodb://localhost:27017/mss');
/* mongoose.connect('mongodb://mssusr7:miracle7@ds143330.mlab.com:43330/testdb77',function(err){
	console.log(err);
}); */


mongoose.connection.on('connected',function(){
	console.log("Mongo database connected");
});

app.use(express.static(__dirname+"/public")); /* to include external add on styles like css ,bootstrap */

/*Angular routes to the backend*/
app.get('/mySuggest',function(req,res){
	res.sendFile(__dirname+'/public/MySuggestions.html');
});
app.get('/AdminTopics',function(req,res){
	res.sendFile(__dirname+'/public/AllTopicsAdmin.html');
});
app.get('/suggtopicviewall',function(req,res){
	res.sendFile(__dirname+'/public/SuggestionsAdmin.html');
});
app.get('/AuthorTopic',function(req,res){
	res.sendFile(__dirname+'/public/MyTopics.html');
});
app.get('/authorEnter',function(req,res){
	res.sendFile(__dirname+'/public/AuthorIndex.html');
});
app.get('/registerauthor',function(req,res){
	res.sendFile(__dirname+'/public/AuthorRegistration1.html');
});

app.get('/adminlogin',function(req,res){
	res.sendFile(__dirname+'/public/AdminLogin.html');
});
app.get('/adminview',function(req,res){
	res.sendFile(__dirname+'/public/AddTechAdmin.html');
});
app.get('/topicview',function(req,res){
	res.sendFile(__dirname+'/public/ViewTopic.html');
});
app.get('/suggtopicview',function(req,res){
	res.sendFile(__dirname+'/public/ViewSuggTopic.html');
});
app.get('/searchtopics',function(req,res){
	res.sendFile(__dirname+'/public/TopicsAllRetrieve&SearchTopics.html');
});
app.get('/suggesttopic',function(req,res){
	res.sendFile(__dirname+'/public/SuggestTopicsRegister.html');
});
app.get('/home',function(req,res){
	res.sendFile(__dirname+'/public/index.html');
});
app.get('/loginregister',function(req,res){
	res.sendFile(__dirname+'/public/loginregister.html');
});
app.get('/msstech',function(req,res){
	res.sendFile(__dirname+'/public/msstech.html');
});
app.get('/suggtopicview',function(req,res){
	res.sendFile(__dirname+'/public/ViewSuggTopic.html');
});
app.get('/changepassword',function(req,res){
	res.sendFile(__dirname+'/public/AuthorChangePassword.html');
});
/* 
app.get('/nglogin',function(req,res){
	res.sendFile(__dirname+'/public/AngularLogin.html');
});

app.get('/ngregister',function(req,res){
	res.sendFile(__dirname+'/public/AngularRegister.html');
});

app.get('/ngchangepwd',function(req,res){
	res.sendFile(__dirname+'/public/AngularUpdatepwd.html');
});

app.get('/ngdelete',function(req,res){
	res.sendFile(__dirname+'/public/AngularDeleteByID.html');
});
 app.get('/ngretrieveall',function(req,res){
	res.sendFile(__dirname+'/public/AngularRetrieveAll.html');
});  */


/* Creating author */
var registerAuthor=function(jsonData,callback){/* here json will be passed and result will be in callback and then callback will send the response back to function data where it is called*/
 dbAuthor.create(jsonData,function(err,data){
  callback(err,data);
 });
};

app.post('/registerAuthor',function(req,res){
	var jsonData={
  "userid":req.body.userid,
  "password":req.body.password,
  "firstname":req.body.firstname,
  "lastname":req.body.lastname,
  "phone":req.body.phone,
  "mailid":req.body.mailid,
  "location":req.body.location,
  "technology":req.body.technology,
  "department":req.body.department
 };
 
 var json={
  "userid":req.body.userid
 };
 console.log(JSON.stringify(json));
 dbAuthor.find(json,function(err,data){
	 if(data.length){
		 console.log("UserId exists");
 res.send("UserId exists");

 }
else{
	 
	 registerAuthor(jsonData,function(err,data){
  if(err){
	  console.log("error:"+err)
	  var err={"error":"failed"}
	  res.send(err);
  }
     else{
   console.log("data:"+data)
   res.send("Success");
	 };
 });
};
});
});


/*Login Author*/

app.post('/loginAuthor',function(req,res){
	
 var jsonId={
  "userid":req.body.userid
 };
 console.log(JSON.stringify("data is:"+jsonId));
 	 dbAuthor.findOne(jsonId,function(err,data){
		 console.log(JSON.stringify("data is:"+data));
		 if(err){
			 console.log("some error occured");
			 res.send("some error occured");
		 }else if(data==null){
				console.log("Please check the details entered");
			 res.send("Please check the details entered") ;
			 }
		 else if(data.userid==req.body.userid && data.password==req.body.password){
			 console.log("Login Successful");
			 res.send(data);
		 }else{
			 console.log("Failed to login");
			 res.send("Failed to login")
		 }
	 })
	 });

/*var updateData=function(jsonId,json,callback){
	console.log(JSON.stringify("InnerLoop"+jsonId));
	console.log(JSON.stringify("InnerLoop"+json));
 dbTopic.findOneAndUpdate(jsonId,json, function(err,data){
  callback(err,data);
 });
};*/
/*Add topic functions*/

var createTopic=function(json,callback){
console.log("InnerLoopCreate"+JSON.stringify(json));
 dbTopic.create(json,function(err,data){
  callback(err,data);
 });
};
/* Creating Topics */
app.post('/addTopic',function(req,res){
	var json={
						"userid":req.body.userid,
						"topicname":req.body.topicname,
						"technology":req.body.technology,
						"content":req.body.content,
						"links":req.body.links,
						"authorname":req.body.authorname
						};
	createTopic(json,function(err,data){
						if(err){
							var err={"error":"failed"}
							res.send(err);
						}else{
							res.send(data);
						};
						
			});
});

/*Retrieve All Topics*/
var retrieveallData=function(callback){
 dbTopic.find({},function(err,data){
  callback(err,data);
 });
};
app.get('/retrievAllTopics',function(req,res){
 retrieveallData(function(err,data){
		 if (data.length){
			 console.log("data"+JSON.stringify(data));
			 res.send(data);
		 }else{
			 var err={"error":"failed"};
			 res.send(err);
		 }
	 
 })
}); 
/*Retrieve topics for particular user based on userid*/
var retrieveonetopics=function(json, callback){
 dbTopic.find(json,function(err,data){
  callback(err,data);
 });
};
app.post('/retrieveIdTopics',function(req,res){
	var json={
		"userid":req.body.userid
	};
	console.log("json value is"+JSON.stringify(json));
 retrieveonetopics(json, function(err,data){
		 if (err){
			  var err={"error":"failed"};
			  console.log("error block");
			 res.send(err);
			 
		 }else{
		console.log("Data block");
			res.send(data);
		 }
	 
 })
});
/*Retrieve particular topic of user based on topicid*/
var retrievetopic=function(json, callback){
 dbTopic.find(json,function(err,data){
  callback(err,data);
 });
};
app.post('/retrieveParticularTopic',function(req,res){
	var json={
		"_id":req.body._id
	};
	console.log("json value is"+JSON.stringify(json));
 retrievetopic(json, function(err,data){
		 if (err){
			 var err={"error":"failed"};
			 res.send(err);
		 }else{
			  res.send(data);
		 }
	 
 })
});

/*Search Topics based on condition*/
var retrieveData=function(json,json1,json2,callback){
	//console.log("InnerLoop"+JSON.stringify(json));
 dbTopic.find({$or : [ json,json1,json2,{ $and : [ json1, json2 ] },{ $and : [ json, json2 ] },{ $and : [ json, json1 ] },{ $and : [ json, json1,json2 ] }]},function(err,data){
  callback(err,data);
 });
};
app.post('/retrieveTopics',function(req,res){
	 var json={
		 "topicname":req.body.topicname
	 };
	var json1={	 
	     "authorname":req.body.authorname
	 };
	var json2={	  
	 	 "technology":req.body.technology
	 };
	/*  console.log("Inner"+JSON.stringify(json));
	 console.log("Inner"+JSON.stringify(json1));
	 console.log("Inner"+JSON.stringify(json2)); */
 retrieveData(json,json1,json2, function(err,data){
		 if (err){
			var err={"error":"failed"};
			  res.json(err);
		 }else{
			
			 res.json(data);
		 };
	 
 })
}); 

/*Suggested topic adding*/
var suggTopic=function(json,callback){/* here json will be passed and result will be in callback and then callback will send the response back to function data where it is called*/
 console.log("Innerloop"+JSON.stringify(json));
 dbsuggTopic.create(json,function(err,data){ 
  callback(err,data);
 });
};

app.post('/suggTopicAdd',function(req,res){
	var json={
  "topicname":req.body.topicname,
  "technology":req.body.technology,
  "description":req.body.description,
  "email":req.body.email,
  "department":req.body.department,
  "location":req.body.location
 };
 console.log(JSON.stringify(json));
 suggTopic(json,function(err,data){
  if(err){
	var err={"error":"failed"};  
  res.send(err);
  }else{
	  console.log("Response"+data);
   res.send(data);
  }
 });
}); 
/*Retrieve All Suggested added By Users*/
var retrieveAllSugg=function(callback){
 dbsuggTopic.find({},function(err,data){
  callback(err,data);
 });
};
app.get('/retrievAllSugg',function(req,res){
 retrieveAllSugg(function(err,data){
		 if (err){
			 var err={"error":"failed"};
			 res.send(err);
			 
		 }else{
			 res.send(data);
		 }
	 
 })
}); 
/*Retrieve sugg topics based on technology*/
var retrievesuggtopics=function(json, callback){
 dbsuggTopic.find(json,function(err,data){
  callback(err,data);
 });
};
app.post('/retrievesuggTechTopics',function(req,res){
	var json={
		"technology":req.body.technology
	};
	console.log("json value is"+JSON.stringify(json));
 retrievesuggtopics(json, function(err,data){
		 if (err){
			 var err={"error":"failed"};
			 res.send(err);
		 }else{
			 res.json(data);
		 }
	 
 })
});
/*Change Password*/
var changePass=function(json,jsonData,callback){
 dbAuthor.findOneAndUpdate(json,jsonData, function(err,data){
  callback(err,data);
 });
};
app.post('/changePassword',function(req,res){
	var json={
			"userid":req.body.userid
            };
console.log("IdJson"+json);

	 dbAuthor.findOne(json,function(err,data){
		 console.log(JSON.stringify(data));
      if(data.userid==req.body.userid && data.password==req.body.password){	
			var jsonData={
			"userid":data.userid,
			"password":req.body.newpwd,
			"firstname":data.firstname,
			"lastname":data.lastname,
			"phone":data.phone,
			"mailid":data.mailid,
			"location":data.location,
			"technology":data.technology,
			"department":data.department
				};
					var json={
					"userid":req.body.userid
					};
					changePass(json,jsonData ,function(err,data){
					if(err){
						var err={"error":"failed"};
						res.send(err);
					}else{
						res.send(data);
					};
					
					
					})
	  }else{
		  res.send("Entered userid or password are incorrect")
	  };	
 });
});

/*Admin login*/

app.post('/loginAdmin',function(req,res){
	
 var jsonId={
  "userid":req.body.userid
 };
 console.log(JSON.stringify("data is:"+jsonId));
 	 dbAdmin.findOne(jsonId,function(err,data){
		 console.log(JSON.stringify("data is:"+data));
		 if(err){
			 res.send("some error occured");
		 }else{
			 if(data==null){
				
			 res.send("Please check the details entered") ;
			 }
		 else if(data.userid==req.body.userid && data.password==req.body.password){
			 console.log("Login Successful");
			 res.send(data);
		 }else{
			 console.log("Failed to login");
			 res.send("Failed to login")
		 }
		 }
	 });
	 
});

/*NewTech Add*/
var registerTech=function(jsonData,callback){/* here json will be passed and result will be in callback and then callback will send the response back to function data where it is called*/
 dbNewTech.create(jsonData,function(err,data){
  callback(err,data);
 });
};

app.post('/newTechAdd',function(req,res){
	var jsonData={
  "newtech":req.body.newtech,
  "description":req.body.description
 }; 
 dbNewTech.find(jsonData,function(err,data){
	 if(data.length){
		 console.log("Already exists");
 res.send("Already exists");
	 }
 else{
	 registerTech(jsonData,function(err,data){
  if(err){
	  console.log("error:"+err)
  var err={"error":"failed"};
  res.send(err);
  }else{
   console.log("data:"+data)
   res.send(data);
  };
	
});
 };
});
});

/*Delete Topics by Admin*/

var deleteTopic=function(json,callback){
 dbTopic.remove(json,function(err,data){
  callback(err,data);
 });
};
app.post('/deleteTopic',function(req,res){
   var json={
  "_id":req.body._id
 };
 deleteTopic(json,function(err,data){
	 if(err){
		  var err={"error":"failed"};
		 res.send(err);
	 }else{
		 var data={"result":"success"};
		 res.send(data);
	 };
  
  
		 
 })
});
/*Retrieve All Technologies added By Admin*/
var retrieveAllTech=function(callback){
 dbNewTech.find({},function(err,data){
  callback(err,data);
 });
};
app.get('/retrievAllTech',function(req,res){
 retrieveAllTech(function(err,data){
		 if (err){
			 var err={"error":"failed"};
			 res.send(err);
			 
		 }else{
			 res.send(data);
		 }
	 
 })
}); 
/*Retrieve particular Suggested topic of user based on suggtopicid*/
var retrievesuggtopic=function(json, callback){
 dbsuggTopic.find(json,function(err,data){
  callback(err,data);
 });
};
app.post('/retrieveParticularSuggTopic',function(req,res){
	var json={
		"_id":req.body._id
	};
	console.log("json value is"+JSON.stringify(json));
 retrievesuggtopic(json, function(err,data){
		 if (err){
			 var err={"error":"failed"};
			 res.send(err);
		 }else{
			  res.send(data);
		 }
	 
 })
});

/*Delete Suggested Topics by topic id Admin*/

var deleteSuggTopic=function(json,callback){
 dbsuggTopic.remove(json,function(err,data){
  callback(err,data);
 });
};
app.post('/deleteSuggTopic',function(req,res){
   var json={
  "_id":req.body._id
 };
 deleteSuggTopic(json,function(err,data){
	 if(err){
		  var err={"error":"failed"};
		 res.send(err);
	 }else{
		 var data={"result":"success"};
		 res.send(data);
	 };
  
  
		 
 })
});
/*app.post('/addTopic',function(req,res){
	
 var jsonId={
  "userid":req.body.userid
 };
 	 dbTopic.find(jsonId,function(err,data){
		 console.log(JSON.stringify("data is:"+data));
		 if(data.length){
			 console.log("Existed Data");
			 var jsonId={
						"userid":req.body.userid
						};
			 console.log(JSON.stringify(jsonId));
			 var json={
						"userid":req.body.userid,
						"topicname":req.body.topicname,
						"technology":req.body.technology,
						"content":req.body.content,
						"links":req.body.links,
						"usrsuggtopics":req.body.usrsuggtopics
						};
			 console.log(JSON.stringify(json));
			 updateData(jsonId,json ,function(err,data){
						if(err)
						res.send(err);
						res.send("Updated successfully"+data);
						})
		}else{
			console.log("New Data");
			var json={
						"userid":req.body.userid,
						"topicname":req.body.topicname,
						"technology":req.body.technology,
						"content":req.body.content,
						"links":req.body.links,
						"usrsuggtopics":req.body.usrsuggtopics
						};
			  createTopic(json,function(err,data){
						if(err)
						console.log("error:"+err)
						console.log("data:"+data)
						res.send("Created successfully :"+data);
			});
		 };
 });
}); */
