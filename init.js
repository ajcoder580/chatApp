const mongoose = require("mongoose");
const Chat = require("./models/chats");

main()
.then((res)=>{
    console.log("Connection sucessful");
})
.catch(err => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};

let allchats = [
    {
        from:"priya",
        to:"sai",
        message:"Ka hal ba ho kreja",
        created_at: new Date()
    },
    {
        from:"Dilip",
        to:"Kiran",
        message:"Debu ki nah ho",
        created_at: new Date()
    },
    {
        from:"Om",
        to:"Mansi",
        message:"kya ho raha hai moti",
        created_at: new Date()
    },
    {
        from:"Rahul",
        to:"Jay",
        message:"Ki sab ho raha hai bhai",
        created_at: new Date()
    },
    {
        from:"Ravi",
        to:"Riya",
        message:"Kya sab bolte rahto ho sabko",
        created_at: new Date(),
    },
    {
        from:"Shubham",
        to:"Neha Thakur",
        message:"Milne kab aa rahi ho. Ham santosh pagal nahi hai",
        created_at: new Date()
    },
    {
        from:"Chandan",
        to:"Trisha",
        message:"Pul ke niche ao chumma lena hai",
        created_at: new Date()
    }
];

Chat.insertMany(allchats);