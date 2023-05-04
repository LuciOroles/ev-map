## Prerequisites:
- Node version 19.
- change the version using `nvm` if you have it installed

```
 // root directory
 $ nvm use
```

## Project structure

- the project uses `npm workspaces`
- the code is split into front-end and sever logic
- known issue
    - there is some `typescript` inconsistent behavior when `ts` compiler `server` due `d3` library, this shouldn't happened, but fixing it is outside the scope of the demo 

## Adding data to the database

In order to have some test data the project has code to randomly generate some address
for the map, and assigns the address to 5 predefined companies split into 2 groups;

```
 $ cd packages/server/
 $ npm run seed
```

## Server

 ```
 $ cd packages/server/
 $ npm install
 $ npm run develop
```

## Front-end

```
$ cd packages/front-end/
$ npm run develop 
```

## Check the application

The verify the application check `http://localhost:8080/`.
A map with address will be shown.
In order to check what stations you have on each of the address you need to click on the green spot and the list will be shown.
In order to calculate distances from a point on the map to the closest address, first click on the map, than click on the blue dot that was drawn an you'll get a window to input the search range and filter by desired company.
The results will appear under the map and they will accumulate for the given point until you will reset it, once reset the data will be cleared. This approach enables the user to easily compare various query filter, adding also a graphical representation of the radius.