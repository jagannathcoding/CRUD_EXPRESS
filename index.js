/*const express=require("express");

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
})*/




const express = require("express");
const app = express();

const users = [
    {
        id: 1,
        name: "John",
        kidneys: [
            { healthy: false }
        ]
    },
    {
        id: 2,
        name: "Jane",
        kidneys: [
            { healthy: true },
            { healthy: true }
        ]
    },
    {
        id: 3,
        name: "Alice",
        kidneys: [
            { healthy: true },
            { healthy: false }
        ]
    }
];

app.use(express.json());

////// FOR GET: Get Kidney Information for a Specific User
app.get("/user/:userId", function (req, res) {
    const userId = parseInt(req.params.userId, 10);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const kidneys = user.kidneys;
    const numberOfKidneys = kidneys.length;

    // Calculate healthy kidneys
    const numberOfHealthyKidneys = kidneys.reduce((count, kidney) => {
        return kidney.healthy ? count + 1 : count;
    }, 0);

    // Calculate unhealthy kidneys
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;

    res.json({
        userId: user.id,
        name: user.name,
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    });
});



////// FOR POST: Add a Kidney for a Specific User
app.post("/user/:userId/kidneys", function (req, res) {
    const userId = parseInt(req.params.userId, 10);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const isHealthy = req.body.isHealthy;
    user.kidneys.push({
        healthy: isHealthy
    });

    res.json({
        msg: "Kidney added successfully!",
        kidneys: user.kidneys
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
