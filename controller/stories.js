const Store = require('../models/store');

exports.get_Stores = async (req, res, next) => {
    try {
      const stores = await Store.find();
      return res.status(200).json({
        success: true,
        count: stores.length,
        data: stores
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  exports.addStory = async (req, res, next) => {
    try {
      const store=await Store.create(req.body)
      return res.status(200).json({
        success: true,
        data: store
      });

    } catch (err) {
      console.log(req.body);
      console.log(err);
        if(err.code===11000)
          return res.status(400).json({error:"this id of store already exist"})
              res.status(500).json({ error: `Server error` });
    }
  };
  