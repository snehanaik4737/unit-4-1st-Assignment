const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://SnehaNaik:sneha12347@cluster0.1cxuc.mongodb.net/web-15?retryWrites=true&w=majority"
  );
};

//1.user schema
//creating schema

const userSchema =new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
},
{
    versionKey: false,
    timestamps: true, // createdAt, updatedAt
  }

)

//creating the model 
const User = mongoose.model("user", userSchema); // user => users 

const booksSchema = new mongoose.Schema({
    
  name: { type: String, required: true },
  body: { type: String, required: true },
  // sectionId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "section",
  //   required: true,
  // }, 
},
{
versionKey: false,
timestamps: true, // createdAt, updatedAt
})


const Book = mongoose.model("book",booksSchema);

//2.sections schema
const sectionSchema = new mongoose.Schema({
    name:{type:String,required:true},
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
      required: true,
    }, 
  
},
{
    versionKey: false,
    timestamps: true, // createdAt, updatedAt
  }

)
 const Section = mongoose.model("section",sectionSchema)

const authorSchema = new mongoose.Schema(
  {
   
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true, // createdAt, updatedAt
  }
);

const Author = mongoose.model("author",authorSchema )

const book_authorSchema = new mongoose.Schema(
    {
      
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "book",
          required: true,
        },
        authorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "author",
          required: true,
        },
      },
      {
        versionKey: false,
        timestamps: true,
      })



const Book_author= mongoose.model("book_author", book_authorSchema )

app.get("/users", async (req, res) => {
    try {
      const users = await User.find().lean().exec();
  
      return res.status(200).send({ users: users }); // []
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Something went wrong .. try again later" });
    }
  });
  
  app.post("/users", async (req, res) => {
    try {
      const user = await User.create(req.body);
  
      return res.status(201).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });


  app.get("/sections",async(req,res)=>{
    try {
      const section =  await Section.find().lean().exec();
      return res.status(200).send({section:section})
      
    } catch (error) {
      return res
      .status(500)
      .send({ message:error.message });
  }
    })

    app.post("/sections", async (req, res) => {
      try {
        const section = await Section.create(req.body);
    
        return res.status(201).send(section);
      } catch (err) {
        return res.status(500).send({ message: err.message });
      }
    });

    app.get("/sections/:name", async (req, res) => {
      try {
        const section = await Section.find({name:req.params.name}).lean().exec();
        // db.users.findOne({_id: Object('622893471b0065f917d24a38')})
  
        return res.status(200).send(section);
      } catch (err) {
        return res.status(500).send({ message: err.message });
      }
    });    


    app.get("/books",async(req,res)=>{
      try {
        const books=  await Book.find().lean().exec();
        return res.status(200).send({books:books})
        
      } catch (error) {
        return res
        .status(500)
        .send({ message:error.message });
    }
      })
  
      app.post("/books", async (req, res) => {
        try {
          const book = await Book.create(req.body);
      
          return res.status(201).send(book);
        } catch (err) {
          return res.status(500).send({ message: err.message });
        }
      });

      app.get("/books/:name", async (req, res) => {
        try {
          const book = await Book.find({name:req.params.name}).lean().exec();
          // db.users.findOne({_id: Object('622893471b0065f917d24a38')})
    
          return res.status(200).send(book);
        } catch (err) {
          return res.status(500).send({ message: err.message });
        }
      });    
  
    
      app.get("/authors",async(req,res)=>{
        try {
          const author=  await Author.find().lean().exec();
          return res.status(200).send({author:author})
          
        } catch (error){
          return res
          .status(500)
          .send({ message:error.message });
      }
        })
    
        app.post("/authors", async (req, res) => {
          try {
            const author = await Author.create(req.body);
        
            return res.status(201).send(author);
          } catch (err) {
            return res.status(500).send({ message: err.message });
          }
        });


        app.get("/book_author",async(req,res)=>{
          try {
            const book_author=  await Book_author.find().populate().lean().exec();
            return res.status(200).send({book_author:book_author})
            
          } catch (error){
            return res
            .status(500)
            .send({ message:error.message });
        }
       })
      
          app.post("/book_author", async (req, res) => {
            try {
              const book_author = await  Book_author.create(req.body);
          
              return res.status(201).send(book_author);
            } catch (err) {
              return res.status(500).send({ message: err.message });
            }
          });
  

          app.get("/book_author/:id", async (req, res) => {
            try {
              const book_author = await Book_author.find({authorId:req.params.id}).populate({
                path:"bookId",
                select:{name:1}
              }).lean().exec();
          
              return res.status(201).send(book_author);
            } catch (err) {
              return res.status(500).send({ message: err.message });
            }
          });
  

  
app.listen(5000,async()=>{
   try {
       await connect();
       
   } catch (error) {
       console.log(error);
   }
   console.log("Listening at port 5000");
})