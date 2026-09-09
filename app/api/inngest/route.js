import { serve } from "inngest/next";
import {
    inngest,
    syncUserCreation,
    syncUserDeletion,
    syncUserUpdation,
} from "@/config/inngest";
//create an api that serve zero funcions.
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        syncUserCreation,
        syncUserUpdation,
        syncUserDeletion
    ],
});