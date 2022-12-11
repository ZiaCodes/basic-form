const User = require('../models/user');
const Payement = require('../models/payement');
const EmailVerificationToken = require('../models/emailVerificationToken');
const { isValidObjectId } = require('mongoose');
const jwt = require('jsonwebtoken');
const { generateOTP, generateMailTransporter } = require('../utils/email');
const { sendError  } = require('../utils/helper'); 


//create a new user (Method)
exports.create = async (req,res) => {
    const{name, email, phoneNumber, gender, age, company,password} = req.body;

    // checking if same email exist or not
    const oldUser_email =await User.findOne({ email });
    const oldUser_number = await User.findOne({ phoneNumber })
    if(oldUser_email) 
        return res.json({message:"This email is already in use"});

    if(oldUser_number) 
        return res.json({message:"This phone Number is already in use"});


    // creating new User
    const newUser = new User({name, email, phoneNumber, gender, age, company,password});
    await newUser.save();

    let OTP = generateOTP();

    // Storing OTP in db
    const newEmailVerificationToken = new EmailVerificationToken({owner: newUser._id, token:OTP});
    await newEmailVerificationToken.save();


    //Send to user OTP
    var transport = generateMailTransporter();

      transport.sendMail({
        from: "verification@yogaclass.com",
        to: newUser.email,
        subject:"Email Verification",
        html:`
        <p> Your verification OTP: </p>
        <h3>${OTP}</h3>
        <br>
        <p> <b> Note : </b>This OTP is Valid for one hour only. </p>
        <p> Thank You<p>
        `,
      });

      res.json({message:"Please verify your email. OTP has been sent to your Email Account."});
};

exports.verifyEmail = async (req,res) =>{
    const {userId, OTP} = req.body
  
    if( !isValidObjectId(userId) )
      return sendError(res,"Invalid userId!");
  
    const user = await User.findById(userId)
  
    if(!user)
      return sendError(res, "userId not found!",404);
  
  
    if(user.isVerified)
      return res.json({message:"user is already verified!"});
  
    const token = await EmailVerificationToken.findOne({owner: userId});
  
    if(!token) 
      return sendError(res, "Token not found");
  
    const isMatched = await token.compareToken(OTP)
  
    if(!isMatched) 
      return sendError(res,"Please submit a valid OTP!");
  
    user.isVerified = true;
    await user.save()
  
    await EmailVerificationToken.findByIdAndDelete(token._id);
  
    //Send to user OTP
    var transport = generateMailTransporter();
  
    transport.sendMail({
      from: "verification@yogaclass.com",
      to: user.email,
      subject: "Welcome to our App",
      html:`
      <p>Welcome to our App and thank you for choosing us.</p>
      <p>To start your yoga Class, You can take a subscription from this <a herf="#">link</a></p>
      <p>Or you can login into the app using your email and passward</p>
      <p> Thank You<p>
      `,
    });
  
    res.json({message: " Your Email is verified!"})
}

exports.signIn = async(req, res) =>{
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user) return sendError(res, "Email and password mismatch");
  
    const matched = await user.comparePassword(password)
    if(!matched) return sendError(res, "Email and password mismatch");
  
    const {_id, name} = user
    const jwtToken = jwt.sign({userId: _id},process.env.JWT_SECRET_TOKEN,{expiresIn:'7d'})
  
    res.json({user: {id: _id,name,email,jwtToken}})
}

exports.makePayement = async(req, res) => {
    const {ownerId,email, payementId, batche} = req.body;

    const newPayemenetDetails = new Payement({ownerId, email, payementId, batche});
    await newPayemenetDetails.save();

    // verification token for payement
    var transport = generateMailTransporter();

    transport.sendMail({
      from: "payement@yogaclass.com",
      to: newPayemenetDetails.email,
      subject:"Payement Successful",
      html:`
      <p> Congratulation , You payement is successful </p>
      <h3>Here is the details of your Yoga Class Subscription.</h3>
      <br>
      <p>
        <b> userId </b> : ${ownerId} <br>
        <b> Payement Id </b> : ${payementId} <br>
        <b> Validity </b> : 1  month <br>

      </p>
      <p> Thank You<p>
      `,
    });

    res.json({message:" Thank you, You will receive a confirmation email. "});

} 


// exports.payementVerification = async(req, res) => {
//     const {ownerId} = req.body;

//     if( !isValidObjectId(ownerId) )
//       return sendError(res,"Invalid userId!");
  
//     const newPayement = await Payement.findById(ownerId)

//     if(!newPayement)
//       return sendError(res, "userId not found!",404);
  
//     if(newPayement.isPayementVerified)
//       return res.json({message:"You have already made your payement Successfully."});

//     newPayement.isPayementVerified = true;
//     await newPayement.save();

//     res.json({message:" payement verified"});
    
// }
