var express = require('express');
var router = express.Router();
let categorySchema = require('../schemas/category')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let categories = await categorySchema.find({})
  res.status(200).send({
    success:true,
    data:categories
  });
});
router.get('/:id', async function(req, res, next) {
  try {
    let id = req.params.id;
    let category = await categorySchema.findById(id)
    res.status(200).send({
      success:true,
      data:category
    });
  } catch (error) {
    res.status(404).send({
      success:false,
      message:error.message
    });
  }
});
router.post('/', async function(req, res, next) {
  try {
    let body = req.body;
    let newcategory = new categorySchema({
      name:body.name,
      description:body.description?body.description:0
    });
    await newcategory.save()
    res.status(200).send({
      success:true,
      data:newcategory
    });
  } catch (error) {
    res.status(404).send({
      success:false,
      message:error.message
    });
  }
});
router.put('/:id', async function(req, res, next) {
  try {
    let id = req.params.id;
    let category = await categorySchema.findById(id);
    if(category){
      let body = req.body;
      if(body.name){
        category.name = body.name;
      }
      if(body.description){
        category.description = body.description;
      }
      await category.save()
      res.status(200).send({
        success:true,
        data:category
      });
    }else{
      res.status(404).send({
        success:false,
        message:"ID khomng ton tai"
      });
    }
  } catch (error) {
    res.status(404).send({
      success:false,
      message:error.message
    });
  }
});
router.delete('/:id', async function(req, res, next) {
  try {
    let id = req.params.id;
    let category = await categorySchema.findById(id);
    if(category){
      category.isDeleted = true
      await category.save()
      res.status(200).send({
        success:true,
        data:category
      });
    }else{
      res.status(404).send({
        success:false,
        message:"ID khomng ton tai"
      });
    }
  } catch (error) {
    res.status(404).send({
      success:false,
      message:error.message
    });
  }
});

module.exports = router;