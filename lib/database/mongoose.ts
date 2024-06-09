import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

// Defining an interface for the mongoose connection object
interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Checking if a mongoose connection object already exists in the global scope
// This is done to reuse database connections across multiple requests in Next.js
let cached: MongooseConnection = (global as any).mongoose

// If a mongoose connection object doesn't exist in the global scope, create a new one
if(!cached) {
  cached = (global as any).mongoose = { 
    conn: null, promise: null 
  }
}

// Defining a function to connect to the MongoDB database
export const connectToDatabase = async () => {
  // If a connection already exists, return it
  if(cached.conn) return cached.conn;

  // If the MongoDB connection URL is not provided, throw an error
  if(!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  // If a connection promise doesn't exist, create a new one
  // This promise will resolve to a mongoose connection object
  cached.promise = 
    cached.promise || 
    mongoose.connect(MONGODB_URL, { 
      dbName: 'image-editor', bufferCommands: false 
    })

  // Await the connection promise and store the resulting connection object
  cached.conn = await cached.promise;

  // Return the connection object
  return cached.conn;
}