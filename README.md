# Form Data Handling Application

## Overview

This project is an application that receives form data from forms.app via a webhook and then sends it to 123FormBuilder to create new forms. The application also provides an endpoint to retrieve the stored form data.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Client-Side Setup](#client-side-setup)
- [Local Development with ngrok](#local-development-with-ngrok)


## Installation

1. **Clone the Repository:**

   ```bash
   git clonehttps://github.com/irfanurislam/formsHandle-server.git
   cd formsHandle-server
   ```
2. ** install **
    ```bash
    npm install
    ```
3. ** Run **
   ```bash
   npm start
   ```
### Frontend side
1. Clone the repository:
```bash
 git clone https://github.com/irfanurislam/formsHandle-client.git
```
2. Install dependencies:
```bash
 npm install
 ```
## Usage
To run the project, use the following command:
```bash
npm run dev
```
## Webhook add insted of Localserver 5000

ngrok website and windows-  download  and unzip the folder and ngrok.exe file running after all

**authtoken needed if then website here **
```bash
ngrok authtoken YOUR_AUTH_TOKEN

```

```bash
ngrok http http://localhost:5000

```
## Finally these types show 
```bash
 https://1a0f-103-145-135-228.ngrok-free.app -> http://localhost:5000
```
then this url setup formbuild webhook then locally running 
