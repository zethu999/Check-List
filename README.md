
# Check List

Check List is a simple web application that acts like a reminder of the user's daily tasks so that the user can make his day complete without missing a task.
## Tech Stack

**Frontend:** HTML5, CSS3, Bootstrap5, JS

**Backend:** Node.js, Express.js, EJS, MongoDB



[![My Skills](https://skillicons.dev/icons?i=html,css,bootstrap,js,nodejs,express,mongodb)](https://skillicons.dev)

## Run Locally

Clone the project

```bash
  git clone https://github.com/zethu999/Check-List
```

Install dependencies

```bash
  npm install
```

Start the app

```bash
  node app.js
```
or
```bash
  nodemon app.js
```


## Screenshots

![App Screenshot](https://github.com/zethu999/Check-List/blob/71a876898271e2b646bb384d82cf1de76f9b8260/photos/1.png?raw=true)

![App Screenshot](https://github.com/zethu999/Check-List/blob/71a876898271e2b646bb384d82cf1de76f9b8260/photos/2.png?raw=true)

![App Screenshot](https://github.com/zethu999/Check-List/blob/71a876898271e2b646bb384d82cf1de76f9b8260/photos/3.png?raw=true)

![App Screenshot](https://github.com/zethu999/Check-List/blob/71a876898271e2b646bb384d82cf1de76f9b8260/photos/4.png?raw=true)




## Appendix

*Let's go through the files and folders in the project*

***index.html***

* Uses *bootstrap* to display the title page.
* Uses *googlefonts and fontawesome* for title. 
* *home.css* file is contains code for styling of this page.
* Contains *form* element with a button to redirect to checklist page.

***public folder***

* contains *css* folder with css files in it.

***views folder***

* Used to store ejs files. 
* In this project we have *checklist.ejs, header.ejs and footer.ejs* files.
* header.ejs contains header HTML code and footer.ejs contains footer HTML code.
* checklist.ejs contains three HTML divs 
    * div 1 - gives the title of the checklist renderd from app.js
    * div 2 - uses foreach loop to loop through the objects given by the database and for every object creates a checkbox using html forms to perform delete request
    * div 3 - performs new task add operation 

***date.js***

* contains code to genrate current date.

***app.js***

* It has the following components
    * packages
    * app setup
    * database setup
    * home route 
    * add route
        * get request 
        * post request
    * delete route
        * post request
*Refer app.js for functionalities*


