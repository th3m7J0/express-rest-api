const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const geoSchema = new Schema({
    type:{
        type:String,
        trim:true,
        default: 'Point',
    },
    coordiantes:{
        type: [Number],
        index:'2dsphere',
        required: [true,"coordinates field is required"]
    }
});

const ninjaSchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"Name field is required"],
    },
    rank:{
        type:String,
        trim:true,
    },
    available:{
        type: Boolean,
        default:false
    },
    geometry:{
       type:geoSchema,
        required:[true,"Geometry field is required"]
    }
});

module.exports = mongoose.model('ninja',ninjaSchema);