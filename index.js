const express = require("express")
const app = express();
const mongoose = require("mongoose")
const path = require("path");
const Chat = require("./models/chats.js");
const methodOverride = require("method-override")

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main()
.then((res)=>{
    console.log("Connection sucessful");
})
.catch(err => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};

// let chat1 = new Chat({
//     from: "Jhon",
//     to: "number1",
//     message: "Send the adress for robbery",
//     created_at: new Date()
// });

// chat1.save()
// .then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })

//index Route
app.get("/chats", async (req, res)=>{
    let chats = await Chat.find();
    res.render("index.ejs", {chats});
});

app.get("/chats/new", (req, res)=>{
   res.render("createChat.ejs")
});

//create route
app.post("/chats",(req, res)=>{
    let {from, to, message} = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        message: message,
        created_at:new Date(),
    });

    newChat.save()
    .then((res)=>{
       console.log(res);
    }).catch((err)=>{
        console.log(err);
    });

    res.redirect("/chats");
});

//Edit route
app.get("/chats/:id/edit", async (req, res)=>{
    let id = req.params.id;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
})

//update route
app.put("/chats/:id", async (req, res)=>{
    let {id} = req.params;
    let {message:newChat} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
        id, 
        {message:newChat},
        {runValidators:true, new:true}
    );
    console.log(updatedChat);
    res.redirect("/chats");
    
});

//delete route
app.delete("/chats/:id", async (req, res)=>{
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");

})

app.get("/", (req, res)=>{
    res.send("App is Working");
});



app.listen(8080, ()=>{
    console.log("Server is running on port 8080");
});