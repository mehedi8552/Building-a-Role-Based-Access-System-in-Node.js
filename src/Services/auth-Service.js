const UserModel = require('../Models/user-models');
const ResetPass = require('../Models/reset-password-models')
var jwt = require('jsonwebtoken');


const signupService = async(req)=>{
    try{
        const reqbody = req.body;
        const user = await UserModel.create(reqbody);
        return { status: "success",message: "User Created", data: user };
    }catch(err){
        return { status: "Faild", data: err.toString()};
    }
}
const signinService = async(req)=>{
    try{
        const filter ={ 
            email : req.body.email,
            password : req.body.password,
        };
        
        const response = await UserModel.findOne(filter);
        const userData = {
            name: response.name,
            email: response.email,
            password: response.password,
            address: response.address,
            phone: response.phone,
            role:response.role,
        }
       const authToken = jwt.sign({
            data: userData
          },"testpass", { expiresIn: '1h' });

        await UserModel.findOneAndUpdate(filter,{
            authToken:authToken
        })
        return { status: "success",message: "Signin Successfull", data: authToken };

    }catch(err){
        return { status: "Faild", data: err.toString()};
    }
   
}
//incomplete
const signoutService = async(req)=>{
    try{
        const filter = { email: decodedData.data.email };
        console.log(filter)
        return { status: "success",message: "User Created", data: user };

    }catch(err){
        return { status: "Faild", data: err.toString()};
    }
   
}

const ForgetPassService = async(req)=>{
    try{
        
        const email = req.body.email;
        const OTP = Math.floor(Math.random() * 1000000);
        const filter = await UserModel.findOne({email:email});
        if (!filter) throw Error
        
        const jwtToken = jwt.sign({
            data: filter.email
          }, 'test123', { expiresIn: '1h' });

       const data = await ResetPass.create({
            otpCode: OTP,
            token: jwtToken
        })  
        return { status: "success",message: "OTP Sent Successfull",OTP:data.otpCode.toString(),Token:data.token.toString()};

    }catch(err){
        return { status: "Faild", data: err.toString()};
    }
   
}

const VarifyOTPService = async (req)=>{
    const filter ={
        otp:req.body.otpCode,
    } 
    try{
        const resp = await ResetPass.findOne(filter);
        const DecodeData = jwt.verify(resp.token,'test123');    
        return {status: "success",message:DecodeData.data}
    }catch(err){
        return { status: "Faild", data: err.toString()};
    }
}

const ResetPassService = async(req)=>{
    const filter = {
        email: req.body.email,
    };
    try{
        const Update ={
            password: req.body.newPassword, 
        }
        
        const resp = await UserModel.findOneAndUpdate(filter,Update);
        return { status: "success",message:resp };

    }catch(err){
        return { status: "Faild", data: err.toString()};
    }
   
}


module.exports ={
    signupService,
    signinService,
    signoutService,
    ForgetPassService,
    VarifyOTPService,
    ResetPassService
}

