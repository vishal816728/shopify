import userModel from "../../Models/Registration/student.model.js";
import Controller from "../../Utils/Controller.js";
import joi from "joi";
import bcrypt from "bcrypt";

class User extends Controller {
    constructor() {
        super()
        this.registerUser = this.registerUser.bind(this)
        this.getAllUsers = this.getAllUsers.bind(this)
        this.getStudent = this.getStudent.bind(this)
        this.loginStudent = this.loginStudent.bind(this)
        this.updateStudent = this.updateStudent.bind(this)
        this.deleteStudent = this.deleteStudent.bind(this)
    }

    async registerUser(req, res) {
        const { username, phoneNumber, email, password } = req.body;

        // Validate the request body -- for phoneNumber range is 6000000000 to 9999999999
        const { error } = joi.object({
            username: joi.string().required(),
            phoneNumber: joi.number().integer().min(6000000000).max(9999999999).required(),
            email: joi.string().email({tlds:{allow:['com','net']}}).required(),
            password: joi.string().min(8).alphanum().required()
        }).validate({ username, phoneNumber, email, password });
        if (error) {
            // handle validation error
            return this.errorWithMsg(res, error.details[0].message );
        }
        try {
        const isUserExist = await userModel.findOne({ email: email })
        if (!isUserExist) {
            const hashedPassword = await bcrypt.hash(password, Number(process.env.saltRounds));
            const saveUser = new userModel({
                email,
                username,
                phoneNumber,
                password: hashedPassword
            })
                await saveUser.save();
                saveUser.password=undefined
                return this.ok(res, saveUser);
            
        } else {
            return this.errorWithMsg(res, "User already exists");
        }
    }catch (error) {
            // Handle the error here
            console.log(error)
            return this.error(res, error)
        }
    }

    async getStudent(req, res) {
        const { id } = req.params;
        const {error,value}=joi.string().length(24).validate(id)
        if(error){
            return this.errorWithMsg(res,error.details[0].message)
        }
        try{
            const student=await userModel.findById(id).select("-password")
            if(student){
                return this.ok(res,student)
            }else{
                return this.errorWithMsg(res,"Student Id Does Not Exist.")
            }
        }catch(err){
            return this.error(res,err)
        }
    }

    async loginStudent(req,res){
        const {email,password}=req.body;
        const {error}=joi.object({
            email:joi.string().email().required(),
            password:joi.string()
        }).validate({email,password})

        if(error){
            return this.errorWithMsg(res,"Invalid email/password. Please Try Again")
        }

        try{
            const isStudentExist=await userModel.findOne({email})
            if(isStudentExist){
                const isCorrectPassword=await bcrypt.compare(password,isStudentExist.password)
                if(isCorrectPassword){
                    isStudentExist.password=undefined
                    return this.ok(res,isStudentExist)
                }else{
                    return this.errorWithMsg(res,"Invalid email/password. Please Try Again")
                }
            }else{
                return this.errorWithMsg(res,"User Id Does not Exist")
            }
        }catch(err){
            return this.error(res,err)
        }
    }
    
    async updateStudent(req,res){
        const {error}=joi.string().email({tlds:{allow:['com','net']}}).required().validate(req.body.email)

        if(error){
            return this.errorWithMsg(res,"Wrong Email")
        }
        try{
           const isStudent=await userModel.findOne({email:req.body.email})
           if(isStudent){
            const update= {
                $set: {
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    address:{
                        street:req.body.street,
                        city:req.body.city,
                        state:req.body.state,
                        pincode:req.body.pincode,
                        country:req.body.country
                    },
                    phoneNumber:req.body.phoneNumber,
                    dateOfBirth:req.body.dateOfBirth ? new Date(req.body.dateOfBirth):undefined,
                    currentClass:req.body.currentClass,
                    section:req.body.section,
                    guardian_name:{
                        fatherName:req.body.fatherName,
                        motherName:req.body.motherName
                    },
                    gender:req.body.gender,
                    enrolledAt: req.body.enrolledAt ?new Date(req.body.enrolledAt):undefined
                },
                $push: {
                    previousHistory:{
                            previousclass:req.body.previousclass,
                            section:req.body.section,
                            grade:req.body.grade,
                            Promoted:req.body.Promoted
                    },
                    Books:req.body.id
                }
            }
            let query=""
            let {previousclass,section,grade,Promoted}=req.body
            if(previousclass || section || grade || Promoted){
                query=update
            }else{
                query={
                    $set: {
                        firstName:req.body.firstName,
                        lastName:req.body.lastName,
                        address:{
                            street:req.body.street,
                            city:req.body.city,
                            state:req.body.state,
                            pincode:req.body.pincode,
                            country:req.body.country
                        },
                        dateOfBirth:req.body.dateOfBirth ? new Date(req.body.dateOfBirth):undefined,
                        currentClass:req.body.currentClass,
                        section:req.body.section,
                        phoneNumber:req.body.phoneNumber,
                        guardian_name:{
                            fatherName:req.body.fatherName,
                            motherName:req.body.motherName
                        },
                        gender:req.body.gender,
                        enrolledAt: req.body.enrolledAt ?new Date(req.body.enrolledAt):undefined
                    },
                    $push:{
                        Books:req.body.id
                    }
                }
            }
            const updateUser=await userModel.findOneAndUpdate({email:req.body.email},query,{new:true,upsert:true,runValidators: true,    
            useFindAndModify: false})
            if(updateUser){
                return this.ok(res,updateUser)
            }
           }else{
               return this.errorWithMsg(res,"Student does not exist")
           }
        }catch(err){
            return this.error(res,err)
        }
    }
    async deleteStudent(req,res){
        const { id } = req.params;
        const {error,value}=joi.string().length(24).validate(id)
        if(error){
            return this.errorWithMsg(res,error.details[0].message)
        }
        try{
            const student=await userModel.findById(id)
            if(student){
                const deletedStudent=await userModel.findByIdAndDelete(id)
                return this.ok(res,deletedStudent)
            }else{
                return this.errorWithMsg(res,"Student Id Does Not Exist.")
            }
        }catch(err){
            return this.error(res,err)
        }
    }

    async getAllUsers(req, res) {
        try{
            const students = await userModel.find().select({"password":0})
            this.ok(res,students)
        }catch(error){
            return this.error(res, error)
        }
    }
}

export default new User();

