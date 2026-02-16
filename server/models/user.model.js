import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true,
    },
    role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer"
},  
isVerified: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String,
    },
address: {
    type: String
}
}, {timestamps: true});

userSchema.pre("save", async function (){
    if(!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
})
userSchema.methods.comparePassword = (async function (password) {
   return await bcrypt.compare(password, this.password)
});


const User = mongoose.model("User", userSchema);
export default User;