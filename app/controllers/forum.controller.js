import FORUM from '../helper/forumHelper.js';

var replySvg = 	`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.78391 2.02159C7.81764 2.00214 7.85455 1.99411 7.89126 1.99823C7.92797 2.00236 7.96331 2.01851 7.99401 2.0452C8.02472 2.07189 8.04981 2.10826 8.06698 2.15098C8.08416 2.1937 8.09286 2.24139 8.0923 2.28967V4.59631C8.0923 4.86159 8.17272 5.11602 8.31587 5.30361C8.45902 5.4912 8.65318 5.59658 8.85563 5.59658C9.87391 5.59658 11.9288 5.60658 13.8936 7.24104C15.3959 8.48938 16.9317 10.762 17.8553 14.9952C16.2981 13.0286 14.5195 11.9623 12.9624 11.3962C12.0053 11.0491 11.0216 10.8438 10.0296 10.784C9.62364 10.759 9.21689 10.7643 8.81136 10.8H8.79151L8.78388 10.802L8.85563 11.7983L8.7793 10.802C8.59088 10.8268 8.41623 10.9425 8.28927 11.1266C8.16231 11.3108 8.09211 11.5501 8.0923 11.7983V14.1049C8.0923 14.321 7.92437 14.457 7.78391 14.373L1.70169 8.50538L1.63757 8.44937C1.60437 8.42323 1.5769 8.38628 1.55783 8.34211C1.53876 8.29793 1.52874 8.24805 1.52874 8.1973C1.52874 8.14655 1.53876 8.09666 1.55783 8.05249C1.5769 8.00832 1.60437 7.97137 1.63757 7.94523L1.70169 7.88921L7.78391 2.02159ZM9.61896 12.7706C9.72379 12.7706 9.83727 12.7746 9.95941 12.7826C10.622 12.8226 11.538 12.9546 12.5547 13.3247C14.5791 14.0609 16.9759 15.7294 18.5698 19.4864C18.656 19.6892 18.7933 19.8464 18.9583 19.9311C19.1232 20.0158 19.3055 20.0226 19.4739 19.9505C19.6422 19.8784 19.7862 19.7317 19.8811 19.5357C19.9761 19.3398 20.016 19.1066 19.9942 18.8762C19.2858 11.4542 17.1149 7.54912 14.7119 5.55257C12.8112 3.97213 10.854 3.66805 9.61896 3.61003V2.28967C9.6191 1.87769 9.53438 1.4733 9.37373 1.11917C9.21308 0.765042 8.98247 0.474302 8.70622 0.277629C8.42997 0.080956 8.11833 -0.0143561 7.80418 0.00174997C7.49003 0.017856 7.18503 0.144783 6.92135 0.369137L0.823856 6.25076C0.571774 6.45696 0.363882 6.74383 0.219753 7.08436C0.0756241 7.4249 0 7.8079 0 8.1973C0 8.5867 0.0756241 8.9697 0.219753 9.31024C0.363882 9.65077 0.571774 9.93764 0.823856 10.1438L6.92135 16.0255C7.18503 16.2498 7.49003 16.3767 7.80418 16.3928C8.11833 16.409 8.42997 16.3136 8.70622 16.117C8.98247 15.9203 9.21308 15.6296 9.37373 15.2754C9.53438 14.9213 9.6191 14.5169 9.61896 14.1049V12.7706Z" fill="black"/>
</svg>`;

var likeSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.08 0.0574832C9.885 -0.241267 8.775 0.662483 8.695 1.83248C8.605 3.14623 8.4075 4.35248 8.16 5.06998C8.00375 5.51998 7.56125 6.33623 6.86 7.11873C6.16375 7.89748 5.2575 8.59123 4.19625 8.88123C3.35625 9.10998 2.5 9.83748 2.5 10.9V15.9012C2.5 16.9575 3.3525 17.7312 4.31 17.8325C5.6475 17.975 6.265 18.3512 6.895 18.7362L6.955 18.7737C7.295 18.98 7.6775 19.2087 8.1675 19.3787C8.66375 19.5487 9.24375 19.65 10 19.65H14.375C15.5462 19.65 16.3738 19.0537 16.7925 18.32C16.9949 17.9737 17.1043 17.581 17.11 17.18C17.11 16.99 17.0813 16.79 17.0138 16.6C17.265 16.2712 17.4887 15.8775 17.6237 15.4737C17.7612 15.0612 17.8387 14.5212 17.6287 14.0375C17.715 13.875 17.7788 13.7012 17.8275 13.5337C17.9238 13.1962 17.9688 12.8237 17.9688 12.4625C17.9688 12.1025 17.9238 11.7312 17.8275 11.3925C17.7848 11.2364 17.727 11.0849 17.655 10.94C17.8739 10.6286 18.0147 10.2691 18.0656 9.89191C18.1165 9.51469 18.076 9.13077 17.9475 8.77248C17.69 8.03248 17.095 7.39748 16.4475 7.18248C15.3887 6.82998 14.1938 6.83748 13.3025 6.91873C13.1175 6.93545 12.9328 6.95629 12.7488 6.98123C13.1806 5.12402 13.154 3.18962 12.6713 1.34498C12.587 1.04947 12.4252 0.78184 12.2028 0.56977C11.9804 0.357701 11.7054 0.208892 11.4062 0.138733L11.08 0.0574832ZM14.375 18.4012H10C9.3625 18.4012 8.92125 18.315 8.575 18.1962C8.22375 18.075 7.9425 17.9112 7.605 17.705L7.555 17.675C6.86125 17.2512 6.0575 16.7612 4.4425 16.59C4.02625 16.545 3.75 16.2275 3.75 15.9025V10.9C3.75 10.5825 4.0325 10.2212 4.525 10.0875C5.89375 9.71248 6.99625 8.84248 7.7925 7.95248C8.58625 7.06498 9.1225 6.10873 9.34 5.47998C9.64375 4.60498 9.84875 3.26998 9.9425 1.91748C9.97375 1.46498 10.3925 1.17498 10.7763 1.26998L11.1038 1.35248C11.3038 1.40248 11.4262 1.53123 11.4637 1.67123C11.9742 3.61626 11.9113 5.66742 11.2825 7.57748C11.2469 7.68372 11.2405 7.79756 11.264 7.90711C11.2875 8.01666 11.34 8.11787 11.4161 8.20016C11.4921 8.28245 11.5888 8.34279 11.6962 8.37487C11.8035 8.40694 11.9175 8.40957 12.0263 8.38248L12.03 8.38123L12.0475 8.37748L12.12 8.35998C12.5475 8.26947 12.9799 8.20394 13.415 8.16373C14.2438 8.08873 15.2363 8.09623 16.0525 8.36873C16.2713 8.44123 16.615 8.74373 16.765 9.18123C16.8987 9.56623 16.8737 10.0187 16.4325 10.4587L15.9913 10.9L16.4325 11.3425C16.4862 11.3962 16.5638 11.5187 16.625 11.7362C16.685 11.945 16.7188 12.1987 16.7188 12.4625C16.7188 12.7275 16.685 12.98 16.625 13.19C16.5625 13.4075 16.4862 13.53 16.4325 13.5837L15.9913 14.025L16.4325 14.4675C16.4912 14.5262 16.5688 14.6887 16.4388 15.0775C16.3042 15.4549 16.0887 15.7983 15.8075 16.0837L15.3663 16.525L15.8075 16.9675C15.815 16.9737 15.8588 17.03 15.8588 17.18C15.8514 17.363 15.7995 17.5416 15.7075 17.7C15.5012 18.06 15.0788 18.4012 14.375 18.4012Z" fill="black"/>
</svg>`;

var dislikeSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.08 19.5925C9.885 19.8925 8.77625 18.9875 8.695 17.8175C8.605 16.505 8.4075 15.2987 8.16 14.58C8.00375 14.13 7.56125 13.315 6.86 12.5325C6.16375 11.7525 5.2575 11.0588 4.19625 10.77C3.35625 10.54 2.5 9.8125 2.5 8.75V3.75C2.5 2.69375 3.3525 1.92 4.31 1.8175C5.6475 1.67625 6.265 1.29875 6.895 0.91375L6.955 0.8775C7.295 0.67 7.6775 0.44125 8.1675 0.2725C8.66375 0.1 9.24375 0 10 0H14.375C15.5462 0 16.3738 0.5975 16.7925 1.33C16.9975 1.68875 17.11 2.08875 17.11 2.47125C17.11 2.66125 17.0813 2.86125 17.0138 3.05125C17.265 3.37875 17.4887 3.7725 17.6237 4.17625C17.7612 4.58875 17.8387 5.12875 17.6287 5.61375C17.715 5.77625 17.7788 5.94875 17.8275 6.1175C17.9238 6.455 17.9688 6.82625 17.9688 7.1875C17.9688 7.54875 17.9238 7.92 17.8275 8.2575C17.7838 8.4075 17.7275 8.5625 17.655 8.71125C18.1475 9.425 18.1775 10.2112 17.9475 10.8775C17.69 11.6175 17.095 12.2525 16.4475 12.4675C15.3887 12.8212 14.1938 12.8125 13.3025 12.7313C13.1175 12.7145 12.9328 12.6937 12.7488 12.6688C13.1828 14.5261 13.1562 16.4615 12.6713 18.3063C12.4988 18.9413 11.9838 19.3663 11.4062 19.5113L11.08 19.5925ZM14.375 1.25H10C9.3625 1.25 8.92125 1.335 8.575 1.45375C8.22375 1.575 7.9425 1.74 7.605 1.945L7.555 1.97625C6.86125 2.39875 6.0575 2.88875 4.4425 3.06125C4.02625 3.105 3.75 3.42375 3.75 3.74875V8.75C3.75 9.06875 4.0325 9.42875 4.525 9.5625C5.89375 9.9375 6.99625 10.8088 7.7925 11.6988C8.58625 12.5863 9.1225 13.5425 9.34 14.17C9.64375 15.045 9.84875 16.38 9.9425 17.7325C9.97375 18.185 10.3925 18.4763 10.7763 18.38L11.1038 18.2987C11.3038 18.2487 11.4262 18.1187 11.4637 17.98C11.9745 16.0346 11.9115 13.983 11.2825 12.0725C11.2472 11.9663 11.2411 11.8526 11.2647 11.7433C11.2883 11.6339 11.3409 11.5329 11.4168 11.4508C11.4928 11.3687 11.5895 11.3085 11.6967 11.2765C11.8038 11.2444 11.9177 11.2418 12.0263 11.2688H12.03L12.0475 11.2738L12.12 11.29C12.5475 11.3805 12.9799 11.446 13.415 11.4863C14.2438 11.5613 15.2363 11.5538 16.0525 11.2825C16.2713 11.2088 16.615 10.9062 16.765 10.4688C16.8987 10.0838 16.8737 9.63125 16.4325 9.1925L15.9913 8.75L16.4325 8.3075C16.4862 8.255 16.5638 8.1325 16.625 7.91375C16.685 7.705 16.7188 7.45125 16.7188 7.1875C16.7188 6.92375 16.685 6.67 16.625 6.46125C16.5625 6.24375 16.4862 6.12 16.4325 6.0675L15.9913 5.625L16.4325 5.1825C16.4912 5.12375 16.5688 4.9625 16.4388 4.5725C16.304 4.19555 16.0886 3.85256 15.8075 3.5675L15.3663 3.125L15.8075 2.6825C15.815 2.67625 15.8588 2.62 15.8588 2.47C15.8512 2.28736 15.7993 2.10931 15.7075 1.95125C15.5 1.59 15.0788 1.25 14.375 1.25Z" fill="black"/>
</svg>`;

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

