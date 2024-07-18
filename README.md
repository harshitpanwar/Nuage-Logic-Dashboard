# Setting up the project locally

The projects consists of two directories 
**Client and Server**. <br/>

## Prerequisites <br/>

Make sure the following are installed in the local system

- Node.js
- npm

## Running the project locally

Before running the backend and frontend make sure to add the .env files variables in both the projects. <br/>
For the frontend define: 
```
VITE_GRAPHQL_API_URL=<<BACKEND URL>>
```
For the backend define: 

```
MONGO_URI=<<MONGO DB URL>>
PORT=<<PORT to run the backend on>>
JWT_SECRET=<<Define your JWT secret>>
ADMIN_EMAIL=<<give the admin email>>
ADMIN_PASSWORD=adminpassword=<<give thhe admin password>>
```

### Starting the Frontend

```
cd client
npm i
npm run dev
```

### Starting the Backend

```
cd server
npm i
node index.js
```

# Deploying the project to vercel

The project has already been included with the required vercel.json files. <br/>
The user is required to:
1. push the code to their github/gitlab account.
2. Create a vercel account and connect the github/gitlab account with it.
3. Go the Add new button on the dashboard and select project.![image](https://github.com/user-attachments/assets/1d4d2126-bdea-45a7-a1ff-ea6e626e45cf)
4. Select the repository, in which they have uploaded the code, and click on import.![image](https://github.com/user-attachments/assets/8fd8b007-2220-4b76-9c3b-b69a7964d631)

5. Configure the project, click on edit and change the root directory from ./ to server folder. And also add your environment variables including the ADMIN_EMAIL and ADMIN_PASSWORD <br/>![image](https://github.com/user-attachments/assets/5788760d-472c-4a69-b16e-bcc7877fb290)
6. Click on deploy and the backend should be deployed.
7. Once the deployment is complete, you will receive a URL for the backend. ![image](https://github.com/user-attachments/assets/ec79ab9a-3867-4b09-85d7-48797117d61d)
8. Copy the URL and keep it with you for further steps.
9. Repeat the same process again, but this time for the frontend and in the folder selection instead of selecting server, select client. Add the env variables and in your **VITE_GRAPHQL_API_URL** paste the backend url that you received after deploying the backend to vercel.
10. Click on deploy.
11. After deployment is done you'll receive a URL, this will be your frontend URL from where you can access the web application.
    




