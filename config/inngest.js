// src/inngest/client.ts
import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";

export const inngest = new Inngest({ id: "cartivo-next" });

// inngest Functions to save users data a database

export const syncUserCreation = inngest.createFunction(
    {
        id: 'sync-user-from-clerk'
        , triggers: [{
            event: 'clerk/user.created'
        }]
    },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data
        const userData = {
            _id: id,
            name: first_name + " " + last_name,
            email: email_addresses[0].email_address,
            imageUrl: image_url
        }
        await connectDB()
        await User.create(userData)
    }

)

//inngest functions to update userData from database


export const syncUserUpdation = inngest.createFunction(
    {
        id: 'update-user-from-clerk'
        ,
        triggers: [{ event: 'clerk/user.updated' }
        ]
    },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data
        const userData = {
            _id: id,
            name: first_name + " " + last_name,
            email: email_addresses[0].email_address,
            imageUrl: image_url
        }
        await connectDB()
        await User.findByIdAndUpdate(id, userData)
    }
)

//inngest function to delete userdata from dataBase
export const syncUserDeletion = inngest.createFunction(
    {
        id: 'delete-user-from-clerk'
        ,
        triggers: [{ event: 'clerk/user.deleted' }]
    },
    async (event) => {
        const { id } = event.data;
        await connectDB()
        await User.findByIdAndDelete(id)
    }

) 