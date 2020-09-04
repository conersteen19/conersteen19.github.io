$(document).ready(function(){
	
	//project filter show/hide
	/*var projfilter = false; //toggle filters open and closed
    $("#project-filter-button").click(function(){
		if (projfilter){
			$("#project-filter").hide(); 
        	$("#project-filter-button").text("Show Filters");
			projfilter = false;
		} else {
        	$("#project-filter").show(); 
        	$("#project-filter-button").text("Hide Filters");
			projfilter = true;
		}
    }); 
	
	//experience filter show/hide
	var expfilter = false; //toggle filters open and closed
    $("#exp-filter-button").click(function(){
		if (expfilter){
			$("#exp-filter").hide(); 
        	$("#exp-filter-button").text("Show Filters");
			expfilter = false;
		} else {
        	$("#exp-filter").show(); 
        	$("#exp-filter-button").text("Hide Filters");
			expfilter = true;
		}
    }); */
	var showFilters = false;
	$(".filter-button").click(function(){
		var id = $(".filter-button").attr("id").substring(14);
		var div = "#" + id + "-filter";
		var button = "#filter-button-" + id;
		if (showFilters){
			$(div).hide(); 
    		$(button).text("Show Filters");
			showFilters = false;
		} else {
       		$(div).show(); 
    		$(button).text("Hide Filters");
			showFilters = true;
		}
	});
	
/*
	var projfiltertp = false; //park/ride engineering
	$("#project-filter-tp").click(function(){
		if (projfiltertp){
			$("#project-filter-tp").removeClass("filter-active");
			$(".project-label-tp").removeClass("label-active");
			$(".clean-blog-post").not(".proj-tp").show();
			projfiltertp = false;
		} else {
			$("#project-filter-tp").addClass("filter-active");
			$(".project-label-tp").addClass("label-active");
			$(".clean-blog-post").not(".proj-tp").hide();
			projfiltertp = true;
		}
	});
	
	var projfilterne = false; //network engineering
	$("#project-filter-ne").click(function(){
		if (projfilterne){
			$("#project-filter-ne").removeClass("filter-active");
			$(".project-label-ne").removeClass("label-active");
			$(".clean-blog-post").not(".proj-ne").show();
			projfilterne = false;
		} else {
			$("#project-filter-ne").addClass("filter-active");
			$(".project-label-ne").addClass("label-active");
			$(".clean-blog-post").not(".proj-ne").hide();
			projfilterne = true;
		}
	});
	
	//add new tags here.  Copy above code and change postfix to new abbreviation.  Add reset below and add label and filter in html.
	
	//clear filters
	$("#project-filter-clear").click(function(){
		projfiltertp = false;
		projfilterne = false;
		$(".filter").removeClass("filter-active");
		$(".label").removeClass("label-active");
		$(".clean-blog-post").show();
	});
	*/
	
	projlookup = [];
	explookup = [];
	
	$(".filter").click(function(){
		var id = $(this).attr("id");
		var key = "";
		var filter = "";
		var label = "";
		
		//project filtering
		if (id.includes("project")){
			key = id.substring(15);
			if (key === "clear"){
				$(".filter").removeClass("filter-active");
				$(".label").removeClass("label-active");
				$(".clean-blog-post").show();
				projlookup = [];
			}
			else {
				filter = "#project-filter-" + key;
				label = ".project-label-" + key;
				post = ".proj-" + key;
				if (projlookup.includes(key)){
					$(filter).removeClass("filter-active");
					$(label).removeClass("label-active");
					var index = projlookup.indexOf(key);
					if (index > -1){
						projlookup.splice(index, 1);
					}
					showPosts(projlookup, 4);
				} else {
					$(filter).addClass("filter-active");
					$(label).addClass("label-active");
					projlookup.push(key);
					showPosts(projlookup, 4);
				}
			}
		}
		
		//experience filtering
		else if (id.includes("exp")){
			key = id.substring(11);
			if (key === "clear"){	//clear all
				$(".filter").removeClass("filter-active");
				$(".label").removeClass("label-active");
				$(".clean-blog-post").show();
				explookup = [];
			} else if (key === "clear-type"){	//clear type
				var toRemove = ["jobs", "interns", "orgs", "leads", "vols"];
				specificClear(toRemove, 3);
			} else if (key === "clear-field"){	//clear field
				var toRemove = ["me", "ne", "cs", "tp"];
				specificClear(toRemove, 3);
			}
			else {	//everything else
				filter = "#exp-filter-" + key;
				label = ".exp-label-" + key;
				if (explookup.includes(key)){
					$(filter).removeClass("filter-active");
					$(label).removeClass("label-active");
					var index = explookup.indexOf(key);
					if (index > -1){
						explookup.splice(index, 1);
					}
					showPosts(explookup, 3);
				} else {
					$(filter).addClass("filter-active");
					$(label).addClass("label-active");
					explookup.push(key);
					showPosts(explookup, 3);
				}
			}
		}
	});
	
	
});

//used for specific clear functions
function specificClear(toRemove, len){
	for (k of toRemove){
		filter = "#exp-filter-" + k;
		label = ".exp-label-" + k;
		$(filter).removeClass("filter-active");
		$(label).removeClass("label-active");
		var index = explookup.indexOf(k);
		if (index > -1){
			explookup.splice(index, 1);
		}
	}
	showPosts(explookup, len);
}

//checks to see which posts should be shown
function showPosts(list, attrLen){
	if (list.length > 0){
		$(".clean-blog-post").each(function(){
			var attr = $(this).attr("class").substring(16).split(" "); //splits up class elements
			var cutAttr = [];
			for (a of attr){
				cutAttr.push(a.substring(attrLen + 1));
			}
			var pass = true;
			for (a of list){
				if (cutAttr.indexOf(a) <= -1){
					pass = false;
				}
			}
			if (pass){
				$(this).show();
			}
			else {
				$(this).hide();
			}
		});
	} else {
		$(".clean-blog-post").show();
	}
}