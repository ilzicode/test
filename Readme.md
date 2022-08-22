# TEST
 Digital Envision Assessment
 Github link: https://github.com/ilzicode/test

### Getting Started With Docker
* tested on development branch

* copy file `env.txt` to `.env`
* run `docker-compose build`
* setup env dev
* npm install inside docker app
* database migration using DB_HOSTNAME : localhost
* after migration update DB_HOSTNAME : test_mysql_1

* run `docker-compose up -d`
* app url: `http://localhost:3000`
* phpmyadmin url: `http://localhost:3002`

* run node app in cron/schedule.js for cron jobs 15 minutes.