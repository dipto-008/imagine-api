const express = require("express");
const axios = require("axios");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.get("/imagine", async(req,res)=>{
  const { prompt } = req.query;
        try {
            const response = await axios.post(
                "https://api-inference.huggingface.co/models/brushpenbob/flux-midjourney-anime",
              //your api url
                { "inputs": prompt },
              //payload body for request data
                {
                    headers: {
                        Authorization: "Bearer ADD_YOUR API_KEY",
                        "Content-Type": "application/json",
                    },
                    responseType: 'stream',
                }
            );
      
        res.setHeader('Content-Type', 'image/png');
        response.data.pipe(res)
    } catch (error) {
          console.log("imagine error",error)
        res.status(500).send('Error processing the request');
        }
});
app.use("/d", express.static(path.join(__dirname, "d")));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
