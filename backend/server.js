const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./database')
const cloudinary = require('cloudinary')


//Handle uncaught expection
process.on('uncaughtException',err=>{
  console.log(`Error : ${err.message}`);
  console.log('Shutting down the server due to uncaught expection')
  process.exit(1)
})

dotenv.config()

connectDatabase();

//settup cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET 
})

const server = app.listen(process.env.PORT, ()=>{
  console.log(`Server started on PORT : ${process.env.PORT} `)
})

//Handled promise rejection 
process.on('unhandledRejection', err=>{
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to unhandled promise rejection ')
  server.close(()=>{
    process.exit(1);
  })
})