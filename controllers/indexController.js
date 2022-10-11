const Contacts=require('../models/Contacts')
const {upload}=require('../utils/multer');
const {cloudinary}=require('../utils/cloudinary');

const addContact=async (req,res)=>{

    try{
        const cloudinaryResponse=await cloudinary.uploader.upload(req.file.path,{folder:'Contacts'});
        await Contacts.create(
            {
                Name:req.body.Name,
                Phone:req.body.Phone,
                ContactImage:{
                    ImageUrl:cloudinaryResponse.secure_url,
                    CloudinaryId:cloudinaryResponse.public_id
                }
    
    
            }
        );
            res.status(200).json({'message':'contact added'})
    }catch(err){
        res.status(500);
    }
    


}


const getAllContacts=async(req,res)=>{
const contacts=await Contacts.find({});
res.status(200).json({contacts});
}

const deleteContact=async(req,res)=>{
    console.log(req.body.id);
    try{
        const response=await Contacts.findByIdAndDelete({_id:req.body.id});
        if(response){
            res.status(200).json({'message':'contact deleted'})
        }
    }catch(err){
        res.status(404).json({'message':'this contact is unavailable'});
    }
   
}


module.exports={
    getAllContacts,
    addContact,
    deleteContact
}