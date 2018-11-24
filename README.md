# Introduction

Repo includes both backend and frontend code. Backend is made with nodejs 8.13.0, express, Jest for testing and includes middleware functions for role checking. 

#Folder structure

1. build: Compiled files for frontend. More info in **Installation**. 
2. functions: Main API folder
    1. config: Stores the endpoints configuration
    2. middleware: Includes the pre made server responses for API and some helper functions like find, verify and hasAccess
        1. find: Generic logic to find/filter information inside the legacy endpoints
        2. verify: First check for required headers
        3. hasAccess: Role control
    3. roles: Main role configuration
    4. routes: Includes all the routes for the API (User and Policies)
    5. test: Test files to be executed by Jest
3. public: Main html file to be executed by frontend
4. src: React source files

#API

##Intro

API can be installed by either npm or yarn. Package has specific version codes and has tested with node 8.13.0

##Installation and Execution

1. Execute npm i or yarn inside functions folder
2. Execute yarn start or npm start

##Examples

User by ID

```
curl -X GET \
  http://localhost:3005/v1/user/id/a0ece5db-cd14-4f21-812f-966633e7be86 \
  -H 'Postman-Token: 1d972e80-109c-4872-8f3d-9669c4f15006' \
  -H 'cache-control: no-cache' \
  -H 'x-user: Britney'
  
```

User by Name

```

curl -X GET \
  http://localhost:3005/v1/user/name/Barnett \
  -H 'Postman-Token: c81dca87-286a-460c-94ab-60713e6dba84' \
  -H 'cache-control: no-cache' \
  -H 'x-user: Britney'

```

User Policies

```

curl -X GET \
  http://localhost:3005/v1/user/name/Britney/policies \
  -H 'Postman-Token: f0f59166-9c19-4a2c-ad4e-378fb4f8b148' \
  -H 'cache-control: no-cache' \
  -H 'x-user: Britney'

```

User by Policy

```

curl -X GET \
  http://localhost:3005/v1/user/name/none/policies \
  -H 'Postman-Token: 4c39101c-6a9f-4dff-9943-1a7ff14072a0' \
  -H 'cache-control: no-cache' \
  -H 'x-user: Britney'

```

Not Authorized Example

```

curl -X GET \
  http://localhost:3005/v1/policy/4f744ead-f4ff-498e-9d5f-fd6819cd4c77/user \
  -H 'Postman-Token: b4aa8b35-f8b9-4c5e-96b2-93f99a387e59' \
  -H 'cache-control: no-cache' \
  -H 'x-user: Barnett'

```

##Testing

Jest unit testing is included in repo. Just execute 'npm test' or 'yarn jest' from inside the functions folder. 

#Frontend

##Intro

Frontend has been done with React, Webpack, and Material UI. Material UI was chosen in order to provide a quick UI layour consistent with Material Design. Create-React-App was used for the app skeleton with a webpack blackbox setup. 

##Installation and Execution

1. Execute npm i or yarn inside root folder (altran-app)
2. Execute yarn start or npm start
3. Wait for the code to compile and open the browser or go into http://localhost:3000/ 

##Features

Since the JSON consist of more than 1300 records a pagination approach was used, in order to minimize the DOM size and improve performance. 

Table can be sorted (Initially sorted by name asc) and search within records. The fields that will be searched are: name, age, weight, height, hair color and professions. 

When clicking on each table record a modal will appear. Two collapsible sections (Friends and Professions) will be available there that are not fitted in the table. 

##Testing

Jest unit testing is included in repo. Just execute 'npm test' or 'yarn jest' from inside the root folder. 
