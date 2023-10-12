# Overview
This website tracks and manages web applications .

The frontend can be accessed by http://localhost:3200/

The backend API can be accessed by http://localhost:3000/api/ (health endpoint)

The list of product can be found on http://localhost:3000/api/product/

And finally, its SWAGGER documentation can be found on http://localhost:3000/api/api-docs/

Authentication is beyond the scope of this project, so all the endpoints can be accessed without login.
However, if you want to access backend admin page (http://localhost:3000/admin/), you can use "root" as username and "pass" as password.


# How to launch the application
1. This application uses docker-compose to run. If you don't have the compose script, please follow this documentation.
https://docs.docker.com/compose/install/linux/

2. After installing docker-compose, please run following commands at root directory.

        docker-compose build
        docker-compose up

Note that launching frontnend website may take few minutes this way.
Please wait until following message comes up in the console.
![image](https://github.com/nami773/Nanami-Momi-ecc-dssb-IS24-code-challenge-reqTBD/assets/128548019/974f025f-2bef-4875-993a-7225b41db1be)

