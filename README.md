# DJANGO-REACT-POSTGRESQL PROJECT 2022
## AN ECOMMERCE SITE

> This ecommerce site is part of [Leonardo Bcheche's Portfolio](https://github.com/LBcheche). 
> The ecommerce project was developed between October and November 2022 and was based on Dennis Ivy and Brad Travessy Project last updated on February 2021.
> All version incompatibilities from these different periods have been resolved so the code is fully up to date.
> This final version code uses a Django framework as Backend, a React frameword as Frontend and a Postgresql Database. 

You can see the final result at [The No Place Market](https://thenoplacemarket.herokuapp.com/) site.
> **Warning** :
> This site is off-line at this moment!

### PRE-REQUIREMENTS

- **Virtual Environment**: If you want to run this code on your computer, you need to create an python virtual environmnent with all packages at requirements.txt in order to run the django backend. 

- **Data Base**: You also need to configure `backend/settings.py` to run the backend over a local or an external database. You may also need to add environment variables at your virtual environment. 

- **Paypal Client ID**: Create your own Paypal Client ID at https://developer.paypal.com/ Sandbox App and substitute its value at `frontend/src/screens/OrderScreen.js` to simulate Paypal or Credit Card payments.

### LIFE CICLE

#### RUN

- **Backend**: To run the backend server, activate your virtual environment and type at your main `/backend` folder:
``` 
python3 manage.py runserver
``` 

- **Frontend**: To run the frontend server, type at `/backend/frontend` folder:
```
yarn start
``` 

#### USER

- **Admin**: To create the first admin user for the backend, activate your virtual environment and type at your main `/backend` folder:
```
python3 manage.py superuser
``` 

#### UPDATE

- **Database**: If you have updated the database at `models.py`, activate your virtual environment and type this at your main `/backend` folder to update your python database file:
```
python3 manage.py makemigrations
``` 
Also type this to upload to your database:

```
python3 manage.py migrate
``` 

- **Frontend**: If you have updated your react code, type the following commands at `/backend/frontend` folder to see all modifications as Django static files:
```
yarn build
``` 
Also, at your `/backend` folder:

```
python3 manage.py collectstatic
``` 
