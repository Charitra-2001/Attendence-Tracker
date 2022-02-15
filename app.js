const express = require("express");
const bodyParse = require("body-parser");
const mongoose = require("mongoose");
const read = require("body-parser/lib/read");
// mongoose.connect('mongodb+srv://admin-shubham:test123@cluster0.a5w6k.mongodb.net/todo', {useNewUrlParser: true});
mongoose.connect("mongodb://localhost:27017/TT", { useNewUrlParser: true });
// const date = require(__dirname+"/date.js");
const _ = require("lodash");
const { stringify } = require("nodemon/lib/utils");
const req = require("express/lib/request");
const { required } = require("nodemon/lib/config");
const { redirect } = require("express/lib/response");
const { name } = require("ejs");
const res = require("express/lib/response");
const app = express();

app.use(bodyParse.urlencoded({ extended: true }));
app.use(express.static(__dirname));
console.log(__dirname)
app.get('/favicon.ico', function(req, res) { 
  res.status(204);
  res.end();    
});
app.set("view engine", "ejs"); //using ejs & creating a new dir (views/list.ejs)

// var items =["Buy food", "Cook food", "Eat food"];
// let workItems = [];
const durationSchema = {
  name: String,
  value: Number,
};

const Duration = mongoose.model("Duration", durationSchema);

//SCHEMA
const itemsSchema = {
  name: String,
};
//MODEL
const Item = mongoose.model("Item", itemsSchema);
//NEW ITEMS
const item1 = new Item({
  name: "Welcome",
});
const item2 = new Item({
  name: "+ to add an item",
});
const item3 = new Item({
  name: "- to delete an item",
});

// adding all the items into an array
const defaultItems = [item1, item2, item3];
let c = 0;
let i=0
const dayss = ["Monday","Tuesday", "Wednesday", "Thursday", "Friday"];
const days = ["Monday","Tuesday", "Wednesday", "Thursday", "Friday","nxt"];

const listSchema = {
  name: String,
  items: [itemsSchema],
};
const List = mongoose.model("List", listSchema);


const userSchema={
  uname:String,
  udays:[listSchema]
}

const User=mongoose.model("User",userSchema)

let userName;
let Name;
app.get("/",function(req,res){
  i=0
  c=0
res.render("welcome")
})
const daysss=days[i]
app.post("/reg",function(req,res)
{
  i=0
  c=0
  userName= req.body.user;
  Name=userName
  User.findOne({uname:userName},function(err,foundUser){
    if(!err)
    {
      if(!foundUser)
      {
        const user= new User({
          uname:userName,
          udays:[]
          
        });
        user.save();
        res.redirect("/days/"+daysss+"/"+userName)
      }
      else{
        res.redirect("/Monday/"+userName);
      }
    }
  })
})
var l=0;
// const days = ["Monday","Tuesday", "Wednesday", "Thursday", "Friday"];
app.get("/days/:daysss/:userName", async function (req, res) { 
  i=0
  c=0
    const {userName}=(req.params)
    console.log(req.params)
    let arr=[]
    
    User.findOne({uname:userName},(err,found)=>{

      if(!err)
      {
        if(found)
        {
          console.log("L : ",found.udays.length)
          if(found.udays.length)
          {
            l=1;
          }
        }
        else{
          console.log("NO");
        }
      }
      else{
        console.log("NOOOOO");
      }
    })
    console.log(l)
    // var l=(found.udays.length==="undefined"||found==="undefined")?l=0:l=1
    // console.log(l);
    // let arr=[];
    if(l===0)
    {
      for(let j=0;j<days.length;j++)
      {
        var list=new List({
          name:days[j],
          items:defaultItems
        })
        arr.push(list);
      }
      User.updateOne({uname:userName},{$set:{udays:arr}},function(err,found){

        if(!err)
        {
          if(found)
          {
            console.log("yes")
          }
        }

      })
      res.redirect("/days/"+dayss+"/"+userName)
    }
    else{
      // User.findOne({uname:userName},function(err,found){

      //   if(!err)
      //   {
      //     if(found)
      //     {
      //       res.render("list", {
      //         title: found.udays[i].name,
      //         newListItems: found.udays[i].items,
      //       });
      //     }
      //   }

      // })
      
        res.redirect("/Monday/"+userName);
    }

  
  
});
app.get("/Monday/:userName",function(req,res){
  i=0;
  c=0
  const {userName}=req.params;
  console.log(req.params)
  User.findOne({uname:userName},function(err,found){

          if(!err)
          {
            if(found)
            {
              // console.log(found)
              res.render("list", {
                title: found.udays[i].name,
                newListItems: found.udays[i].items,user:userName
              });
            }
          }
        })
})
app.get("/Tuesday/:userName",function(req,res){
  const {userName}=req.params;
  console.log(req.params)
  User.findOne({uname:userName},function(err,found){

          if(!err)
          {
            if(found)
            {
              // console.log(found)
              res.render("list", {
                title: found.udays[1].name,
                newListItems: found.udays[1].items,user:userName
              });
            }
          }
        })
})
app.get("/Wednesday/:userName",function(req,res){
  const {userName}=req.params;
  console.log(req.params)
  User.findOne({uname:userName},function(err,found){

          if(!err)
          {
            if(found)
            {
              // console.log(found)
              res.render("list", {
                title: found.udays[2].name,
                newListItems: found.udays[2].items,user:userName
              });
            }
          }
        })
})
app.get("/Thursday/:userName",function(req,res){
  const {userName}=req.params;
  console.log(req.params)
  User.findOne({uname:userName},function(err,found){

          if(!err)
          {
            if(found)
            {
              // console.log(found)
              res.render("list", {
                title: found.udays[3].name,
                newListItems: found.udays[3].items,user:userName
              });
            }
          }
        })
})
app.get("/Friday/:userName",function(req,res){
  const {userName}=req.params;
  console.log(req.params)
  User.findOne({uname:userName},function(err,found){

          if(!err)
          {
            if(found)
            {
              // console.log(found)
              res.render("list", {
                title: found.udays[4].name,
                newListItems: found.udays[4].items,user:userName
              });
            }
          }
        })
})
// app.get("/:userName",function(req,res){
//   const {userName}=(req.params)
//   const k=0
//   console.log(userName)
//   console.log("SUCcESS")

