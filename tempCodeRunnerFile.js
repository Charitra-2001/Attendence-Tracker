app.post("/go",function(req,res){
  const u=req.body.user
  console.log(u)
  res.redirect("/home/" + u)
})