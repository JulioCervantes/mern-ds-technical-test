# Create admin user
For create one admin user you can use the script: create-super-admin-user.js

From root folder you can execute:
```
cd scripts
node create-super-admin-user.js -u admin -p admin -email admin@support.com
```
One time the first admin was create you can use this token to create another admin account from API endpoint: '/auht/register'