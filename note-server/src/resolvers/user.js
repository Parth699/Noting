const { favouritedBy } = require("./note");

module.exports={
    notes:async(user,args,{models})=>{
        return await models.Note.find({author:user._id}).sort({_id:-1});
    },
    favourites:async(user,args,{models})=>{
        return await models.Note.find({favouritedBy:user._id}).sort({_id:-1});
    }   
}