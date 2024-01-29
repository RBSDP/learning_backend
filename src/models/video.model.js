 import mongoose , {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

 const videoSchema = new mongoose.Schema({

    videoFile : {
        type : String , //clodinary url String,
        required : true,

    },
    tumbNail : {
        type : String , //clodinary url String,
        required : true,
        
    },
    title : {
        type : String , 
        required : true,
        
    },
    description : {
        type : String , 
        required : true,
        
    },
    duration : {
        type : Number , 
        required : true,
        
    },
    views  : {
        type : Number,
        default : 0
    },
    isPublished : {
        type: Boolean,
        default : true
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }


 },{timeStamps : true})

videoSchema.plugin(mongooseAggregatePaginate) // learn more about it

 export const Video = mongoose.model("Video", videoSchema)