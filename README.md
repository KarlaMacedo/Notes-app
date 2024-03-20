# Notes-app

## Instructions

- First fork the project and make a local clone.

- To install all the local dependencies of the project, run the command:

    ```
    npm install
    ```

- Then, once docker is installed on your computer and you have logged in, to create the images, run the commands:

    ```
    docker build -t notes-app -f Dockerfile.node .
    ```
    ```
    docker build -t mongodb-image -f Dockerfile.mongo .
    ```

- Subsequently, to lift the containers, run the commands:
    ```
    docker run -d --name notes-app-container -p 3001:3000 notes-app
    ```
    ```
    docker run -d --name mongodb-container -p 27017:27017 mongodb-image
    ```
- Finally, open the url in the web browser to use the app:

    http://localhost:3001/