var express = require("express");
var router = express.Router();
const fetch = require('node-fetch');
const handleOembedRequest = require("../utils/Oembed");



router.get("/", async (req, res) => {
    let url = req.query.url || "";

    await handleOembedRequest(url).then((result)=> {
     // result === String if success === false 
    // if success === true result === Oembed object  
    const [success,codeError,msg] = result ;
    res.json({
        success,
        codeError,
        msg
    });
    }).catch((err) => {
        res.send("you shouldn't be here");
    })

    

});


module.exports = router;