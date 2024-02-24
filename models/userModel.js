"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
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
var User = mongoose_1.default.model("User", userSchema);
exports.default = User;
