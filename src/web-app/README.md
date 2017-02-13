# Meetup Portal web site

#### Prerequisites (dev)
* PHP 7

How to run using built-in PHP dev server:
```batch
php -S 127.0.0.1:8082
```

#### Known issues:

##### 1. It seems like my built-in PHP dev server is not responding
**Fix:** Try to open your browser and navigate to http://localhost:8082

##### 2. NodeJS code is unable to connect to PHP dev server
**Fix:** Try to listen for all available network interfaces by running
```batch
php -S 0.0.0.0:8082
```
**Note:** It is highly not recommended because it can affect your local machine security status by exposing PHP dev server to all network interfaces


## API

Here we have a simple api which is responsible for obtaining file path and file content from request body and then save content to corresponding file on file system. We will always expect to have static pre-rendered html inside file content and we will always append file name with '.html'. All files will be saved in web site root folder.

## Assets

Here we will store common static assets like jQuery, bootstrap, etc.