import mongoose from "mongoose";


const studentSchema=new mongoose.Schema({
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
      currentClass:String,
      section:{
            type:String,
            default:'A'
      },
      previousHistory:[
        {
          previousclass:String,
          section:String,
          grade:Number,
          Promoted:Boolean
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



export default mongoose.model('Student',studentSchema)