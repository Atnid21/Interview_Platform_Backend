const express = require('express');
const router = express.Router();
const generateFile = require('./generateFile');
const executeCpp = require('./Languages/executeCpp');
const executePython = require('./Languages/executePython');
const executeJava = require('./Languages/executeJava');

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

        if(language === "cpp")
        {
            const filePath = await generateFile(language, code, id);
            const result = await executeCpp(filePath);
            res.json({result});
        }
        else if(language === "py")
        {
            const filePath = await generateFile(language,code,id);
            const result = await executePython(filePath);
            res.json({result});
        }else if(language === "java")
        {
            const filePath = await generateFile(language,code,id);
            const result = await executeJava(filePath);
            res.json({result});
        }
    }
    catch(err){
        console.log(err);
    }
})
module.exports = router;