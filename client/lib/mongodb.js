import { MongoClient } from 'mongodb';

// Global variable to reuse MongoDB client in development
let client;
let clientPromise;

const uri = process.env.MONGODB_URI; // MongoDB connection string
const options = {};

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your MongoDB URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable to preserve the client
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode, create a new client
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export async function connectToDatabase() {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB); // Replace with your database name
    return db;
}
