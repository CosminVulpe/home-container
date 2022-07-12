# Home-container
[![Actions](https://github.com/gothinkster/spring-boot-realworld-example-app/workflows/Java%20CI/badge.svg)](https://github.com/gothinkster/spring-boot-realworld-example-app/actions)
![element ](https://user-images.githubusercontent.com/86559678/178450657-d759d4c3-2560-42a9-a597-ffe79bcff988.jpg)
> ### Home-container is a unique business which offers to the customers shipping container well-organized with kitchen and bathroom to relax near lake.
Home-container was created to demonstrate a fully fledged full-stack application built with Spring boot + React including CRUD operations, authentication, routing, Spring Security, Stripe and more.

## PostgreSql Schema
Using hibernate as a tool for developing the database, the schema looks as follows: 
![home_container@localhost](https://user-images.githubusercontent.com/86559678/178455180-794cee52-3196-4281-8863-c98237b45ff3.png)

## How it works
The backend is still developing using Java Spring Boot with the help of Intellij as favorite editor and for the frontend, Webstorm.

### Making requests to the backend API
The backend and the frontend are connecting though API requests using in the backend the annotation `@CrossOrigin`.
The website is running on `localhost:3000`.

## Getting started
### Backend
Make sure you have [Maven (Windows)](https://www.educba.com/install-maven/) or [Maven (Linux)](https://www.journaldev.com/33588/install-maven-linux-ubuntu) install.
Open the project by right-click the pom.xml and selecting your favorite editor (might take a minute for the dependencies to install).

### Frontend
Make sure you have [NPM (Windows)](https://phoenixnap.com/kb/install-node-js-npm-on-windows) or [NPM (Linux)](https://linuxconfig.org/install-npm-on-linux) install.
Open the project with your favorite editor, make sure you are the right folder where package.json is, write the following command-line in order for the dependencies to install: `npm install`. After, to start the project, use the command-line: `npm start`.

## Security
The application supports verification with JWT Token which is stored locally on local storage.
The secret key is kept in `application.properties`.

## Database
Home-container uses PostgresSql database integrated with the help of Hibernate. 
To connect to the databse locally, please change in the `application.properties` the following fiels: *spring.datasource.url* with your new database name just created,
*spring.datasource.username* with your username and *spring.datasource.password* with your password

## Functionality overview

### General functionality
- Authenticate users via JWT (login/signup pages + logout button)
- CRUD Operation
- Date-picker Calendar
- Stripe
- Google Maps 

### The general page breakdown:
- Home Page (URL: /)
    - Navbar: Logo, About, Containers, Location, Login, Contact Us.
    - Image Carousel presenting the shipping containers with full name, price and button to view that shipping container.
    
- Register/login pages (URL: /register, /login)
    - Uses JWT (store the token in localStorage).
    - The user needs to fill the fields: First Name, Last Name, Username, Email Address, Password on Register page.
    - THe user login in using the account just created on Login page.
    
- Details one container (URL: /container/*id-container*)
    - The user can see pictures from container, details such as: Description, Calendar, Safety Precautions, Cancellation Policy and a little summary.
    - THe application has a maximum limit of 3 aduls and 3 kid per container per reservation.
    
 - All containers page (URL: /all-containers)
    - The website offers for users to see all the shipping containers that the owner is offering with information, for example: title, price per night, review, number of baths and beds.

 - Location (URL: /location)
    - The user can see and guide to arrive at the destion using the implemented Google Maps feature.
    
- Order user history (URL: /account)
  - The user can see the previous orders made in the past and if he/she cancelled the reservation.
    
  ## Screenshots
  ![Screenshot from 2022-07-12 13-16-33](https://user-images.githubusercontent.com/86559678/178468272-993736fd-72c0-4fe5-b3bd-654d62c8fa53.png)
  ![Screenshot from 2022-07-12 13-19-01](https://user-images.githubusercontent.com/86559678/178468876-bfa2e0a2-aa4e-4dad-9df6-1b2cf492973a.png)
  ![Screenshot from 2022-07-12 13-19-19](https://user-images.githubusercontent.com/86559678/178468945-059cbef8-15e6-4058-851e-36e019e2ff24.png)
  ![Screenshot from 2022-07-12 13-19-23](https://user-images.githubusercontent.com/86559678/178468979-e0c3dc10-c253-4220-bcca-b6ab9069b975.png)
  ![Screenshot from 2022-07-12 13-22-38](https://user-images.githubusercontent.com/86559678/178470648-b5eaa6e2-bb2a-4c27-a308-f10f4e2a76f1.png)
  ![Screenshot from 2022-07-12 13-53-33](https://user-images.githubusercontent.com/86559678/178474585-557c090c-e318-4ad9-bb14-a92bfe9ff3f9.png)
  ![Screenshot from 2022-07-12 14-32-32](https://user-images.githubusercontent.com/86559678/178481161-975df340-1d2f-4751-9e71-68b95639fc32.png)
