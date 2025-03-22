import mongoose from "mongoose";
import Clients from "@/models/Clients";  // Adjust path if necessary
import dbConnect from "./lib/dbConnect";

// Sample client data to seed
const sampleClients = [
    {
        name: "Client 1",
        specialization: "Web Development",
        discountPercentage: 15,
        pointsRequired: 100,
    },
    {
        name: "Client 2",
        specialization: "Mobile App Development",
        discountPercentage: 10,
        pointsRequired: 200,
    },
    {
        name: "Client 3",
        specialization: "Graphic Design",
        discountPercentage: 5,
        pointsRequired: 150,
    },
    {
        name: "Client 4",
        specialization: "SEO Optimization",
        discountPercentage: 20,
        pointsRequired: 80,
    },
    {
        name: "Client 5",
        specialization: "Digital Marketing",
        discountPercentage: 25,
        pointsRequired: 300,
    },
    {
        name: "Client 6",
        specialization: "Data Science",
        discountPercentage: 30,
        pointsRequired: 400,
    },
    {
        name: "Client 7",
        specialization: "Cloud Computing",
        discountPercentage: 10,
        pointsRequired: 120,
    },
    {
        name: "Client 8",
        specialization: "Blockchain Development",
        discountPercentage: 35,
        pointsRequired: 220,
    },
    {
        name: "Client 9",
        specialization: "UI/UX Design",
        discountPercentage: 40,
        pointsRequired: 500,
    },
    {
        name: "Client 10",
        specialization: "E-commerce Development",
        discountPercentage: 50,
        pointsRequired: 600,
    },
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await dbConnect()

        // Delete existing clients (optional, to avoid duplicates if rerun)
        await Clients.deleteMany({});

        // Insert the sample clients into the database
        const result = await Clients.insertMany(sampleClients);

        console.log(`${result.length} clients have been added to the database`);

        // Close the connection after seeding
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding the database:", error);
        mongoose.connection.close();
    }
}

// Run the seed function
seedDatabase();
