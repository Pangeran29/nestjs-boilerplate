# Description
A Nest JS boilerplate that has some built in module:
1. Auth
2. User management
3. File upload + serve static

# Tech Specification
1. Nest JS (TypeScript)
2. Mysql (with Prisma) 
3. Docker
4. Prisma, Swagger, Multer, Jwt

## Setup environment
1. Make copy of ```example.env``` and name it ```.env```
2. Make a new pair of RSA356 (2048 bits) public and private key using OpenSSL
```bash
$ openssl genpkey -algorithm RSA -out private.pem -aes256
$ openssl rsa -pubout -in private.pem -out public.pem
```
3. Install Required package ```npm install```
4. Running the app
```bash
# development
$ npm run start
# watch mode
$ npm run start:dev
# development fast hot reload
$ npm run swc
```
5. See the app running on  ```http://[::1]:3000``` and swagger documentation on```http://[::1]:3000/v1/docs```

# Documentation
