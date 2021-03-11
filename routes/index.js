const express = require('express');
const app = require('../app');
const router = express.Router();


/* GET home page. */
router.get('/',(req,res,next)=>{

  const {con}=req;
  // var db=req.con;
  let data="";

  con.query('SELECT * FROM  mywork',(err,rows)=>{
    if(err){
      console.log(err);
    }
      data=rows;
    res.render('default',{ title:'垃圾',data});

  });

});


router.get('/add',(req,res,next)=>{
  res.render('userAdd',{title:'新增一筆資料'})
});

// 將前端取得的資料放到後端使用POST新增
router.post('/userAdd',(req,res,next)=>{
  // var db=req.con;
  const {con}=req;
  const {mywork,date,teammember}=req.body;
  let  sql={
      mywork:mywork,
      data:date,
      teammember:teammember      
  };

    con.query('INSERT INTO mywork SET ?',sql,(err,rows)=>{
      if(err){
        console.log("新增資料筆數錯誤</n>"+err);
      }
      res.setHeader('Content-Type','application/json');
      res.redirect('/');
  });
});

// Get兩種方法
router.get('/db/:id',(req,res,next)=>{
  const {token,hi} = req.query;
  const {id} = req.params;
  res.status(200).json({id})
})





module.exports = router;
