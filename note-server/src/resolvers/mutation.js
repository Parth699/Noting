const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar=require('gravatar');
const { AuthenticationError } = require("apollo-server-core");
const mongoose=require('mongoose');
const { ForbiddenError } = require("apollo-server-express");

const JWT_SECRETE="no5more"

const getAvatar=(seed)=>(`https://avatars.dicebear.com/api/identicon/${seed.split(".")[0]}niuu.svg`)

module.exports = {

  newNote: async (parent, args, { models,user }) => {
    if(!user){
      throw new AuthenticationError("You must be signing in to create a new note")
    }
    return await models.Note.create({
      content: args.content,
      author: mongoose.Types.ObjectId(user.id)
    });
  },


  updateNote: async (parent, { id, content }, { models,user }) => {
    if(!user){
      throw new AuthenticationError("You must be signed in to delete a note")
    }
    const note=await models.Note.findById(id);
    if(note && String(note.author)!==user.id){
      throw new ForbiddenError("You don't have permission to upadate this note.")
    }
    return await models.Note.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          content,
        },
      },
      {
        new: true,
      }
    );
  },


  deleteNote: async (parent, {id}, { models,user }) => {
    if(!user){
      throw new AuthenticationError("You must be signed in to delete a note")
    }
    const note=await models.Note.findOne({"_id":id});

    if(!note){
      throw new Error("Note does not exist.")
    }
    if(note && String(note.author)!==user.id){
      throw new ForbiddenError("You don't have rights to delete this note.")
    }
    try {
      await note.remove();
      return true;
    } catch (er) {
      return false;
    }
  },


  signUp: async (parent, { username, email, password }, { models }) => {
    email = email.trim().toLowerCase();
    const hased = await bcrypt.hash(password, 10);
    // const avatar=gravatar.url(email);
    const avatar=getAvatar(email);
    try{
      const user=await models.User.create({
        username,
        email,
        avatar,
        password:hased
      })

      return jwt.sign({id:user._id},JWT_SECRETE)
    }
    catch(err){
      console.log(err)
      throw new Error('Error creating account')
    }
  },


  signIn:async(parent,{username,email,password},{models})=>{
    if(email){
      email=email.trim().toLowerCase()
    }
    const user=await models.User.findOne({
      $or:[{username},{email}]
    });

    if(!user){
      throw new AuthenticationError("user does not exist")
    }

    const valid=await bcrypt.compare(password,user.password)
    if(!valid){
      throw new AuthenticationError("password is wrong");
    }
    return jwt.sign({id:user._id},JWT_SECRETE)
  },


  toggleFavourite:async(parent,{id},{models,user})=>{
    if(!user){
      throw new AuthenticationError("You must be signed in to delete a note")
    }
    let note=await models.Note.findById(id);
    let hasUser=note.favouritedBy.indexOf(user.id);
    if(hasUser>=0){
      return await models.Note.findByIdAndUpdate(id,{
        $pull:{
          favouritedBy:mongoose.Types.ObjectId(user.id)
        },
        $inc:{
          favouriteCount:-1
        }
      },
      {
        new:true
      })
    }
    else{
      return await models.Note.findByIdAndUpdate(id,{
        $push:{
          favouritedBy:mongoose.Types.ObjectId(user.id)
        },
        $inc:{
          favouriteCount:1
        }
      },
      {
        new:true
      })
    }
  }
};
