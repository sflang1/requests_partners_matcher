# Matching Customer & Partner

This project is a test for matching clients with partners for hiring their services performing in a home task.

## Implementation

As the way provided to test the API, I created a small React application that serves as frontend. For styling purposes, I used the [Material UI Library](https://mui.com/).

Regarding the backend, I decided to store the information in 4 tables:

* Request
* Partner
* Experience
* Material

I decided to store the Material as a table of its own, as opposed to saving the experience of a partner directly in the Parnter table as a field, because for each time a new Material is needed, it would be needed to add a new field, being this a not very scalable model.

I had to figure out a way to seed the partners and its location. This is done through some mathematical calculations related to how much kilometers are equal to a second of latitude and longitude. For calculating the distances from the database, I used the gem [geokit-rails](https://github.com/geokit/geokit-rails), that offers various helpers for working with ActiveRecord and Geolocation. The library calculates the distance based in the [Haversine formula](https://en.wikipedia.org/wiki/Haversine_formula).

## Deployment

There are two ways of deploying this project:

### Development
1. Copy the env file `cp .env.development.example .env.development`
2. Replace in `.env.development` the values of `DB_USERNAME` and `DB_PASSWORD` for the corresponding values of your database server.
3. Install all gems with `bundle install` command
4. Install all JS packages with `yarn` command
5. Create, migrate and seed the database, with the command `rake db:create && rake db:migrate && rake db:seed`
6. Initialize the server with the `rails server` command
7. Browse to `localhost:3000`

This procedure supposes you already have ruby and postgres installed in your device.

### Production
1. Copy the env file `cp .env.production.example .env.production`
2. Replace only the value `DB_PASSWORD` in `.env.production` and set it to whatever you want your database password to be.
3. Run `docker-compose --env-file=.env.production up`
4. Browse to `localhost:3000`

This type of deployment might simplify taking a more microservices-oriented approach in the future

## Possible future tasks
Because of time, I was not able to do some stuff I would like to do. I write these possible future tasks here:

* Create automatic tests for the API.
* Perform a code analysis with Rubocop in order to improve the Ruby syntax and some code complexity.
* Add an schedule for the reservation of the Partner. Probably this would mean the creation of a new table between Request and Partner that holds the date information of the service.