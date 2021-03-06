# Backend-Express-Api-oEmbed

## About Oembed 
oEmbed is a format for allowing an embedded representation of a URL on third party sites. The simple API allows a website to display embedded content (such as photos or videos) when a user posts a link to that resource, without having to parse the resource directly.

This document is stored on [GitHub](https://github.com/iamcal/oembed)

## About The Project

This project consist about managing a bookmarks and embed media(photos,videos) from providers like (vimeo, flickr,...), and in this repository the backend server to serve api for the [React-Oembed-bookMark](https://github.com/Lamourio/React-Oembed-bookMark)

## Requirement 
* nodejs LTS installed
* npm installed

## Installation

* clone or download the project
* open the terminal in the root directory
* run the command

```
$ npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

the project runs on [http://localhost:9000](http://localhost:9000) 

## Add more providers

* In the root directory open the file .env
* If you want all the providers change the value of the variable `PROVIDERS` to `all`
    * PS : It is not fully developed in the client side yet.
* If you want just vimeo and flickr change the value of the variable `PROVIDERS` to `vimeoFilckr`
### Exemple : 
In the .env file it should be look like below : 
\
either : 
```
PROVIDERS=all
```
OR
```
PROVIDERS=vimeoFilckr
```
don't forget to restart the server after any change.
## API : 
**Get Oembed data**
----
  Returns json data about a single media.

* **URL**

  localhost:9000/testAPI

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `url=[string]`

* **Sample Call:**

  ```javascript
        fetch(`http://localhost:9000/testAPI${"?url=" + url}`)
            .then(res => res.json())
            .then(res => {
               ...
            }).catch(() => {
               ...
            })
  ```








