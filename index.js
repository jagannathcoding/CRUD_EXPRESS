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


/*app.put("/",function(req,res){

    for(let i=0;i<user[0].kidneys.length;i++)
    {
        user[0].kidneys[i].healthy=true;
    }
    res.json({});
})*/

/////for update
app.put("/", function (req, res) {
    

    for (let i = 0; i < user[0].kidneys.length; i++) {
        if (!user[0].kidneys[i].healthy) {  
            user[0].kidneys[i].healthy = true;  
            break;  
        }
    }

    res.json({ success: true });
});

/*delete unhealthy kidney at all
app.delete("/", function(req, res) {
    if(isThereAtleastOneUnhealthyKidney()) {
        const newKidneys = [];
        for (let i = 0; i<user[0].kidneys.length; i++) {
            if (user[0].kidneys[i].healthy) {
                newKidneys.push({
                    healthy: true
                })
            }
        }
        user[0].kidneys = newKidneys;
        res.json({msg: "done"})   
    } else {
        res.status(411).json({
            msg: "You have no bad kidneys"
        });
    }
})

function isThereAtleastOneUnhealthyKidney() {
    let atleastOneUnhealthyKidney = false;
    for (let i = 0; i<user[0].kidneys.length; i++) {
        if (!user[0].kidneys[i].healthy) {
            atleastOneUnhealthyKidney = true;
        }
    }
    return atleastOneUnhealthyKidney
}
*/


/*delete unhealthy kidney one by one*/


app.delete("/", function(req, res) {
    // Find the index of the first unhealthy kidney
    const index = findFirstUnhealthyKidney();
    
    // If an unhealthy kidney exists, remove it
    if (index !== -1) {
        user[0].kidneys.splice(index, 1); // Remove the unhealthy kidney at the found index
        res.json({ msg: "Removed one unhealthy kidney" });
    } else {
        res.status(411).json({
            msg: "You have no bad kidneys"
        });
    }
});

function findFirstUnhealthyKidney() {
    for (let i = 0; i < user[0].kidneys.length; i++) {
        if (!user[0].kidneys[i].healthy) {
            return i; // Return index of the first unhealthy kidney
        }
    }
    return -1; // Return -1 if no unhealthy kidney is found
}
