const express = require('express');
const getstores=require('../controller/stories')
const router=express.Router()
router.get("/stores",getstores.get_Stores)
router.post("/stores/add",getstores.addStory)
module.exports=router