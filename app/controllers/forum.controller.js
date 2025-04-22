import FORUM from '../helper/forumHelper.js';

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