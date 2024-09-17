const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());
app.use(express.json());

let formsData = [];
// https://mqv67bn4.forms.app/formsdata
app.post("/webhook", async (req, res) => {
  try {
    console.log("Received data:", req.body); // Log the entire payload
    const { formName, formActive } = req.body;

    // Check if fields exist in the incoming payload
    if (!formName || !formActive) {
      console.error("Missing required fields: formName or formActive");
      return res.status(400).json({ error: "Missing required fields" });
    }
    // Log stored data
    const newForm = { formName, formActive, createdAt: new Date() };
    formsData.push(newForm);
    console.log("Stored data:", formsData);
    // send data
    // const formData = {
    //   name: formName,
    //   active: formActive,
    // };
    // await axios.post("https://api.123formbuilder.com/v2/forms", formData, {
    //   headers: {
    //     "Authorization": "my apikey",
    //     "Content-Type": "application/json",
    //   },
    // });
    // Mock API response instead of sending data to 123FormBuilder

    // Mock API response instead of sending data to 123FormBuilder
    const mockApiResponse = {
      success: true,
      message: "Mock: Form successfully created in 123FormBuilder",
    };

    console.log(mockApiResponse);
    res.status(200).json({ message: "Form received and processed" });
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/webhook", (req, res) => {
  res.send("Webhook route is working!");
});
app.get("/forms", (req, res) => {
  res.json(formsData);
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
