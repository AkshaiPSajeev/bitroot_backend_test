const express=require('express');
const { addContact, getAllContacts, deleteContact, updateContact, searchContact, movetoExcel } = require('../controllers/indexController');
const router=express.Router();
const upload=require('../utils/multer');


router.post('/addContact',upload.single('ContactImage'),addContact);
router.get('/getAllContacts',getAllContacts);
router.post('/updateContact',upload.single('ContactImage'),updateContact);
router.delete('/deleteContact',deleteContact);
router.get("/searchContact",searchContact)
router.get('/movetoExcel',movetoExcel);

module.exports=router;