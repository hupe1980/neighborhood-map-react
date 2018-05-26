# neighborhood-map-react
This is the Udacity Neighborhood Map (React) Project. The goals are:
- Build a single page map application using React and the Google Maps API.
- Integrate a third-party data API and make your app accessible and usable offline.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

[GoingElectric](https://www.goingelectric.de/stromtankstellen/api/dokumentation/) is used as third-party data API.

## Features
- The app shows chargelocations (red icon) and clusters of chargelocations (black icon)
- Clusters are formed when chargelocations are too close together
- The badge shows the number of clustered chargelocations
- Clusters can be resolved by zooming in
- Clicking on a marker (red icon) displays details of the chargelocation

## Installation
- Download or clone this repository
- Run `yarn install` or`npm install` in the root directory
- Run `yarn start`or `npm start`
- Go to `http://localhost:3000` in your browser

## Live Demo
For a demo, check out https://hupe1980.github.io/neighborhood-map-react
