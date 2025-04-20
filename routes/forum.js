import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/create-topic', async (req, res) => {
	const { title, description } = req.body;
 
	let data = JSON.stringify({
	  "categoryId": process.env.WT_PRODUCT_CAT_ID,
	  "content": description,
	  "title": title,
	  "username": process.env.WT_DEFAULT_USERNAME
	});

	let config = {
	  method: 'post',
	  maxBodyLength: Infinity,
	  url: process.env.WT_API_URL+'topics',
	  headers: { 
		'Content-Type': 'application/json', 
		'Accept': 'application/json', 
		'x-api-key': process.env.WT_API_KEY, 
		'x-api-username': 'gauravsarraf'
	  },
	  data : data
	};

	axios.request(config)
	.then((response) => {
	  res.status(200).json( JSON.stringify(response.data) );
	})
	.catch((error) => {
	    console.error('Error calling third-party API:', error.message);
		res.status(500).json({ error: 'Failed to create forum topic.' });
	});
 
});

export default router;