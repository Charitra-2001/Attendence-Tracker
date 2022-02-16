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
console.log(__dirname);
app.get("/favicon.ico", function (req, res) {
  res.status(204);
  res.end();
});
app.set("view engine", "ejs"); //using ejs & creating a new dir (views/list.ejs)

// var items =["Buy food", "Cook food", "Eat food"];
// let workItems = [];

// const durationSchema = {
//   value: Number
// };
const subjectSchema = {
  name: String,
  data: [],
  days: [],
  totalDays: [],
};
// const Duration = mongoose.model("Duration", durationSchema);

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
let i = 0;
const dayss = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "nxt"];

const listSchema = {
  name: String,
  items: [itemsSchema],
};
const List = mongoose.model("List", listSchema);

const userSchema = {
  uname: String,
  udays: [listSchema],
  uduration: Number,
  usubjects: [subjectSchema],
};

const User = mongoose.model("User", userSchema);

let userName;
let Name;
app.get("/", function (req, res) {
  i = 0;
  c = 0;
  res.render("welcome");
});
const daysss = days[i];
app.post("/reg", function (req, res) {
  i = 0;
  c = 0;
  userName = req.body.user;
  Name = userName;
  User.findOne({ uname: userName }, function (err, foundUser) {
    if (!err) {
      if (!foundUser) {
        const user = new User({
          uname: userName,
          udays: [],
          uduration: -1,
          usubjects: [],
        });
        user.save();
        res.redirect("/days/" + daysss + "/" + userName);
      } else {
        res.redirect("/Monday/" + userName);
      }
    }
  });
});
var l = 0;
// const days = ["Monday","Tuesday", "Wednesday", "Thursday", "Friday"];
app.get("/days/:daysss/:userName", async function (req, res) {
  i = 0;
  c = 0;
  const { userName } = req.params;
  console.log(req.params);
  let arr = [];

  User.findOne({ uname: userName }, (err, found) => {
    if (!err) {
      if (found) {
        console.log("L : ", found.udays.length);
        if (found.udays.length) {
          l = 1;
        }
      } else {
        console.log("NO");
      }
    } else {
      console.log("NOOOOO");
    }
  });
  console.log(l);
  // var l=(found.udays.length==="undefined"||found==="undefined")?l=0:l=1
  // console.log(l);
  // let arr=[];
  if (l === 0) {
    for (let j = 0; j < days.length; j++) {
      var list = new List({
        name: days[j],
        items: defaultItems,
      });
      arr.push(list);
    }
    User.updateOne(
      { uname: userName },
      { $set: { udays: arr } },
      function (err, found) {
        if (!err) {
          if (found) {
            console.log("yes");
          }
        }
      }
    );
    res.redirect("/days/" + dayss + "/" + userName);
  } else {
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

    res.redirect("/Monday/" + userName);
  }
});
app.get("/Monday/:userName", function (req, res) {
  i = 0;
  c = 0;
  const { userName } = req.params;
  console.log(req.params);
  User.findOne({ uname: userName }, function (err, found) {
    if (!err) {
      if (found) {
        // console.log(found)
        res.render("list", {
          title: found.udays[i].name,
          newListItems: found.udays[i].items,
          user: userName,
        });
      }
    }
  });
});
app.get("/Tuesday/:userName", function (req, res) {
  const { userName } = req.params;
  console.log(req.params);
  User.findOne({ uname: userName }, function (err, found) {
    if (!err) {
      if (found) {
        // console.log(found)
        res.render("list", {
          title: found.udays[1].name,
          newListItems: found.udays[1].items,
          user: userName,
        });
      }
    }
  });
});
app.get("/Wednesday/:userName", function (req, res) {
  const { userName } = req.params;
  console.log(req.params);
  User.findOne({ uname: userName }, function (err, found) {
    if (!err) {
      if (found) {
        // console.log(found)
        res.render("list", {
          title: found.udays[2].name,
          newListItems: found.udays[2].items,
          user: userName,
        });
      }
    }
  });
});
app.get("/Thursday/:userName", function (req, res) {
  const { userName } = req.params;
  console.log(req.params);
  User.findOne({ uname: userName }, function (err, found) {
    if (!err) {
      if (found) {
        // console.log(found)
        res.render("list", {
          title: found.udays[3].name,
          newListItems: found.udays[3].items,
          user: userName,
        });
      }
    }
  });
});
app.get("/Friday/:userName", function (req, res) {
  const { userName } = req.params;
  console.log(req.params);
  User.findOne({ uname: userName }, function (err, found) {
    if (!err) {
      if (found) {
        // console.log(found)
        res.render("list", {
          title: found.udays[4].name,
          newListItems: found.udays[4].items,
          user: userName,
        });
      }
    }
  });
});

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
  const u = req.body.user;
  console.log("u");
  const item = new Item({
    name: itemName,
  });
  if (c == 0) {
    User.findOne({ uname: u }, function (err, foundList) {
      if (!err) {
        if (foundList) {
          foundList.udays[0].items.push(item);
          foundList.save();
          console.log("FoundList : ", foundList);
        }
      }
      res.redirect("/Monday/" + u);
    });
  } else if (c == 1) {
    User.findOne({ uname: u }, function (err, foundList) {
      if (!err) {
        if (foundList) {
          foundList.udays[1].items.push(item);
          foundList.save();
          console.log("FoundList : ", foundList);
        }
      }
      res.redirect("/Tuesday/" + u);
    });
  } else if (c == 2) {
    User.findOne({ uname: u }, function (err, foundList) {
      if (!err) {
        if (foundList) {
          foundList.udays[2].items.push(item);
          foundList.save();
          console.log("FoundList : ", foundList);
        }
      }
      res.redirect("/Wednesday/" + u);
    });
  } else if (c == 3) {
    User.findOne({ uname: u }, function (err, foundList) {
      if (!err) {
        if (foundList) {
          foundList.udays[3].items.push(item);
          foundList.save();
          console.log("FoundList : ", foundList);
        }
      }
      res.redirect("/Thursday/" + u);
    });
  } else if (c == 4) {
    User.findOne({ uname: u }, function (err, foundList) {
      if (!err) {
        if (foundList) {
          foundList.udays[4].items.push(item);
          foundList.save();
          console.log("FoundList : ", foundList);
        }
      }
      res.redirect("/Friday/" + u);
    });
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
  c++;
  const u = req.body.user;

  console.log(u);
  console.log(c);
  res.redirect("/" + days[c] + "/" + u);
});

