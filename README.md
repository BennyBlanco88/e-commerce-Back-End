# Project Title

e-commerce-Back-End

## Description

This project was developed using starter code to create a back-end application for an e-commerce site that uses the command line interface (CLI) and object-relational mapping for various methods of data manipulation, storage, and retrieval when using HTTP methods with a RESTUL API.

The schema.sql file in the db folder was run in MySQL Workbench to create the ecommerce_db and establish a connection with Insomnia Core through the command line interface (CLI). Once the database is created, the specific NPM packages are installed using npm i. MySQL2 and Sequelize packages to connect an Express.js API to a MySQL database, which utilizes the dotenv package to store sensitive environmental variables such as: username, password, and database name. npm run seed command migrates the data to MYSQL. A table is created out of the four objects located in the models folder: Product, Category, Tag, ProductTag.

With the node.js packages installed and database seeded without error, run NPM Start to start the server and connect to local host http://localhost:3001/. Then, an API GET request is performed for each route displaying in JSON format. All API POST, PUT, and DELETE routes are tested in Insomnia Core. I am able to successfully create, update, and delete data in my database.


### Installing

From the command line, run:

npm init

npm install mysql2

npm install sequelize

npm install express

npm install dotenv

npm run start

### Executing program

https://drive.google.com/file/d/1C0z45Ryv5dqaFub--ZyWWqmQ5nPMLbrW/view

## Help

ben.langs@yahoo.com
https://github.com/BennyBlanco88/e-commerce-Back-End
```

## Authors

B-DOG Designs

THOSCALLE-https://www.youtube.com/watch?v=hGVJLTGqPgk



## License

This project is licensed under the B-DOG Designs License - see the LICENSE.md file for details

## Acknowledgments


THOSCALLE-https://www.youtube.com/watch?v=hGVJLTGqPgk
