import mongoose from "mongoose";


const likeSchema = new mongoose.Schema({
    comment:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    likedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    vedio : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vedio"
    },
    tweet : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet"
    }
},{timestamp:true})


export const Like = mongoose.model("Like" , likeSchema)