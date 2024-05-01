import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  dateOfBirth: Date,
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: String
  },
  phoneNumber: Number,
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"]
  },
  isAdmin: Boolean,
  Role: {
    type: String,
    default: "user"
  },
  rewards: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reward"
  }
}, {
  timestamps: true
})



export default mongoose.model('User', userSchema)