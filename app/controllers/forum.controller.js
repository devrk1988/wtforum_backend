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
		var firstPostId = topicInfo.data.firstPost.postId;
		
		var divContent = `
		<style>
#forum_container {
  font-family: Arial, sans-serif;
  max-width: 1660px;
  padding: 0px 55px;
}
.post-item {
  display: flex;
  background: transparent;
  border: transparent;
  border-radius: 8px;
  padding: 0px;
  margin-top: 20px;
}
.post-author {
  width: 150px;
  min-width: 150px;
  border-right: none;
  padding-right: 10px;
  text-align: center;
}
.post-body-wrapper {
  padding-left: 0px;position: relative;
}
.post-body-wrapper::after {
  content: " ";
  position: absolute;
  float: right;
  margin: 15px 0 15px 15px;
  border-top: 0 solid transparent;
  border-bottom: 30px solid transparent;
  left: -40px;
  top: 10px;
  border-right: 25px solid #fff;
}
.post-body {
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 10px 20px;
  box-sizing: border-box;
}
.author-first-letter {
  width: 60px;
  height: 60px;
  background: #6e6f9d;
  font-size: 34px;
  color: #fff;
  border-radius: 100%;
  display: inline-block;
  line-height: 60px;
}
.author-info em {
  display: block;
  font-style: normal;
  color: #666;
  font-size: 14px;
  margin-bottom: 0px;
  font-style: italic;
  line-height: 14px;
  margin-top: 5px;
}
#forum_container a {
  color: #1a1a1a;
  text-decoration: none;
}
.post-body-author .display_name {
  background: transparent;
  color: #000;
  padding:0px;
  border-radius: 4px;
  font-size: 15px;
}
.post-body-author .display_name:hover {
  background: transparent;
  color: #000;
  text-decoration: none;
}
.post-body-author {
  flex-wrap: wrap;gap: 0px;
}
.form-bottom-section {
  margin: 30px 0px 30px 149px;
  background: #fff;
  padding: 20px;
}
.start-discution-btn {
  text-align: center;
}
.start-discution-btn button {
  background-color: #e33c44;
  border: none;
  color: #fff;
  padding: 10px 40px;
  font-size: 22px;
  border-radius: 6px;
  text-transform: uppercase;
}
.form-bottom-section textarea {
  width: 100%;
  border-radius: 6px;
  margin-bottom: 20px;
}
.reply-section .field-input textarea {  width: 80%;
  border-radius: 6px;
  margin-bottom: 15px;} 
.form-bottom-section button, .reply-section button {
  background-color: #2f2e2e;
  border: none;
  color: #fff;
  padding: 6px 20px;
  font-size: 14px;
  border-radius: 6px;
  text-transform: capitalize;
}
.post-body-content blockquote {
  background: transparent;
  border-left: 1px solid #ece7e7;
  margin: 0px 0 20px;
  padding: 0px 10px 10px;
  font-size: 13px;
  text-align: left;
  color: #555;
}
.display_name {
  width: 100%;
  margin-bottom: 3px;
}
.post-date {
  font-size: 12px;
  color: #666;
  font-weight: 400;
}
.reply-section {
  margin-top: 20px;
}
.voted-yes {
  color: #0a3d91 !important;
  font-weight: 500;
}
.dislike_post {
  color: #e31c44 !important;
  font-weight: 500;
}
		</style>
		
		
			<div class="post-item">
					<div class="post-author">
						<div class="author-info">
						<div class="author-first-letter">G</div>
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
			if (post.postId!=firstPostId)
			{
				var finalMessage = post.message;
				const blockquoteMatch = post.message.match(/<blockquote[\s\S]*?<\/blockquote>/i);
				const blockquote = blockquoteMatch ? blockquoteMatch[0] : null;

				const usernameMatch = blockquote ? blockquote.match(/data-username="([^"]+)"/) : null;
				const username = usernameMatch ? usernameMatch[1] : null;

				if (blockquote && username) {
				  const updatedBlockquote = blockquote.replace(
					/(<blockquote[^>]*>)/i,
					`$1<em><a href="void()"> @${username}</a> Wrote: </em><br>`
				  );
				  const messageWithoutBlockquote = post.message.replace(blockquote, '').trim();			  
				  finalMessage = `${updatedBlockquote}\n${messageWithoutBlockquote}`;
				}


				divContent += `
					<div class="post-item">
						<div class="post-author">
							<div class="author-info">
							<div class="author-first-letter">G</div>
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
								 <div class="reply-section">
								 <div class="field-input">
             <textarea row="5"></textarea>
             </div>
             <button>Submit </button>
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
			}
		});

	    res.send(`<div id=forum_container>${divContent}
           <div class="form-bottom-section">
             <textarea row="8"></textarea>
             <button>Submit </button>
           </div>
           <div class="start-discution-btn"> <button>Start Discussion </button> </div
	    	</div>`);
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