# Chess Helper Frontend

## Run development server
Make sure you are in frontend root directory  
Install all dependecies
```
npm install
```
Run development server
```
npm start
```
Web app should be available at `localhost:3000`

## Build for production
Start build
```
npm run build
```
Move output to backend root directory
```
mv build ../chelp-backend
``` 

## Deployment 
Deployment on Azure Web Service utilises Github Actions CI/CD on push to main - no manual action is needed.