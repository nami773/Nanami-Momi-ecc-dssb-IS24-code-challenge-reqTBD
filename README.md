# Overview

This website tracks and manages web applications .

The frontend can be accessed by http://localhost:3200/

The backend API can be accessed by http://localhost:3000/api/ (health endpoint)

The list of product can be found on http://localhost:3000/api/product/

And finally, its SWAGGER documentation can be found on http://localhost:3000/api/api-docs/

Authentication is beyond the scope of this project, so all the endpoints can be accessed without login.
However, if you want to access backend admin page (http://localhost:3000/admin/), you can use "root" as username and "pass" as password.

# How to launch the application

1.  This application uses docker-compose to run. If you don't have the compose script, please follow this documentation.
    https://docs.docker.com/compose/install/linux/

2.  After installing docker-compose, please run following commands at root directory.

        docker-compose build
        docker-compose up

Note that launching frontnend website may take few minutes this way.
Please wait until following message comes up in the console.

![image](https://github.com/nami773/Nanami-Momi-ecc-dssb-IS24-code-challenge-reqTBD/assets/128548019/974f025f-2bef-4875-993a-7225b41db1be)

The sqlite database is pre-populated with data in "backend\backend\sample.json", so there is no further action required.

## Assumptions

After reading the specification, I made some assumptions about the project. I would like to list it here.

1. When creating a new product, leaving assigned developers field empty is allowed.
2. Delete functionality is not required from the UI side.
3. "Call to action button for saving exits", I wasn't very sure about this functionality and took this as "Edit" button.

## Future Work

In this project, I prioritized implementing every functionalities mentioned in the specification.
These are some improvements I'd like to make if I had more time.

1. The UI design
   I would like to make the UI more visually pleasing and include loading overlay for better user experience.
2. Code refactoring
   I would definetely refactor EditModal.js and AddModal.js so there is not code clone.
