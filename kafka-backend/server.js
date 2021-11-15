const express = require("express");
// let Customer = require("./models/CustomerModel");
const {mongoDB} = require('./config/keys');
const mongoose = require('mongoose');
const app = express();
// const Customer = require('./models/CustomerModel');

var options = {
  useNewUrlParser : true,
  useUnifiedTopology : true
  // poolSize : 500,
  // bufferMaxEntries : 0
};

mongoose.connect(mongoDB, options, (err,res) =>{
  if(err){
    console.log(err);
    console.log('MongoDB connection failed');
  }
  else{
    console.log('MongoDB Connected');
  }
});

// app.listen(3001, () => console.log("Server Listening on port 3001"));

// mongoose
//   .connect(
//     "mongodb+srv://root:root@cluster0.jgmdd.mongodb.net/splitwise?retryWrites=true&w=majority",
//     {
//       poolSize: 500,
//       useCreateIndex: true,
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => {
//     console.log("Mongo connected........");
//   })
//   .catch((err) => console.log(err));

var connection = new require("./kafka/Connection");

// var updateProfile = require("./services/updateProfile");

// var getInvitesMygroup = require("./services/MyGroup/getInvitesMygroup");
// var getJoinedMygroup = require("./services/MyGroup/getJoinedMygroups");
// var joinGroup = require("./services/MyGroup/joinGroupMygroup");
// var getGroup = require("./services/MyGroup/getGroupsMygroup");
// var leaveGroup = require("./services/MyGroup/leaveGroup");

// var userDefaultCurrency = require("./services/Group/userDetails");
// var groupExpense = require("./services/Group/groupExpense");
// var oweDetails = require("./services/Group/oweDetails");
// var addExpense = require("./services/Group/addExpense");
// var addComment = require("./services/Group/addComment");
// var deleteComment = require("./services/Group/deleteComment");

// var getName = require("./services/CreateGroup/getName");
// var getEmail = require("./services/CreateGroup/getEmail");
// var CreateGroup = require("./services/CreateGroup/create");

// var getIds = require("./services/Dashboard/getIDs");
// var getNames = require("./services/Dashboard/getNames");
// var getOwe = require("./services/Dashboard/getOwe");
// var getTotalGet = require("./services/Dashboard/getTotalGet");
// var getSettlePerson = require("./services/Dashboard/getPerson");
// var settle = require("./services/Dashboard/settle");

// var groupNames = require("./services/RecentActivity/groupNames");
// var activity = require("./services/RecentActivity/recentActivity");

var initOrder = require("./services/CreateOrder/initOrder");
var update = require('./services/user/updateProfile')
var login = require("./services/user/login");
var signup = require("./services/user/signup");
// const { updateCustomer } = require("../backend/controllers/customer");

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  console.log("in handle topic req");
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function (err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      // console.log("payload created")
      // console.log(payloads)
      producer.send(payloads, function (err, data) {
        console.log(data);
      });
      return;
    });
  });
}

// handleTopicRequest("get_profile", getProfile);
// handleTopicRequest("update_profile", updateProfile);

// handleTopicRequest("get_invites", getInvitesMygroup);
// handleTopicRequest("get_joined", getJoinedMygroup);
// handleTopicRequest("join_group", joinGroup);
// handleTopicRequest("get_groups", getGroup);
// handleTopicRequest("leave_group", leaveGroup);

// handleTopicRequest("user_details", userDefaultCurrency);
// handleTopicRequest("group_expense", groupExpense);
// handleTopicRequest("owe_details", oweDetails);
// handleTopicRequest("add_expense", addExpense);
// handleTopicRequest("add_comment", addComment);
// handleTopicRequest("delete_comment", deleteComment);

// handleTopicRequest("get_Name", getName);
// handleTopicRequest("get_email", getEmail);
// handleTopicRequest("create_group", CreateGroup);

// handleTopicRequest("get_ids", getIds);
// handleTopicRequest("get_names", getNames);
// handleTopicRequest("get_owe", getOwe);
// handleTopicRequest("get_totalGet", getTotalGet);
// handleTopicRequest("get_person", getSettlePerson);
// handleTopicRequest("post_settle", settle);

// handleTopicRequest("get_gnames", groupNames);
// handleTopicRequest("get_activity", activity);

handleTopicRequest("login", login);
handleTopicRequest("signup", signup);
handleTopicRequest("update_customer", update);
handleTopicRequest("initOrder", initOrder);

// app.listen(3002, () => {
//     console.log("running on the port 3002");
//   });
//   module.exports = app;
