import FORUM from '../helper/forumHelper.js';

export const forumCustomerCreateWebhook = async (req, res, next) => {
  const requestBody = req.body;
  //const requestData = JSON.parse(requestBody);
  const forumObj = new FORUM();
  
  const forum_user_id   = requestBody.data.object.userId;
  const forum_username  = requestBody.data.object.username;
  const forum_userTitle = requestBody.data.object.userTitle;
  const forum_userEmail = requestBody.data.object.email;
  
  if (requestBody.type === 'user.created') {
	
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
		//console.log(updateMetaInfo);
		if ( updateMetaInfo.data ) {
			res.status(200).send({ topicid : topicId , message: "Metafield Updated Successfully" });
			return;
		}
	  }
      //res.send(newTopic.data);
    } else {
      res.status(500).send({ status: 'error', message: 'Something went wrong' });
    }
  } catch (error) {
    console.error('[createForumTopic] Error:', error);
    res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
};

export const getUserPosts = async (req, res, next) => {
	const { topicid } = req.body;
	
	const forumObj = new FORUM();
	const topicInfo = await forumObj.websiteToolboxCurlRequest(res, 'topics/'+topicid, 'GET');
	if (topicInfo) {
		var title = topicInfo.data.title;
		var author = topicInfo.data.author.username;
		var dname = topicInfo.data.author.displayNameAndUsername;
		var userTitle = topicInfo.data.author.userTitle;
		var postCount = topicInfo.data.author.postCount;
		var membersince = new Date(topicInfo.data.author.joinDateTimestamp * 1000).toDateString();
		var firstpost = topicInfo.data.firstPost.message;
		var timestAgo = timeAgo(new Date(topicInfo.data.firstPost.postTimestamp * 1000));
		
		var divContent = `
			<div id="" class="secondary-header">
				<div class="container">
					<span id="subscribe_topic" data-forum="982386">
						<a id="edit_subject" class="pull-left topic-title change-value" data-placement="bottom" data-toggle="#editTopic" data-pk="1">
							<span id="editableSubject" class="editable" tabindex="-1">${title}</span>
						</a>
					</span>
					<div class="topic-tools pull-right">					
						<a id="sub_post_reply" class="pull-right btn btn-uppercase btn-primary " data-i18n="" data-original-title="" title="">Reply</a>
					</div>
				</div>
			</div>
			<div class="post-item">
					<div class="post-author">
						<div class="author-info">
							<em>${userTitle || 'Member'}</em>
							<small>${postCount || 0} posts</small>
						</div>
					</div>
					<div class="post-body-wrapper">
						<div class="post-body">
							<div class="post-body-author">
								<a href="javascript:void(0);" class="display_name">${author}</a>
								<div class="post-date">${ timestAgo }</div>
							</div>
							<div class="post-body-content">
								${firstpost}
							</div>
							<div class="post-options">
								<a href="javascript:void(0);" class="quote">Reply</a>
								<a href="javascript:void(0);" class="voted-yes">Like (${topicInfo.data.firstPost.likeCount || 0})</a>
								<a href="javascript:void(0);" class="dislike_post">Dislike (${topicInfo.data.firstPost.dislikeCount || 0})</a>
							</div>
						</div>
					</div>
				</div>
		`;
		
		const postsData = await forumObj.websiteToolboxCurlRequest(res, 'posts?topicId='+topicid+'&sort=latest&limit=5', 'GET');
		var postDatas = postsData.data.data;

		postDatas.forEach(post => {
			var finalMessage = post.message;
			
			const blockquoteMatch = post.message.match(/<blockquote[\s\S]*?<\/blockquote>/i);
			const blockquote = blockquoteMatch ? blockquoteMatch[0] : null;

			const usernameMatch = blockquote ? blockquote.match(/data-username="([^"]+)"/) : null;
			const username = usernameMatch ? usernameMatch[1] : null;

			if (blockquote && username) {
			  const updatedBlockquote = blockquote.replace(
				/(<blockquote[^>]*>)/i,
				`$1<br><em><a href="void()"> @${username}</a> Wrote: </em><br>`
			  );
			  const messageWithoutBlockquote = post.message.replace(blockquote, '').trim();			  
			  finalMessage = `${updatedBlockquote}\n${messageWithoutBlockquote}`;
			}


			divContent += `
				<div class="post-item">
					<div class="post-author">
						<div class="author-info">
							<em>${post.author.userTitle || 'Member'}</em>
							<small>${post.author.postCount || 0} posts</small>
						</div>
					</div>
					<div class="post-body-wrapper">
						<div class="post-body">
							<div class="post-body-author">
								<a href="javascript:void(0);" class="display_name">${post.author.displayNameAndUsername}</a>
								<div class="post-date">${ timeAgo(new Date(post.postTimestamp * 1000)) }</div>
							</div>
							<div class="post-body-content">
								${finalMessage}
							</div>
							<div class="post-options">
								<a href="javascript:void(0);" class="quote">Reply</a>
								<a href="javascript:void(0);" class="voted-yes">Like (${post.likeCount || 0})</a>
								<a href="javascript:void(0);" class="dislike_post">Dislike (${post.dislikeCount || 0})</a>
							</div>
						</div>
					</div>
				</div>
			`;
		});

	    res.send(`<div id=forum_container>${divContent}</div>`);
	}
}


function timeAgo(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);
  const secondsPast = Math.floor((now - past) / 1000);

  if (secondsPast < 60) {
    return `${secondsPast} seconds ago`;
  }
  if (secondsPast < 3600) {
    const minutes = Math.floor(secondsPast / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  if (secondsPast < 86400) {
    const hours = Math.floor(secondsPast / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  if (secondsPast < 2592000) { // Less than 30 days
    const days = Math.floor(secondsPast / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  const months = Math.floor(secondsPast / 2592000);
  return `${months} month${months > 1 ? 's' : ''} ago`;
}