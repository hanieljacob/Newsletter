const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("Public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    var data = {
        members: [
            {
                email_address: email,
                status:"subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname 
                }                
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us18.api.mailchimp.com/3.0/lists/3f86b86204";
    const options = {
        method:"POST",
        auth:"haniel:77747629f5602d034a340b8e9a720c86-us1"
    }
    const request = https.request(url, options, function(response){
        if(response.statusCode == 200)
            res.sendFile(__dirname + "/success.html");
        else
        res.sendFile(__dirname + "/failure.html");
        response.on("data",function(data){

        });
    });
    request.write(jsonData);
    request.end(); 
});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("Server started at port 3000");
});

// 77747629f5602d034a340b8e9a720c86-us18
// 3f86b86204