import mongoose from "mongoose"


let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}
async function connectDB() {
    if (cached) {
        return conn
    }
    if (!cached) {
        const opts = { bufferCommands: false }
        cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/cartivo`, opts).then(mongoose => { return mongoose })
    }
    cached.conn = await cached.promise
    return cached.conn
}
export default connectDB