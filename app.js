//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");
const homeStartingContent = "This is blog website where you can enjoy your blogging on day to day basis by creating new blogs daily and sharing your experiences here. .";
const aboutContent = "I am Vigneshwar Ravindran Currently pursuing my bachelors of Engineering in Cse from National Institute of Engineering Mysore .Very much passionate towards coding and Web development.";
const contactContent = "You can Follow me on Linkedin.And for more queries you can mail me at: vigneshwarpanni3@gmail.com.";

const app = express();
let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res){
res.render("home",{Startingcontent:homeStartingContent
,posts:posts});

})

 app.get("/contact",function(req,res){
  res.render("contact",{Contactcontent:contactContent});
 })
 app.get("/about",function(req,res){
  res.render("about",{Aboutcontent:aboutContent});
 })
 app.get("/compose",function(req,res){
  res.render("compose");
 });

app.post("/compose",function(req,res){
 
 const post={
 title:req.body.postTitle,
 content:req.body.postBody
 }; 
 posts.push(post);
 res.redirect("/");
});

//in  order to tap into dynamic url below thing is used
app.get("/posts/:postName",function(req,res){
const requestedTitle= _.lowerCase(req.params.postName); //lodash yaha pe basically hum jabh local host lower case yaa uppercase daale file ka naam woh dono mai kholyega
posts.forEach(function(post){
  const storedTitle=_.lowerCase(post.title);
  if(storedTitle===requestedTitle){
    res.render("post",{
      title:post.title,
      content:post.content
    })
  }
})

})




app.listen(3006, function() {
  console.log("Server started on port 3000");
});
