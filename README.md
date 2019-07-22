# .Net Core API and React Client

.Net Core based REST Api. Allows CRUD operations to store, retrieve, edit and delete posts. Uses MongoDB for database.
Also included a basic React Client to consume the CRUD Api.

## Getting Started

Clone repository to a directory on local environment

### Prerequisites

What things you need to install the software and how to install them

```
For API:
.Net Core 2.2 SDK
Visual Studio Code
MongoDB

For React Client
Node 10
```

### Installing

To get the API running, configure where the instance of MongoDB will be runnning in blog-api\appsettings.json
For example:

```
"ConnectionString": "mongodb://localhost:27017",
```
Then just start Visual Studio Code at the blog-api level. If a restore option is displayed make sure to click it, if not run dotnet restore in the integrated terminal.
Once restore is completed restart vs code, then go to Debug -> Start Without Debugging and the APi should run successfully. 

You can test using the Blog Api.postman_collection.json which contains all of the implemented CRUD operations. 
Make sure to set the collection variable host to the value your API is using to serve https responses, by default localhost:5001

To get the React Client to run, make sure you have node installed.
Update the host of your API instance in react-client\src\App.js
```
const host = 'https://localhost:5001/api/post';
```
Go to the root of the REACT-CLIENT directory and run
```
npm install
npm start
```
You should be able to see the client in the browser now

## Built With

* dotnet new webapi
* create-react-app

