# NoSql Api
Repository contains a MongoDB implementation of a social network API. Basic CRUD operations are possible on Users and Thoughts (which belong to users). Additionally Users can have friends (other users) and Thoughts can have Reactions (similar to comments).

This repository utilizes

* JavaScript
* Node
* npm
* MongoDB
* Mongoose
* Express


[Video](https://drive.google.com/file/d/1-qSCRtyE_t8shw-fwf590Q-9CdOD_top/view)

## Installation

Dependencies can be installed with npm.
```sh
npm install
```

## Usage 
Start it up with 
```sh
node index.js
```
You can then test `GET`, `POST`, `PUT`, and `DELETE` requests on 
* api/users
* api/thoughts

Friends are added via
* api/users/:userId/friends

Similarly reactions
* api/thoughts/:thoughtId/reactions


Check out the video for specific examples of these routes!

## License

Refer to the license in the Github repo.