// })

// // Item.find({},function(err,found){

// //     if(found.length === 0){
// //         Item.insertMany(defaultItems,function(err){
// //             if(err)
// //             {
// //                 console.log(err);
// //             }
// //             else{
// //                 console.log("INSERTED");
// //             }
// //         });
// //         res.render("list", {title: "Monday", newListItems: found})
// //     }
// //     else
// //     {
// //         res.render("list", {title: "Monday", newListItems: found})
// //     }
// // });
// // res.render("list", {title: Today, newListItems: items});
// // });

// // app.get("/work", function(req, res){
// //     res.render("list", {title: "Work List", newListItems: workItems})
// // });

// // app.get("/:customList",function(req,res){
// //     const customListName = _.capitalize(req.params.customList);  //after the slash
// //     List.findOne({name: customListName},function(err,foundList){
// //         if(!err){
// //             if(!foundList)
// //             {
// //                 const list=new List({
// //                     name: customListName,
// //                     items: defaultItems
// //                 });
// //                 list.save();
// //                 res.redirect("/" + customListName);
// //             }
// //             else{
// //                 res.render("list", {title: foundList.name, newListItems: foundList.items })
// //             }
// //         }
// //     });

// // });

// // app.post("/work", function(req,res)
// // {
// //     let item = req.body.listItem
// //     workItems.push(item);

// //     res.redirect("/work")
// // })

app.post("/", function (req, res) {
  const itemName = req.body.listItem;
  const listName = req.body.list;
  const u=req.body.user
  console.log("u")
  const item = new Item({
    name: itemName,
  });
    if (c==0){
      User.findOne({uname:u }, function (err, foundList) {
        if(!err){
          if(foundList){
            foundList.udays[0].items.push(item);
            foundList.save();
            console.log("FoundList : ",foundList)
          }
        }
      res.redirect("/Monday/"+u);
    })
  } 
    else if (c == 1) {
      User.findOne({uname:u }, function (err, foundList) {
        if(!err){
          if(foundList){
            foundList.udays[1].items.push(item);
            foundList.save();
            console.log("FoundList : ",foundList)
          }
        }
      res.redirect("/Tuesday/"+u);
    })
    } 
    else if (c ==2) {
      User.findOne({uname:u }, function (err, foundList) {
        if(!err){
          if(foundList){
            foundList.udays[2].items.push(item);
            foundList.save();
            console.log("FoundList : ",foundList)
          }
        }
      res.redirect("/Wednesday/"+u);
    })
    } 
    else if (c ==3) {
      User.findOne({uname:u }, function (err, foundList) {
        if(!err){
          if(foundList){
            foundList.udays[3].items.push(item);
            foundList.save();
            console.log("FoundList : ",foundList)
          }
        }
      res.redirect("/Thursday/"+u);
    })
    } 
    else if (c == 4) {
      User.findOne({uname:u }, function (err, foundList) {
        if(!err){
          if(foundList){
            foundList.udays[4].items.push(item);
            foundList.save();
            console.log("FoundList : ",foundList)
          }
        }
      res.redirect("/Friday/"+u);
    })
    }
  });


