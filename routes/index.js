const { Router } = require('express');
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


//Edit page
router.get('/userEdit',function(req,res,next){
  
  var id=req.query.id;
  var db=req.con;
  var data="";

  db.query('SELECT * FROM mywork where id = ?',id,function(err,rows){
    if(err){
      console.log(err);
    }

    var data=rows;
    res.render('userEdit',{title:'Edit AAA',data:data})
  })

})

//丟資料回資料庫中
router.post('/userEdit',function(req,res,next){
  var db=req.con;
  var id = req.body.id;//忘記給id
  const {mywork,date,teammember}=req.body;

  let  sql={
      mywork:mywork,
      data:date,
      teammember:teammember      
  };

  var qur=db.query('UPDATE mywork SET ? WHERE id = ?',[sql,id],function(err,rows){
    if(err){
       console.log(err);
    }

    res.setHeader('Content-Type','application/json');//??
    res.redirect('/');

  });
});

router.get('/userDelete',function(req,res,next){
  var id=req.query.id;
  var db=req.con;
  var qur=db.query('DELETE FROM mywork WHERE id = ?',id,function(err,rows){
    if(err){
      console.log(err);
    }
    res.redirect('/')
  })
});

router.get('/',function(req,res,next){
  var db=req.con;
  var data="";

  var mywork = "";
  var user = req.query.mywork;

  var filter = "";
  if (mywork) {
      filter = 'WHERE mywork = ?';
  }

  db.query('SELECT * FROM mywork ' + filter, mywork, function(err, rows) {
      if (err) {
          console.log(err);
      }
      var data = rows;

      // use index.ejs
      res.render('index', { title: 'Account Information', data: data, mywork: mywork });
  });
});


module.exports = router;
