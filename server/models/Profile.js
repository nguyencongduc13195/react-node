const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle:{
        type: String, 
        required: true,
        max: 40
    },
    company:{
        type: String
    },
    website:{
        type: String
    },
    location:{
        type: String
    },
    status:{
        type: String,
        required: true
    },
    skills:{
        type: [String],
        required: true
    },
    bio:{
        type: String
    },
    githubusername:{
        type: String
    },
    education:[
        {
            school:{
                type: String,
                required: true
            },
            degree:{
                type: String,
                required: true
            },
            fieldOfStudy:{
                type: String,
                required: true
            },
            from:{
                type: Date,
                required: true
            },
            to:{
                type: Date
            },
            current:{
                type:Boolean,
                default:false
            },
            description: String
        }
    ],
    experience:[
        {
            title:{
                type: String,
                required: true
            },
            company:{
                type: String,
                required: true
            },
            location:{
                type: String,
                required: true
            },
            from:{
                type: Date,
                required: true
            },
            to:{
                type: Date
            },
            current:{
                type:Boolean,
                default:false
            },
            description:{
                type:String
            }
        }
    ],
    social: {
        youtube: String,
        facebook: String,
        twitter: String,
        linkedin: String,
        instagram: String,
    },
    created_at:{
        type: Date,
        default: Date.now
    }
})
module.exports = Profile = mongoose.model('profile', ProfileSchema)