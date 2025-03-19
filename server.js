const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const BOT_TOKEN = '7926928665:AAHfBxnFbOuQD94mg3ydwg75dOxDO0yC6Oo';
const CHAT_ID = '7265846377';

app.post('/send-location', async (req, res) => {
    try {
        const { lat, lng } = req.body;
        const mapUrl = `https://www.google.com/maps?q=${lat},${lng}`;
        
        const response = await axios.post(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                chat_id: CHAT_ID,
                text: `📍 موقع جديد:\nLatitude: ${lat}\nLongitude: ${lng}\nالخريطة: ${mapUrl}`
            }
        );

        res.json({ ok: true });
    } catch (error) {
        res.status(500).json({ 
            ok: false, 
            error: error.response?.data?.description || error.message 
        });
    }
});

const PORT =3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});