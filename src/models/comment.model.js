import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required : true
    },
    vedio : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vedio"
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamp:true})

commentSchema.plugin(mongooseAggregatePaginate)

export const Comment = mongoose.model("Comment" , commentSchema)