
<h1>Steps to Install:-</h1>

1. download the repo .
2. unzip the file inside /var/www/html folder 
3. go inside the folder put the command 
composer update
4.  cp .env.example  .env
change your database name,password and username of your phpmyadmin


5. php artisan key:generate
6. php aritisan migrate
7. php artisan serve

8. npm install