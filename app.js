// include all package

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

// public data folder is open for fetch 
// N:B when you link css and image from you have to imagin that public dir is root
// example: if you want to link styles.css then you have to put path = css/style.css not include public dir
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    // console.log(firstName,lastName,email);//JUST FOR CHAKING USER DATA
    // create a object for pass mailchimp server 
    var data = {
        members:[
            {   
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }   
            }
        ]
    };

    // javascript object to json transform
    var jsonData = JSON.stringify(data);


    //call api using request function
    // mailchimp api key
    // 491405605dbc966216a94ab6ec013fd0-us17
    // Audiences id
    // 25d21a1675
    var option = {
        url :"https://us17.api.mailchimp.com/3.0/lists/25d21a1675",
        method:"POST",
        headers : {
            // "Authorization" : "CodeWithSouma 491405605dbc966216a94ab6ec013fd0-us17"
        },
        body:jsonData
    }
    request(option,function(error,response, body){
        if(error||response.statusCode!==200){
            res.send("Unsuccesfull.");
        }
        else if(response.statusCode === 200){
            res.send("succesfull.");
        }

    });
});

app.listen(3000,function(){
    console.log("Server is running at port 3000.");
});

