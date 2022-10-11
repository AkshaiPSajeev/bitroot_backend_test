const mongoose=require('mongoose');

const Contacts=mongoose.Schema(
    {   
        Name:{type:String,required:true},
        Phone:{type:[String],unique:true},
        ContactImage:{
            ImageUrl:{type:String},
            CloudinaryId:{type:String}
        },
    },
    {
        collection:'Contacts'
    }
);

module.exports=mongoose.model('Contacts',Contacts);