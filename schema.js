const axios = require("axios");

const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  //GraphQLID,
} = require("graphql");

//before axios and using db
// const personnelData = [
//   { id: "1", name: "John Doe", age: 30, email: "johndoe@example.com" },
//   { id: "2", name: "John Doe2", age: 32, email: "johndoe2@example.com" },
//   { id: "3", name: "John Doe3", age: 33, email: "johndoe3@example.com" },
//   { id: "4", name: "John Doe4", age: 34, email: "johndoe4@example.com" },
// ];

const PersonnelType = new GraphQLObjectType({
  name: "Personnel",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    personnel: {
      type: PersonnelType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return axios
          .get("http://localhost:3000/personnelData/" + args.id)
          .then((res) => res.data);

        //-------------------------before axios 
        //access data--
        // for(let i=0; i<personnelData.length; i++){
        //     if(personnelData[i].id === args.id){
        //         return personnelData[i]
        //     }
        // }
        //------------------------------------------

        //------------------------------------before personnelData array
        // const personnelData = {
        //     id: args.id,
        //     name: "John Doe",
        //     email: "johndoe@example.com",
        //     age: 30
        //   };
        //-------------------------------------
      },
    },
    personnelData: {
      type: new GraphQLList(PersonnelType),
      resolve(parent, args) {
        // return personnelData;

        return axios
          .get("http://localhost:3000/personnelData")
          .then((res) => res.data);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPersonnel: {
      type: PersonnelType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        
      },
      async resolve(parent, args) {
        try {
          const res = await axios.post("http://localhost:3000/personnelData", {
            name: args.name,
            email: args.email,
            age: args.age,
          });
          // Return the data as the GraphQL mutation result
          return {
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
            age: res.data.age,
          };
        } catch (err) {
          throw new Error(
            "An error occurred during the API call: " + err.message
          );
        }
      },
      
    },
    deletePersonnel: {
        type: PersonnelType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve(parent, args) {
          return axios
            .delete("http://localhost:3000/personnelData/" + args.id)
            .then((res) => res.data)
            .catch((err) => {
              throw new Error(
                "An error occurred during the API call: " + err.message
              );
            });
        },
    },
    updatePersonnel:{
        type:PersonnelType,
        args:{
            id: { type: new GraphQLNonNull(GraphQLString) },
           name: { type: GraphQLString },
            email: { type: GraphQLString },
            age: { type: GraphQLInt },
        },
        resolve(parent,args){
            return axios.patch("http://localhost:3000/personnelData/" + args.id, args)
            .then(res => res.data)
        }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation,
});
