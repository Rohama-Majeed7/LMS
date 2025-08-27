import mongoose from "mongoose";
const courseProgressSchema = new mongoose.Schema({
    userId:{
        type:String,
    },
    courseId:{
        type:String
    },
    completed:{
        type:Boolean
    },
    lectureCompleted:[]
},{minimize:false})
const courseProgress = mongoose.models.CourseProgress || mongoose.model("courseProgress", courseProgressSchema);
export default courseProgress