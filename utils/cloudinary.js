const cloudinary=require('cloudinary').v2;


cloudinary.config({
    cloud_name:"dkjlzojki",
    api_key:"363382786262711",
    api_secret:"CnIoLvNjLqZgzaanKendj56s1K0"
});


module.exports = { cloudinary };