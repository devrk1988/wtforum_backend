import FORUM from '../helper/forumHelper.js';

export const forumCustomerCreateWebhook = async (req, res, next) => {
  const requestBody = req.body;
  //const requestData = JSON.parse(requestBody);
  const forumObj = new FORUM();
  
  const forum_user_id = requestBody.id;
  const forum_username = requestBody.data.object.username;
  const forum_userTitle = requestBody.data.object.userTitle;
  const forum_userEmail = requestBody.data.object.email;
  
  console.log(forum_user_id);
  console.log(forum_username);
  console.log(forum_userTitle);
  console.log(forum_userEmail);
  
  /*if (requestData.type === 'user.created') {
    console.log(requestData.id);
  }*/
	
	let data = JSON.stringify({
		"query": "query { customers(first: 1, query: \"email:"+forum_userEmail+"\") { edges { node { id } } } }"
	});
	let customerRes= await forumObj.shopifyCurlRequest(res,'graphql.json','POST',data); 

    var customerId = customerRes.data.data.customers.edges[0]?.node?.id || null;
	console.log(customerId);
	
	if(customerId){
		
		const metafield1 = {
		  namespace: 'custom',
		  key: 'websitetoolbox_email',
		  type: 'single_line_text_field',
		  value: forum_userEmail,
		};
		const result1 = await updateCustomerMetafield(res,customerId, metafield1);
		
		const metafield2 = {
		  namespace: 'custom',
		  key: 'websitetoolbox_username',
		  type: 'single_line_text_field',
		  value: forum_username,
		};
		const result2 = await updateCustomerMetafield(res,customerId, metafield2);
		
		const metafield3 = {
		  namespace: 'custom',
		  key: 'websitetoolbox_usertitle',
		  type: 'single_line_text_field',
		  value: forum_userTitle,
		};
		const result3 = await updateCustomerMetafield(res,customerId, metafield3);
		
		const metafield4 = {
		  namespace: 'custom',
		  key: 'websitetoolbox_user_id',
		  type: 'single_line_text_field',
		  value: forum_user_id,
		};
		const result4 = await updateCustomerMetafield(res,customerId, metafield4);
	}
	
	res.sendStatus(200);	
}


async function updateCustomerMetafield(res, customerId, metafield) {
  const forumObj = new FORUM();
  let data = JSON.stringify({
    query: `mutation {
      customerUpdate(input: {
        id: "${customerId}",
        metafields: [{
          namespace: "${metafield.namespace}",
          key: "${metafield.key}",
          type: "${metafield.type}",
          value: "${metafield.value}"
        }]
      }) {
        customer {
          id
        }
        userErrors {
          field
          message
        }
      }
    }`,
  });

  const response = await forumObj.shopifyCurlRequest(res,'graphql.json','POST',data); 
  return response.data;
}

export const createForumTopic = async (req, res, next) => {
  try {
    const { title, description , product_id } = req.body;

    const data = JSON.stringify({
      categoryId: process.env.WT_PRODUCT_CAT_ID,
      content: description,
      title,
      username: process.env.WT_DEFAULT_USERNAME,
    });

    const forumObj = new FORUM();

    const newTopic = await forumObj.websiteToolboxCurlRequest(res, 'topics', 'POST', data);

    if (newTopic) {
	  var topicId = newTopic.data.topicId;
	  //console.log(newTopic.data);
	  if( topicId ) {
		  
		let topicData = JSON.stringify({
			  "query": "mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) { metafieldsSet(metafields: $metafields) { metafields { id namespace key value } userErrors { field message } } }",
			  "variables": {
				"metafields": [
				  {
					"ownerId": `gid://shopify/Product/${product_id}`,
					"namespace": "custom",
					"key": "forum_topic",
					"type": "single_line_text_field",
					"value": `${topicId}`
				  }
				]
			  }
		});
		
		let updateMetaInfo= await forumObj.shopifyCurlRequest(res,'graphql.json','POST',topicData); 
		console.log(updateMetaInfo);
		if ( updateMetaInfo.data ) {
			res.status(200).send({ message: "Metafield Updated Successfully" });
			return;
		}
	  }
      res.send(newTopic.data);
    } else {
      res.status(500).send({ status: 'error', message: 'Something went wrong' });
    }
  } catch (error) {
    console.error('[createForumTopic] Error:', error);
    res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
};