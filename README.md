Revive Documentation
===================
This document contains all of the documentation for the backend of the Revive Project

POST - Create [Key, Name, Desc, Photo, Long, Lat]
-------------
codeluca.me:8080/create

Adds project to database

Key - API Key to add data to database.

Name -Project Name

Desc -Project Description

Photo - Photo URL for project

Long - Longitude

Lat - Latitude

POST - Remove [Key, Query]
-------------
codeluca.me:8080/remove

Removes project from database

Key - API Key to add data to database.

Query - Query Project Name

GET - find/:name [:Name]
-------------
codeluca.me:8080/find/:name

Gets info of project

:Name - Project Name