// ! This is the second page

app.post("/edit", function (req, res) {
  const u = req.body.user;
  res.redirect("/Monday" + "/" + u);
});

var value = 0;
var durationValue;
app.post("/dur", function (req, res) {
  durationValue = req.body.duration;
  const u = req.body.user;
  console.log(u);
  console.log(durationValue);
  User.findOne({ uname: u }, function (err, foundUser) {
    if (!err) {
      if (foundUser.uduration === -1) {
        value = durationValue;
        User.updateOne(
          { uname: u },
          { uduration: value },
          function (err, update) {
            if (!err) {
              console.log(update);
            }
            res.redirect("/nxt" + "/" + u);
          }
        );
      } else {
        value = durationValue;
        User.updateOne(
          { uname: u },
          { uduration: value },
          function (err, update) {
            if (!err) {
              console.log(update);
            }
            res.redirect("/nxt" + "/" + u);
          }
        );
      }
    }
  });
});

app.post("/modify", function (req, res) {
  value = 0;
  const u = req.body.user;
  res.redirect("/nxt" + "/" + u);
});

/////////////////////////////////////////////////////////////////////////

function findSub(sub, dayName) {
  for (let i = 0; i < sub.length; i++) {
    if (sub[i].name === dayName) return i;
  }
  return -1;
}

