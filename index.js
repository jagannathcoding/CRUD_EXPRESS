const express=require("express");

const app=express();


////SINGLE USER

const user=[{
    name:"John",
    kidneys:[{
        healthy:false
    }]
}];

app.use(express.json());

//////FOR GET
app.get("/",function(req,res){
    const johnKidneys=user[0].kidneys;
    const numberOfKidneys=johnKidneys.length;
    let numberOfHealthyKidneys=0;
    for(let i=0;i<johnKidneys.length;i++)
    {
        if(johnKidneys[i].healthy)
        {
            numberOfHealthyKidneys=numberOfHealthyKidneys+1;
        }
    }
    const numberOfUnhealthyKidneys=numberOfKidneys-numberOfHealthyKidneys;

    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
})

app.listen(3000);


///////FOR POST

app.post("/",function(req,res){

    const isHealthy=req.body.isHealthy;
    user[0].kidneys.push({
        healthy:isHealthy
    })

    res.json({
        msg:"Done!"
    })
})