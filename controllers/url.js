const shortid=require('shortid');
const URL =require('../models/url');

async function handleGenerateNewShortURL(req,res){
    const body =req.body;
    if(!body.url) return res.status(400).json({error:'url is required'})
    const shorID=shortid();

    await URL.create({
        shortId:shorID,
        redirectURL:body.url,
        visitHistory:[],
    });
    return res.json({id:shorID});
}
async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result =await  URL.findOne({shortId});
    return res.json({totalClick:result.visitHistory.length,analytics:result.visitHistory});
}

module.exports={
    handleGenerateNewShortURL,
    handleGetAnalytics,
}