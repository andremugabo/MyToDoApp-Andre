import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
    u_name: string;
    u_email: string;
    u_password: string;
    u_image?: string;
}

const userSchema: Schema<IUser> = new Schema({
    u_name: {
        type: String,
        required: [true, "Please enter a user name"],
    },
    u_email: {
        type: String,
        required: [true, "Please enter a user email"],
    },
    u_password: {
        type: String,
        required: [true, "Please enter user password"],
    },
    u_image: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
