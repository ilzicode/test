# TEST
 Digital Envision Assessment
 Github link: https://github.com/ilzicode/test

### Getting Started With Docker
* tested on development branch

* copy file `env.txt` to `.env`
* make sure environment in development
* run `docker-compose build`
* "npm install" inside docker app

* database migration sequelize using DB_HOSTNAME : localhost
* after migration update DB_HOSTNAME : test_mysql_1

* run `docker-compose up -d`
* app url: `http://localhost:3000`
* phpmyadmin url: `http://localhost:3002`
* run node app in cron/schedule.js for cron jobs 15 minutes.

### testing purposes
* run node app in cron/scheduleTestOnly.js for cron jobs 10 second delay.