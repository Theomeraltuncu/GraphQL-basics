# GraphQL basics 
simple crud operations

# Used Technologies
- Express
- Axios
- Json-server


# Screenshot

![](/1.png)
![](/2.png)

# Requests

http://localhost:4000/playground for requests.


----------------------
ex-1 get one person

{personnel(id:"2"){
  name,
  id,
  email,
  age
}}

----------------------
ex-2 get all personnels

{
  personnelData{
    name
    age
  }
}

-----------------------
crud with mutation 
-----------------------
ex-3 add personnel 

mutation {
  addPersonnel(name: "newname", email: "newnamemail@mail.com", age: 20) {
    id
    name
    age
    email
  }
}

----------------------
ex-4 delete personnel 

mutation {
  deletePersonnel(id:"a480"){id}
  
}

-------------------

