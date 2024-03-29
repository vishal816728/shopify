import mongoose from "mongoose";


const TeacherSchema=new mongoose.Schema({
      username:{
        type:String,
        required:true
      },
      email:{
        type:String,
        required:true,
        unique:true
      },
      password:{
        type:String,
        required:true
      },
      firstName:{
          type:String
      },
      lastName:{
        type:String
      },
      dateOfBirth: Date,
      address:{
        street:String,
        city:String,
        state:String,
        pincode:String,
        country:String
      },
      phoneNumber:Number,
      Qualification:[
        {
          degree:String,
          grade:String,
          institute:String
        }
      ],
      guardian_name:{
        fatherName:{
          type:String
        },
        motherName:{
          type:String
        }
      },
      gender:{
        type:String,
        enum:["Male","Female","Other"]
      },
      enrolledAt:Date,
      Books:[
        {
          type:mongoose.Schema.Types.ObjectId,
          ref:"Library"
        }
      ],
      isAdmin:Boolean
},{
    timestamps:true
})



export default mongoose.model('Teacher',TeacherSchema)