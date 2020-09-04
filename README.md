# Bug Tracker Back-End

This is meant to be an issue/bug tracker focused on allowing users to explore issues across different projects and organizations.

A user may be an admin for one organization and have high level privileges, only being a low level user in another and have limited privileges in another org.

<br/>

___

<br/>

## Opensource/Customization Setup

Whether you want to submit an addition or go a completely different direction with this application, the current application is going to require some minor setup.

<br/>

### Environment

First create a `.env` file in the root folder where we'll put our environmental variables.

Inside this `.env` file:

- PORT=
   - This has a default, and is entirely optional 
- SECRET=
    - Used in JWT creation,  any random string will work
- HOST=
    - In development/locally this will most likely be localhost
- DB_USER=
    - The owner of the postgres database that you create
- DB_PASS=
    - The DB_USER's password
- DB=
    - The name of the database created in postgres

<br/>


### Postgres / Database Creation

Create a new database, call it whatever you would like. The quick and dirty way to do this would be to open up pgAdmin, which should have come with the download of postgres.

On the left you'll see the 'Servers' directory. Opening that should reveal the PostgreSQL12 directory. Right click on Databases, select Create, select Database...

A modal should appearwhere you can enter the name of your database into the Database field. Click save, and you've got a new database to use.

<br/>

### Knex

Your going to need to populate the database with tables.

To do this, in the command line, run '`knex migrate:latest`'.

Feel free to reference the knex [docs](https://www.knexjs.org/) or this [cheatsheet](https://devhints.io/knex) for more on working with knex.js

<br/>

___

## Endpoints
NOTE: These will be expanding as the application gets fleshed out further.

<br/>

### Auth (Register / Login):

| Method | Endpoint | Description |
|-|-|-|
|POST | `HOST/api/auth/register` | Adds a new user. Returns user's id and a token.|
|POST | `HOST/api/auth/login` | Returns a valid user's id and a token.|

<br/>

### Users:

| Method | Endpoint | Description |
|-|-|-|
|GET|`HOST/api/users/general/:id`| Returns a user object|
|GET|`HOST/api/users/orgRole/:id`| Returns an array of all the organizations and roles a user is assigned to|
|POST|`HOST/api/users/orgRole/:id`| Adds a user to a role at an organization|

<br/>

### Organizations:

|Method|Endpoint|Description|
|-|-|-|
|GET|`HOST/api/orgs/:id`|Returns an organization with the given id|
|POST|`HOST/api/orgs`|Creates a new organization|

<br/>

### Projects:
|Method|Endpoint|Description|
|-|-|-|
|GET|`HOST/api/projects/:id`|Returns all projects associated with the organization with the given id|
|POST|`HOST/api/projects/:id`|Adds a new project to the organization with the given id|

<br/>

### Issues:

|Method|Endpoint|Description|
|-|-|-|
|GET|`HOST/api/issues/list/:id`|Returns a list of all issues associated with all organizations that a user( id ) is a part of.
|GET|`HOST/api/issues/specific/:id` |Returns a specific issue by the given issue id|
|POST|`HOST/api/issues/:id`|Adds an issue to the project at the given id|
|PUT|`HOST/api/issues/:id`|Updates and issue at the given id|
|DELETE|`HOST/api/issues/:id`|Deletes an issue at the given id|


