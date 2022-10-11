# bitroot_backend_test

API ENDPOINTS

url: /addContact method:post
Body:Name,Phone,ContactImage
result:will add contact to database

url: /getAllContacts method:get
result:will return all contacts

url:/updateContact method:post
Body:Name,Phone,ContactImage
result:will update contact

url:/deleteContact method:delete Body:id result:will delete contact with id=id

url:/searchContact Body:SearchParameter:Name/Phone,SearchValue 

url:/movetoExcel result:will download excel file with contacts


