const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
app.get('/api',(req,res)=>{
    const {slack_name, track} = req.query;
    const current_day = new Date().toLocaleDateString('en-US',{weekday:'long'});
    // const utc_time = new Date().toISOString();
    // Get the current UTC time with validation of +/-2 hours
//   const currentUTC = new Date();
//   const offsetHours = currentUTC.getTimezoneOffset() / 60;
//   const utc_time = new Date(
//     currentUTC.getTime() + (offsetHours >= -2 && offsetHours <= 2 ? 0 : -offsetHours) * 60 * 60 * 1000
//   ).toISOString();
const currentUTC = new Date();
  const offsetMinutes = currentUTC.getTimezoneOffset();
  const utcOffset = offsetMinutes >= -2 && offsetMinutes <= 2 ? 0 : -offsetMinutes;

  currentUTC.setMinutes(currentUTC.getMinutes() + utcOffset);

  const year = currentUTC.getUTCFullYear();
  const month = (currentUTC.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = currentUTC.getUTCDate().toString().padStart(2, '0');
  const hours = currentUTC.getUTCHours().toString().padStart(2, '0');
  const minutes = currentUTC.getUTCMinutes().toString().padStart(2, '0');
  const seconds = currentUTC.getUTCSeconds().toString().padStart(2, '0');
  const utc_time = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

    const github_file_url ='https://github.com/Ronexlemon/HNGx/blob/master/index.js';
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