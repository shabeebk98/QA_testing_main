import { connectToDatabase } from '../../../lib/mongodb';

// Named export for POST method
export async function POST(req) {
    try {
        // Parse the JSON body
        const data = await req.json();

        const { name, email, password, role } = data;
        

        // Validate the request body
        if (!name || !email || !password || !role) {
            return new Response(
                JSON.stringify({ message: 'All fields are required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Connect to the database
        const db = await connectToDatabase();
        const usersCollection = db.collection('userdata'); // Replace with your collection name

        // Insert the user data
        const result = await usersCollection.insertOne({
            name,
            email,
            password, // Ensure you hash the password in production!
            role,
            createdAt: new Date(),
        });

        // Respond with the created user's ID
        return new Response(
            JSON.stringify({
                message: 'User created successfully',
                userId: result.insertedId,
            }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ message: 'An error occurred. Please try again.' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
