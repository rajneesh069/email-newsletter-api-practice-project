//f3a3d41da4236a1c08c2d2980c75fab8-us11 --> API key
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
    const url = "https://us11.api.mailchimp.com/3.0/lists"
    const options = {
        method: "POST",
        auth: "user:f3a3d41da4236a1c08c2d2980c75fab8-us11"
    }
    const request = https.request(url, options, (response) => {
        if (response.statusCode === 200) {
            response.on("data", (data) => {
                console.log(JSON.parse(data));
            })
            res.send("Done!")
        } else {
            response.on("data", (data) => {
                console.log(JSON.parse(data));
            })
            res.send("Fucked!")
        }
    });

    const postData = {
        name: "Test-Audience",
        permission_reminder: "You've subscribed to our Mailing list through Mailchimp for monthly newsletters.",
        email_type_option: true,
        contact: {
            company: "IIIT Kota",
            address1: "Gayatri Puram Colony Civil Lines",
            city: "Gonda",
            country: "India",
            state: "Uttar Pradesh",
            zip: "271001",
        },
        campaign_defaults: {
            from_name: "Rajneesh Mishra",
            from_email: "rajneesh.mishra9616@gmail.com",
            subject: "Email Newsletter",
            language: "English",

        }
    }
    const stringifiedPostdata = JSON.stringify(postData);
    request.write(stringifiedPostdata);
    request.end();
})

app.listen("3000", () => {
    console.log("Server is up and running!");
})