const Subject = mongoose.model("Subject", subjectSchema);
var arr = new Array();
let weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
app.get("/nxt/:userName", async function (req, res) {
  const { userName } = req.params;

  let x = await User.findOne({ uname: userName });
  console.log(x);

  // res.json(x)
  // let b=JSON.stringify(x);
  // console.log(x[0].items[0].name)
  for (let i = 0; i < x.udays.length - 1; i++) {
    arr[i] = new Array(x.udays[i].items.length - 2);
    for (let j = 0; j < x.udays[i].items.length; j++) {
      if (j == 0) {
        arr[i][j] = x.udays[i].name;
        continue;
      }
      if (j >= 3) {
        arr[i][j - 2] = x.udays[i].items[j].name;
        if (x.uduration === -1) {
          const ab = await User.findOne({ uname: userName });
          console.log(ab);
          const zz = findSub(ab.usubjects, x.udays[i].items[j].name);
          console.log(zz);
          if (zz === -1) {
            // console.log("HIIIIIIII");
            const newSub = new Subject({
              name: x.udays[i].items[j].name,
              data: [],
              days: x.udays[i].name,
              totalDays: [],
            });
            const ba = await User.updateOne(
              { uname: userName },
              {
                $set: {
                  usubjects: [...ab.usubjects, newSub],
                },
              }
            );
          } else {
            console.log(ab.usubjects[zz].name);
            User.findOne({ uname: userName }, function (err, found) {
              if (!err) {
                if (found) {
                  found.usubjects[zz].days.push(x.udays[i].name);
                  found.save();
                  console.log(found.usubjects);
                }
              }
              const length = ab.usubjects[zz].name.length;
              const semlength = length * required;
              User.updateOne(
                { uname: userName },
                {
                  $set: {
                    totalDays: semlength,
                  },
                }
              );
            });
          }
        }
      }
    }
  }

  // console.log(arr);
  res.redirect("/next/" + userName);
});
app.get("/next/:userName", function (req, res) {
  console.log(arr.length);
  const { userName } = req.params;
  res.render("secondpage", { data: arr, months: value, user: userName });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//// ! Third Page starts from Here

// const Subject = mongoose.model("Subject", subjectSchema);

//POST - ADDING DATES
function findSub(sub, dayName) {
  for (let i = 0; i < sub.length; i++) {
    if (sub[i].name === dayName) return i;
  }
  return -1;
}

app.post("/attendance/:userName", async function (req, res) {
  const { userName } = req.params;
  console.log(userName);
  const sol = req.body.datas;
  let today = new Date().toISOString().slice(0, 10);
  JSON.stringify(sol);
  console.log(sol.length);
  for (let i = 0; i < sol.length; i++) {
    console.log(i);
    const x = sol[i];
    const ab = await User.findOne({ uname: userName });
    // console.log(ab);
    const zz = findSub(ab.usubjects, sol[i]);
    if (zz === -1) {
      console.log("HIIIIIIII");
      const newSub = new Subject({
        name: sol[i],
        data: today,
        days: [],
        totalDays: [],
      });
      console.log(newSub);
      const ba = await User.updateOne(
        { uname: userName },
        {
          $set: {
            usubjects: [...ab.usubjects, newSub],
          },
        }
      );
    } else {
      console.log(ab.usubjects[zz].name);
      User.findOne({ uname: userName }, function (err, found) {
        if (!err) {
          if (found) {
            found.usubjects[zz].data.push(today);
            found.save();
            console.log(found.usubjects);
          }
        }
      });
    }
  }
  res.redirect("/total");
});

let work = [];

//FOR DAYS AND ALL
app.post("/subject", async function (req, res) {
  const u = req.body.user;
  res.redirect("/attendence" + "/" + u);
});

app.get("/attendence/:userName", async function (req, res) {
  console.log("I M HERE");
  const { userName } = req.params;
  const d = new Date();
  let day = d.getDay();
  const a = await User.findOne({ uname: userName });
  work.push(weekdays[day - 1]);
  if (a !== null) {
    for (let i = 3; i < a.udays[day - 1].items.length; i++) {
      work.push(a.udays[day - 1].items[i].name);
    }
  }

  res.redirect("/attend/" + userName);
});
app.get("/attend/:userName", function (req, res) {
  const { userName } = req.params;
  res.render("thirdpage", { day: work, user: userName });
});

// ! Forth page starts from here
let one = [];
let two = [];
let three = [];
let percentage=[];
var taking=0;
var taken=0;
app.post("/total/:userName", async function (req, res) {
  const {userName} = req.params;
  const t = await User.findOne({uname:userName});
  
  for (var i = 0; i < t.usubjects.length; i++) {
    one.push(t.usubjects[i].name);
    two.push(t.usubjects[i].data.length);
    let totaldays = t.usubjects[i].length * 4 * t.uduration;
    three.push(totaldays);
    var p=Math.round((t.usubjects[i].data.length/totaldays)*100);
    percentage.push(p);
    taking+=totaldays;
    taken+=t.usubjects[i].data.length;
  }
  var p=Math.round((taken/taking)*100);
  percentage.push(p);
  console.log(one, two, three);
  res.redirect("/allsubs/:userName");
});
app.get("/allsubs/:userName", function (req, res) {

  res.render("forthpage", { one: one, two: two, three: three,total:taking,taken:taken,per:percentage });
});

app.listen(3000, function () {
  console.log("Server UP");
});

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
