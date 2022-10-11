const Contacts=require('../models/Contacts')
const {upload}=require('../utils/multer');
const {cloudinary}=require('../utils/cloudinary');
const exceljs=require('exceljs')


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

const updateContact=async(req,res)=>{
  try{
    const cloudinaryResponse=await cloudinary.uploader.upload(req.file.path,{folder:'Contacts'});
    const{id,Name,Phone}=req.body;
    const response=await Contacts.updateOne({_id:id},
        {
            $set:{
                Name:Name,
                Phone:Phone,
                ContactImage:{
                    ImageUrl:cloudinaryResponse.secure_url,
                    CloudinaryId:cloudinaryResponse.public_id
                }
    
    
            }
        })
    res.status(200).json({'message':'contact updated'});

  }catch(err){
    res.status(500).json({'message':'error'});
  }
}

const searchContact=async(req,res)=>{
    const {SearchParameter,SearchValue}=req.body;
    if(SearchParameter==="Name"){
        try{
            const contacts=await Contacts.find({Name:SearchValue});
            res.status(200).json({contacts})
        }catch(err){
            res.status(404)
        }
    }else if(SearchParameter==="Name"){
        try{
            const contacts=await Contacts.find({Phone:SearchValue});
            res.status(200).json({contacts})
        }catch(err){
            res.status(404)
        }
    }else{
        res.status(400).json({'message':'invalid request'})
    }
}

const movetoExcel=async(req,res)=>{
    try{
        const workbook=new exceljs.Workbook()
        const worksheet=workbook.addWorksheet('Contacts')
        worksheet.columns=[{header:"s_no" ,key:'s_no' },{header:"Name" ,key:'Name' }, {header:"Phone" ,key:'Phone'}]
        let counter=1
      
      const result = await Contacts.find()
      result.forEach((contact)=>{
        contact.s_no=counter
         worksheet.addRow(contact)
         counter++
      }),
      
      worksheet.getRow(1).eachCell((cell)=>{
        cell.font={bold:true}
      })
      
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheatml.sheet"
      )
      
      res.setHeader("Content-Disposition",`attachment;filename=Contacts.xlsx`)
      return workbook.xlsx.write(res).then(()=>{
        res.status(200)
      })
      }catch(error){
          console.log(error.message)
        }
}

module.exports={
    getAllContacts,
    addContact,
    deleteContact,
    updateContact,
    searchContact,
    movetoExcel
    
}