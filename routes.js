const express = require('express');
const router = express.Router();
const generateFile = require('./generateFile');
const executeCpp = require('./executeCpp');

router.get('/', async(req,res) => {
    res.send("Hell0");
})

router.post('/run',async (req,res) => {
    try
    {
        const {code, language, id} = req.body;

        if(!code || !language || !id)
        {
            res.json({message: "Field Missing"});
        }
        else{
            const filePath = await generateFile(language, code, id);
            const result = await executeCpp(filePath);
            res.json({result});
        }
    }
    catch(err){
        console.log(err);
    }
})
module.exports = router;