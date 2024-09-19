const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
let formsData = [];
// https://mqv67bn4.forms.app/formsdata
// app.post("/webhook", async (req, res) => {
//   try {
//     console.log("Received Webhooks Data:", req.body.answer.answers);

//     const { answers } = req.body.answer || {}; // Extract answers array from the payload

//     if (!answers) {
//       console.error("No answers found in the payload");
//       return res.status(400).json({ error: "No answers provided" });
//     }

//     // Extract formName and formActive from the answers
//     const formName = answers[0]?.t || "Unnamed Form"; // Text field for form name
//     const formActive = answers[1]?.c?.[0] === "Active"; // Checkbox or toggle for form active

//     // Create a new form object for local storage
//     const newForm = { formName, formActive, createdAt: new Date() };
//     formsData.push(newForm);
//     console.log("Stored Form Data:", formsData);

//     // Send data to 123FormBuilder
//     const formData = {
//       name: formName,
//       active: formActive,
//     };

//     const apiKey = "YOUR_123FORMBUILDER_API_KEY"; // Replace with your 123FormBuilder API key

//     const response = await axios.post("https://api.123formbuilder.com/v2/forms", formData, {
//       headers: {
//         Authorization: `Bearer ${apiKey}`, // Bearer token authorization
//         "Content-Type": "application/json",
//       },
//     });

//     console.log("Form created on 123FormBuilder:", response.data);

//     res.status(200).json({ message: "Form received and sent to 123FormBuilder", formData });
//   } catch (error) {
//     console.error("Error processing webhook:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });


/* if want to locally run then ngrok url give this  a insted locahost:5000 
then webhook add this url because localhost 500o thisnot add so this code   */
app.post("/webhook", async (req, res) => {
  try {
    console.log("Received Webhooks Data:", req.body.answer.answers[1].c);
    // console.log("mydatawww", req.body.answer.answers[0].t);

    const { answers } = req.body.answer || {}; // Extract answers array from the payload

    if (!answers) {
      console.error("No answers found in the payload");
      return res.status(400).json({ error: "No answers provided" });
    }

    // Extract and map fields for clarity (assuming the first answer is form name and the second is form active)
    const formName = answers[0]?.t || "Unnamed Form";
    const formActive = answers[1]?.c?.[0] === "active"; // Assuming 'c' contains an array and the first item is "Active"

    // Create a new form object
    const newForm = { formName, formActive, createdAt: new Date() };

    // Log and store the new form data
    formsData.push(newForm);
    console.log("Stored Form Data:", formsData);

    res.status(200).json({ message: "Form received and processed" });
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.get("/webhook", (req, res) => {
//   res.send("Webhook route is working!");
// });
app.get("/forms", (req, res) => {
  res.json(formsData);
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
