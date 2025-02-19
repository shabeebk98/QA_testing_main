import { connectToDatabase } from '../../../lib/mongodb';

export async function POST(req) {
    try {
        const data = await req.json();
        // const { name, email, password } = data;
        const { email, password } = data;


        // Validate that all fields are provided
        // if (!name || !email || !password) {
        if (!email || !password) {

            return new Response(
                JSON.stringify({ message: 'email, and password are required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Connect to the database
        const db = await connectToDatabase();
        const usersCollection = db.collection('userdata');

        // Find the user in the database
        const user = await usersCollection.findOne({ email });

        // Validate user existence and credentials
        if (!user || user.password !== password) {
            return new Response(
                JSON.stringify({ message: 'Invalid email, or password' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Successful login
        return new Response(
            JSON.stringify({
                message: 'Login successful',
                user: { name: user.name, email: user.email, role: user.role }
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error in login:', error);
        return new Response(
            JSON.stringify({ message: 'Internal Server Error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
