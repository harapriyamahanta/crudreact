Author :- Harapriya Mahanta
<b>Problem Statement:-</b>
It is a school management system.
School add,edit,delete and update operation done here.

<b>Used Technology :-</b>

PHP Laravel Framework(MVC Framework) for Server side render and API provider
"React Js" for Frontend and consume API
HTML and CSS


<b>Steps to Install:-</b>

1. download/Clone the repo.
2. unzip the file to /var/www/html folder (Linux) 
3. Open terminal and go to the cloned repo project folder. 
	Then run below command 
		$ composer update

4.  Copy the .env.example to .env file with below command 	
		$ cp .env.example  .env
	(put your database name,password and username of your database inside .env)


5. 	Run below commands to start backend Laravel project
		$ php artisan key:generate
 		$ php aritisan migrate --seed
		$ php artisan serve

8.	Open another terminal and run below commands to start frontend react js 
		$ npm install
		$ npm run watch -- --watch-poll

