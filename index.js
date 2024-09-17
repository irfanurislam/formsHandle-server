const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

let formsData = [];
// https://mqv67bn4.forms.app/formsdata
app.post("/webhook", async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const { formName, formActive } = req.body;
    const newForm = { formName, formActive, createdAt: new Date() };
    console.log(newForm);
    formsData.push(newForm);
    console.log(formsData);

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
    const mockApiResponse = {
      success: true,
      message: "Mock: Form successfully created in 123FormBuilder",
    };

    console.log(mockApiResponse);
    res
      .status(200)
      .json({ message: "Form received and sent to 123FormBuilder" });
  } catch (error) {
    console.error("processing of error webhook", error);
    res.status(500).json({ error: "internel server" });
  }
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
