import {config} from "dotenv"
config()

import {OpenAI} from "openai"
const openai = new OpenAI({
    apiKey: process.env.API_KEY
});

import http from "http";
import express from "express";

const app = express();

app.listen(5000);

app.get('/ingredients', async (req, res) => {
    const ingredient_name = req.query.name;
    if (typeof ingredient_name != 'undefined') console.log(ingredient_name);

    //initializing and defining the JSON with prompt only
    const descriptionData = {
        prompt: "In a short paragraph, give a description of " + ingredient_name + ".",
        response: null
    };

    //communicating with ChatGPT to obtain a message
    const chat = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{role:"user", content:descriptionData.prompt}],
    });

    //extracting response from ChatGPT and adding it to the JSON
    descriptionData.response = chat.choices[0].message.content;

    //parse and then send it over!
    const description = JSON.stringify(descriptionData);
    res.send(descriptionData);

})

console.log("Server is running");