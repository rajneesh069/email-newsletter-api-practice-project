//f3a3d41da4236a1c08c2d2980c75fab8-us11 --> API key
//f67eab450d --> Audience ID
const express = require("express");
const app = express();
const _ = require("lodash");
const bodyParser = require("body-parser");
const https = require("node:https");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send(__dirname + "/index.html");
})

app.post("/", (req, res) => {
    console.log(req.body);
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;
    //Code for adding an audience/list on Mailchimp through API
    // const url = "https://us11.api.mailchimp.com/3.0/lists"
    // const options = {
    //     method: "POST",
    //     auth: "user:f3a3d41da4236a1c08c2d2980c75fab8-us11"
    // }
    // const request = https.request(url, options, (response) => {
    //     if (response.statusCode === 200) {
    //         response.on("data", (data) => {
    //             console.log(JSON.parse(data));
    //         })
    //         res.send("Done!")
    //     } else {
    //         response.on("data", (data) => {
    //             console.log(JSON.parse(data));
    //         })
    //         res.send("Fucked!")
    //     }

    //code for adding directly to an already created list
    const url = "https://us11.api.mailchimp.com/3.0/lists/f67eab450d"
    const options = {
        method: "POST",
        auth: "user:f3a3d41da4236a1c08c2d2980c75fab8-us11"
    }
    const request = https.request(url, options, (response) => {
        response.on("data", (data) => {
            console.log(response.statusCode);
        })
        if (response.statusCode === 200) {
            res.redirect("/");
        } else {
            res.send("Fucked!");
        }
    })
    const postData = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fName,
                LNAME: lName,
                EMAIL: email,
            },
        }]


    }
    const jsonData = JSON.stringify(postData);
    request.write(jsonData);
    request.end();
});


app.listen("3000", () => {
    console.log("Server is up and running!");
})