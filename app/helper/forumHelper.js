import axios from 'axios';

class FORUM {
	
	constructor(){
		  this.shopify_url     = process.env.SHOPIFY_API_URL;
		  this.shopify_token   = process.env.SHOPIFY_ADMIN_TOKEN;
		  this.wt_api_url      = process.env.WT_API_URL;
		  this.wt_api_key      = process.env.WT_API_KEY;
		  this.wt_api_username = process.env.WT_DEFAULT_USERNAME;
		  this.wt_forum_url     = process.env.WT_FORUM_URL;
	}
	
    async shopifyCurlRequest(res,url_suffix, method = "GET", payload = false) {

		let config = {
		  method: method,
		  maxBodyLength: Infinity,
		  url: this.shopify_url+url_suffix,
		  headers: { 
			'Content-Type': 'application/json', 
			'X-Shopify-Access-Token': this.shopify_token
		  }
		};
		
		if(payload){
			config.data = payload;		
		}	 
		
		return axios.request(config)
		.then((response) => {	
			  return response;
		})
		.catch((error) => {
		  //console.log(error);
		  res.status(500).send({ status: "error", 'message' : error });		
		});     
    }
	
	async websiteToolboxCurlRequest(res,url_suffix, method = "GET", payload = false, username = this.wt_api_username) {
		
		let config = {
		  method: method,
		  maxBodyLength: Infinity,
		  url: this.wt_api_url+url_suffix,
		  headers: { 
			'Content-Type': 'application/json', 
			'Accept': 'application/json', 
			'x-api-key': this.wt_api_key , 
			'x-api-username': username
		  }
		};
		
		if(payload){
			config.data = payload;		
		}	 
		
		return axios.request(config)
		.then((response) => {	
			  return response;
		})
		.catch((error) => {
		  console.log(error);
		  res.send({ status: "error", 'message' : 'No Post Found' });	
		  //res.status(500).send({ status: "error", 'message' : error });		
		});     
    }

	async likeDislikeCurlRequest(res,url_suffix, method = "GET", payload = false, username = this.wt_api_username) {
		
		let config = {
		  method: method,
		  maxBodyLength: Infinity,
		  url: this.wt_forum_url+url_suffix,
		  headers: { 
			'Content-Type': 'application/json', 
			'Accept': 'application/json', 
			'x-api-key': this.wt_api_key , 
			'x-api-username': username
		  }
		};
		
		if(payload){
			config.data = payload;		
		}	 
		
		return axios.request(config)
		.then((response) => {	
			  return response;
		})
		.catch((error) => {
		  console.log(error);
		  res.send({ status: "error", 'message' : 'No Post Found' });	
		  //res.status(500).send({ status: "error", 'message' : error });		
		});     
    }
	
	
	async getProductResponse(res,ordUrl,method){
			 return await this.curlRequest(res,ordUrl,method); 
	}
	
}


export default FORUM;

