# Covid-Tracing-Web-App

Simple full stack web app the allows for Covid Tracing functionality. Users are able to check-in, view hotspots and history and be notified. Managers are able to register venues and be notified. Admins are able to create hotspots and notify of users of hotspots. Incorporates crud functionality (create, read, update, delete) using the Sakila and Relational database design. Also incorporates escaping query values to avoid SQL injection attacks (functionally same as prepared statements).

Steps to run:

import the database onto mysql
install nodejs and dependencies (express, mysql, vue)
run with $ npm start
run sql server on localhost

![alt text](https://github.com/andersonchin/Covid-Tracing-Web-App/tree/main/AJPZ?raw=true)

First register as either a user or a manager via the register page, ensure you enter all your details. After registering correctly youll be redirected back to
the login page. Enter those credentials to login and youll be redirected to either the user or venue page. Follow the links along the to naivgate the page.

To login as a health offical use:

Username: test3@gmail.com
Password: 123123123
