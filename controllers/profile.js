const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateToken, decodeToken } = require("./token");
const cloudinary = require("../utils/cloudinary");

async function editProfileInfo(req, res){
  const { email, firstName, lastName, phoneNo, dateOfBirth } = req.body;

  try{
      const user = await User.findOneAndUpdate({ email }, { 
      firstName,
      lastName,
      phoneNo,
      dateOfBirth
    }, { returnDocument: 'after' });
    
    return res.json({ success: true, message: "Personal info updated successfully!", user: {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNo: user.phoneNo,
      dateOfBirth: user.dateOfBirth,
      email: user.email,
      password: user.password,
      profilePic: user.profilePic
    }});
  }
  catch{
    return res.json({ success: false, message: "Personal info could not be updated!" });
  }
}

async function editAccountInfo(req, res){
  const { oldEmail, oldPassword, newEmail, newPassword } = req.body;

  const user = await User.findOne({ email: oldEmail });

  if(!user)
    return res.json({success: false, message: "No such Email found!"});

  const passwordMatch = await bcrypt.compare(oldPassword, user.password);

  if(!passwordMatch)
    return res.json({success: false, message: "Invalid password!"});

  if(newEmail !== oldEmail){
    const emailAlreadyExists = await User.findOne({ email: newEmail });

    if(emailAlreadyExists)
      return res.json({ success: false, message: "Provided Email is already registered!" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const newUser = await User.findOneAndUpdate({ email: user.email }, {
    email: newEmail,
    password: hashedPassword
  }, { returnDocument: 'after' });

  const decoded = decodeToken(req.cookies.accessToken, process.env.ACCESS_TOKEN_SECRET);
  const accessToken = generateToken(newUser, decoded.exp);

  res.cookie("accessToken", accessToken, {
    sameSite: "strict",
    path: "/",
    httpOnly: true,
    maxAge: decoded.exp,
  });

  return res.json({ success: true, message: "Account information updated successfully!", user: {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      phoneNo: newUser.phoneNo,
      dateOfBirth: newUser.dateOfBirth,
      email: newUser.email,
      password: newUser.password,
      profilePic: newUser.profilePic
    } })
}

async function editProfilePic(req, res){
  const { email } = req.body;

  let imageURL;

  await cloudinary.uploader.upload(req.file.path, function(err, result){
    if(err)
      return res.json({ success: false, message: "An error occured!" });

    imageURL = result.secure_url;
  })

  const user = await User.findOneAndUpdate({ email }, { profilePic: imageURL }, { returnDocument: 'after' });

  return res.json({ success: true, message: "Profile picture updated successfully!", user: {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNo: user.phoneNo,
      dateOfBirth: user.dateOfBirth,
      email: user.email,
      password: user.password,
      profilePic: user.profilePic
    }});
}

module.exports = {
  editProfileInfo,
  editAccountInfo,
  editProfilePic,
}