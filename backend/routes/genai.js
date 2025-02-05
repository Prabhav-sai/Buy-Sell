import { GoogleGenerativeAI } from "@google/generative-ai";
import express, { text } from "express";

const router = express.Router();

router.post("/", async (req, res) => {
    const { history, prompt } = req.body;
    try {
        const genAI = new GoogleGenerativeAI('AIzaSyBnuY37SFbaC0hmHU8Fij84tXrLrUqyo6E');
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const chat = model.startChat({ history });
        let result = await chat.sendMessage(prompt);
        console.log(result);
        res.send({ text: result.response.text() });
    }
    catch (error) {
        console.error("Error creating orders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
