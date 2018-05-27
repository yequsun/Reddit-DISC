var results = [];
$(document).ready(function(){
	$("#search-btn").click(function(e){
		e.preventDefault();

		var subreddit, series, from, to;
		subreddit = $("#subreddit").val();
		series = $("#series").val();
		from = $("#from").val();
		to = $("#to").val();


		//TODO from/to regex and number check
		$("#results-table").empty();
		from = parseInt(from);
		to = parseInt(to);
		
		var i;
		//alert(endpoint);
		var reddit_url = "http://www.reddit.com";
		var prefix;
		prefix = "[DISC] ";
		/*
		for(i=from;i<=to;i++){
			var endpoint = "http://www.reddit.com/r/" + subreddit + "/search.json";
			$.ajax({
				url: endpoint,
				type: 'GET',
				data:{
					q: prefix+series+" "+i,
					limit: 1,
					sort: "relevance"
				},
				success: function(response){
					console.log(response);
					var list = response.data.children[0].data;
					var result_item = {title: list.title, score: list.score, link: list.url, comment: reddit_url+list.permalink};
					console.log(result_item);
					results.push(result_item);
				}
			});
		}
		*/
		for(i=from;i<=to;i++){
			(function(i){
				var endpoint = "http://www.reddit.com/r/" + subreddit + "/search.json";
				$.ajax({
					url: endpoint,
					type: 'GET',
					data:{
						q: prefix+series+" "+i,
						limit: 1,
						sort: "relevance"
					},
					success: function(response){
						console.log(response);
						var list = response.data.children[0].data;
						var result_item = {no: i, title: list.title, score: list.score, link: list.url, comment: reddit_url+list.permalink};
						console.log(result_item);
						results.push(result_item);
					}
				});
			}(i));

		}
		
	});
});

$(document).ajaxStop(function(){
	var i;
	var from = $("#from").val();
	from = parseInt(from);
	for(i=0;i<results.length;i++){
			var ro = "<tr>";
			var rc = "</tr>";
			var dopen = "<td>";
			var dc = "</td>";
			var num = (i+from).toString();
			var link_btn ="<a target='_blank' href='" +results[i].link +"' class='badge badge-primary'>Link</a>";
			var comment_btn ="<a target='_blank' href='" +results[i].comment +"' class='badge badge-secondary'>Comment</a>";

			var new_row = ro + dopen + results[i].no + dc + dopen + results[i].score + dc + dopen + results[i].title + dc + dopen + link_btn + dc + dopen + comment_btn + dc + rc;
			$("#result-table").append(new_row);

		}
});