export const createForumTopicPost = async (req, res, next) => {
	try {
	  const { topicId, username, content } = req.body;
  
	  const data = JSON.stringify({
		topicId: topicId,
		content: content,
		username: username,
	  });
  
	  const forumObj = new FORUM();
  
	  const newpost = await forumObj.websiteToolboxCurlRequest(res, 'posts', 'POST', data, username);
  
	  if (newpost) {
		var postId = newpost.data.postId;
		if( postId ) {
			  res.status(200).send({ postId : postId });
			  return;
		  }
	  } else {
		res.status(500).send({ status: 'error', message: 'Something went wrong' });
	  }
	} catch (error) {
	  console.error('Error:', error);
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
		var titleHead = userTitle.charAt(0).toUpperCase();
		var postCount = topicInfo.data.author.postCount;
		var membersince = new Date(topicInfo.data.author.joinDateTimestamp * 1000).toDateString();
		var firstpost = topicInfo.data.firstPost.message;
		var timestAgo = timeAgo(new Date(topicInfo.data.firstPost.postTimestamp * 1000));
		var firstPostId = topicInfo.data.firstPost.postId;
		
		var divContent = `
			<input type="hidden" id="p_topic_id" value="${topicid}" />
			
			<div class="start-post-btn">
				<button id="newpost_btn" onclick="addNewPost('${topicid}');">Add Post</button>
			</div>
			<div class="form-bottom-section" style="display:none;" id="new_post_initiate_form" >
				<textarea id="post_forum_textarea" row="8"></textarea>
				<span id="post_forum_error" class="forum_error" style="display:none;">Please enter text </span>
				<button id="post_new_submit" onclick="addNewPostSubmit('${topicid}');">Submit </button>
				<div id="post_loading_div" style="display:none;margin-left:25px;">Please Wait . . . .</div>
			</div>

			<div class="post-item">
					<div class="post-author">
						<div class="author-info">
						<div class="author-first-letter">${titleHead}</div>
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
							<div class="post-options" style="display:none;">
								<a href="javascript:void(0);" class="quote">${replySvg} Reply</a>
								<a href="javascript:void(0);" class="voted-yes">${likeSvg} Like (${topicInfo.data.firstPost.likeCount || 0})</a>
								<a href="javascript:void(0);" class="dislike_post">${dislikeSvg} Dislike (${topicInfo.data.firstPost.dislikeCount || 0})</a>
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
				var cHead = post.author.userTitle.charAt(0).toUpperCase();

				if (blockquote && username) {
				  const updatedBlockquote = blockquote.replace(
					/(<blockquote[^>]*>)/i,
					`$1<em><a href="void()"> @${username}</a> Wrote: </em><br>`
				  );
				  const messageWithoutBlockquote = post.message.replace(blockquote, '').trim();			  
				  finalMessage = `${updatedBlockquote}\n${messageWithoutBlockquote}`;
				}
				
				let replyOn = post.message.replace(/<blockquote[\s\S]*?<\/blockquote>/, '');


				divContent += `
					<div class="post-item">
						<div class="post-author">
							<div class="author-info">
							<div class="author-first-letter">${cHead}</div>
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
								<div id="reply-section_${post.postId}" class="reply-section" style="display:none;">
									<div class="field-input">
										<textarea row="5" id="reply_text_${post.postId}"></textarea>
										<span id="forum_error_${post.postId}" class="forum_error" style="display:none;">Please enter text </span>
									</div>
									<button id="reply_btn_${post.postId}" onclick="submitReply('${post.postId}');">Submit </button>
									<div id="reply_loading_div_${post.postId}" style="display:none;margin-left:25px;">Please Wait . . . .</div>
								</div>
								<div class="post-options">
									<textarea id="reply_${post.postId}" style="display:none;">${replyOn}</textarea>
									<a href="javascript:void(0);" onclick="replyOnPostValidate('${post.postId}');" class="quote">${replySvg} Reply</a>
									<a href="javascript:void(0);" class="voted-yes">${likeSvg} Like (${post.likeCount || 0})</a>
									<a href="javascript:void(0);" class="dislike_post">${dislikeSvg} Dislike (${post.dislikeCount || 0})</a>
								</div>
							</div>
						</div>
					</div>
				`;
			}
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