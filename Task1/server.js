const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
app.get('/info',(req,res)=>{
    const {slack_name, track} = req.query;
    const current_day = new Date().toLocaleDateString('en-US',{weekday:'long'});
    const utc_time = new Date().toISOString();
    const github_file_url ='https://github.com/Ronexlemon/HNGx.git/Task1';
    const github_repo_url ="https://github.com/Ronexlemon/HNGx.git";
    const status_code= 200;
    if(!slack_name && !track){
        return res.status(400).json({error:"slackname of tract Missing"});

    }
    res.json({
        slack_name,current_day,
        utc_time,
        track,
        github_file_url,
        github_repo_url,
        status_code,
    });
});

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})