//   // if (req.body.list === "Work") {
//   //     workItems.push(item);
//   //     res.redirect("/work");
//   // }
//   // else{
//   //     items.push(item)
//   //     console.log(items);
//   //     res.redirect("/");}
// });

// // app.post("/:tue", function(req,res){
// //     res.redirect("/Tuesday");
// // });

// // app.post("/:wed", function(req,res){
// //     res.redirect("/Wednesday");
// // });
app.post("/days", function (req, res) {
  c++
  const u=req.body.user

  console.log(u)
  console.log(c)
  res.redirect("/" +days[c]+"/"+u);
  
});
// app.post("/edit", function (req, res) {

//   res.redirect("/");
// });
// var value = 0;

// var durationValue;
// app.post("/dur", function (req, res) {
//   durationValue = req.body.duration;

//   Duration.findOne({ name: "duration" }, function (err, found) {
//     if (!err) {
//       if (!found) {
//         value = durationValue;
//         const val = new Duration({
//           name: "duration",
//           value: durationValue,
//         });
//         val.save();
//         res.redirect("/" + "nxt");
//       } else {
//         value = durationValue;
//         Duration.updateOne(
//           { name: "duration" },
//           { value: value },
//           function (err, update) {
//             if (!err) {
//               console.log(update);
//               res.redirect("/" + "nxt");
//             }
//           }
//         );
//       }
//     }
//   });
// });
// app.post("/modify", function (req, res) {
//   value = 0;
//   res.redirect("/nxt");
// });
// // app.post("/delete",function(req,res){
// //     console.log(req.body);
// //     const checkedItem=req.body.checkbox;
// //     const listName = req.body.listName;
// //     if (listName==="Today") {
// //         Item.findByIdAndRemove(checkedItem,function(err){
// //             if(err){
// //                 console.log(err);
// //             }
// //             else
// //             {
// //                 console.log("deleted checked item");
// //                 res.redirect("/");
// //             }
// //         });
// //     }
// //     else{
// //         List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItem}}},function(err,founndList){
// //             if(!err){
// //                 res.redirect("/"+listName);
// //             }
// //         });
// //     }
// // });
// // Here we start for the second page

// // app.get("/"+"nextpage",(req,res)=>{

// //     weekdays.forEach((result)=>{

// //          List.findOne({name:result},function(err,found){

// //             if(!err)
// //             {
// //                 if(found)
// //                 {
// //                     const abc=[];

// //                     for(let i=3;i<found.items.length;i++)
// //                     {
// //                         abc.push(found.items[i]);
// //                     }
// //                     res.render('secondpage',{title:found.name, data:abc})
// //                     res.red
// //                     // res.json(ans)
// //                 }
// //             }

// //         });

// //     })

// // app.get("/nxt",function(req,res){

// // count=0;
// // for(var j=0;j<weekdays.length;j++)
// // {
// //     List.findOne({name:weekdays[count]},function(err,found){

// //     if(!err)
// //     {
// //         if(found)
// //         {

// //                 abc.push(found.items);

// //             // res.render('secondpage',{title:found.name, data:abc})
// //         }
// //     }
// //     // console.log(abc.length);
// //     });
// //     count++;
// // }
// // console.log( abc.length);
// // res.render("secondpage",{title:weekdays, data:abc})

// // })

// // })
// let a = [],
//   b = [],
//   c = [];
// var arr = new Array();
// let weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
// app.get("/nxt", async function (req, res) {
//   //     List.findOne({name:"Monday"},function(err,found){
//   //         if(!err)
//   //         {
//   //             if(found)
//   //             {
//   //                 for(let i=3;i<found.items.length;i++)
//   //                 {
//   //                         a.push(found.items[i].name);

//   //                 }

//   //             }
//   //         }
//   //     });
//   // List.findOne({name:"Tuesday"},function(err,found){
//   //     if(!err)
//   //     {
//   //         if(found)
//   //         {
//   //                 for(let i=3;i<found.items.length;i++)
//   //                 {
//   //                     b.push(found.items[i].name);
//   //                 }
//   //         }
//   //         res.render('secondpage',{name:"Tuesday",data:b})
//   //         b=[]
//   //     }
//   // });

//   let x = await List.find({});

//   // res.json(x)
//   // let b=JSON.stringify(x);
//   // console.log(x[0].items[0].name)
//   for (let i = 0; i < x.length; i++) {
//     arr[i] = new Array(x[i].items.length - 2);
//     for (let j = 0; j < x[i].items.length; j++) {
//       if (j == 0) {
//         arr[i][j] = x[i].name;
//         continue;
//       }
//       if (j >= 3) arr[i][j - 2] = x[i].items[j].name;
//     }
//   }
//   console.log(arr);
//   res.redirect("/next");
// });
// app.get("/next", function (req, res) {
//   console.log(arr.length);
//   res.render("secondpage", { data: arr, months: value });
// });

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // ! Third Page starts from Here

