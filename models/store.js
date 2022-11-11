const { mongoose } = require("mongoose");
const geocoder=require('../utls/geoCoder')
const storeSchema= new mongoose.Schema({
    storeId:{
        type: String,
        required: [true,'please add id store'],
        unique: true,
        trim: true,
        maxLength: [10,'store id must less than 10 chars']
    },
    adress:{
        type: String,
        required :[true,'please add address of store'],
       
    },
    location: {
        type: {
          type: String,
          enum: ['Point']
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress: String
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
});
storeSchema.pre('save',async function (next) {
  // geocoder take address from user and get longitude, latiude,and all details of this address
    const loc=await geocoder.geocode(this.adress)
    console.log(loc);
    this.location={
        type:'Point',
        coordinates:[loc[0].longitude,loc[0].latitude],
        formattedAddress:loc[0].formattedAddress
    };
    this.adress=undefined;
    next();
})

module.exports=mongoose.model('store',storeSchema)