// const subjectSchema = {
//   name: String,
//   data: [],
//   days: [],
//   totalDays: [],
// };
// const Subject = mongoose.model("Subject", subjectSchema);

// // function check(y,z)
// // {
// //     for(var i=0;i<y.length;i++)
// //     {
// //         if(y[i].name===z)return false;
// //         console.log(y[i].name)
// //     }
// //     return true;
// // }

// let week;

// //POST - ADDING DATES
// app.post("/attendance", async function (req, res) {
//   const sol = req.body.datas;
//   let today = new Date().toISOString().slice(0, 10);
//   // let t=new Item({
//   //     name:today
//   // })
//   // console.log(sol);
//   JSON.stringify(sol);
//   console.log(sol.length);
//   for (let i = 0; i < sol.length; i++) {
//     console.log(i);
//     const x = sol[i];
//     //     Subject.findOne({name:sol[i]},function(err,found){
//     //         if(!err){
//     //             console.log(found.name)
//     //             Subject.findOneAndUpdate({name:found.name},{$push:{data:today}},function(err,added){
//     //                 if(!err)
//     //                 {
//     //                     console.log("Added")
//     //                 }
//     //             })
//     //             // found.data.push(today);
//     //     }
//     // })
//     const ab = await Subject.findOne({ name: x });
//     if (ab === null) {
//       const cr = await Subject.create({ name: x, data: today });
//       console.log(cr);
//     } else {
//       console.log(x);
//       const se = await Subject.updateOne(
//         { name: x },
//         {
//           $set: {
//             data: [...ab.data, today],
//           },
//         }
//       );
//     }
//   }
//   res.redirect("/total")
// });

// let work = [];

// //FOR DAYS AND ALL
// app.get("/subject", async function (req, res) {
//   const month = await Duration.findOne({ name: "duration" });
//   console.log(month.value);
//   var required = month.value * 4;
//   week = required;
//   console.log(required);
//   console.log(weekdays.length);
//   for (let k = 0; k < weekdays.length; k++) {
//     const weekday = weekdays[k];
//     console.log(weekday);
//     const day = await List.findOne({ name: weekday });
//     {
//       for (i = 3; i < day.items.length; i++) {
//         const sub = await Subject.findOne({ name: day.items[i].name });
//         {
//           if (sub === null) {
//             const newSub = await Subject.create({
//               name: day.items[i].name,
//               days: required,
//             });
//             console.log(newSub);
//           } else {
//             const updateSub = await Subject.updateOne(
//               { name: day.items[i].name },
//               {
//                 $set: {
//                   days: [...sub.days, required],
//                 },
//               }
//             );
//           }
//           const find = await Subject.findOne({ name: day.items[i].name });

//           const length = find.days.length;
//           const semLength = length * required;

//           const total = await Subject.updateOne(
//             { name: day.items[i].name },
//             {
//               $set: {
//                 totalDays: semLength,
//               },
//             }
//           );
//         }
//       }
//     }
//   }
//   res.redirect("/attendence");
// });

// app.get("/attendence", async function (req, res) {
//   const d = new Date();
//   let day = 1
//   const a = await List.findOne({ name: weekdays[day - 1] });
//   work.push(weekdays[day - 1]);
//   if (a !== null) {
//     for (let i = 3; i < a.items.length; i++) {
//       work.push(a.items[i].name);
//     }
//   }

//   res.redirect("/attend");
// });
// app.get("/attend", function (req, res) {
//   res.render("thirdpage", { day: work });
// });

// // ! Forth page starts from here
// let one = [];
// let two = [];
// let three = [];
// let percentage=[];
// var taking=0;
// var taken=0;
// app.post("/total", async function (req, res) {
//   const t = await Subject.find({});
//   console.log(t.length);
//   for (var i = 0; i < t.length; i++) {
//     one.push(t[i].name);
//     two.push(t[i].data.length);
//     three.push(t[i].totalDays[0]);
//     var p=Math.round((t[i].data.length/t[i].totalDays)*100);
//     percentage.push(p);
//     taking+=t[i].totalDays[0];
//     taken+=t[i].data.length;
//   }
//   var p=Math.round((taken/taking)*100);
//   percentage.push(p);
//   console.log(one, two, three);
//   res.redirect("/allsubs");
// });
// app.get("/allsubs", function (req, res) {
//   res.render("forthpage", { one: one, two: two, three: three,total:taking,taken:taken,per:percentage });
// });

app.listen(3000, function () {
  console.log("Server UP");
});