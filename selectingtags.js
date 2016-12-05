var flag = true;
var user_flag = true;
var displaytags = "";
var lastValueOfQuestions = ""
var validUserTag = ""
$(document).ready(function(){

	var newValueOfQuestions="";

	$("#questiontextbox").on("change paste keyup", function(e) {
					
					if(e.keyCode == 32 ){	
					 var tags = $(this).val().trim();
					 if(tags.length!=0){
					 	var checkwords = tags.split(" ");
                    	displaytags = "";
						for (var i=0 ; i< checkwords.length;i++){
							checkInStackOverflowTags(checkwords[i]);
						}
                        
					}else{
						displaytags = "";
						$("#displaypara").text(displaytags);
						flag = true;
					}

				}
			}
				);

$("#addtags").on("change paste keyup", function(e){
	if(e.keyCode == 32){
		var tags = $(this).val().trim();
		if(tags.length!=0){
			var userwords = tags.split(" ");

			displayusertag = "";
			for (var i=0 ; i< userwords.length;i++){
					checkInStackOverflowUserTags(userwords[i]);
			}

		}else{
			displayusertag = "";
			$("#displayusertag").text(displayusertag);
			user_flag = true;


		}


	}

});


    $("#submitbutton").on("click", function() {

					if(checkBlankInputValues()){
						savingTags(lastValueOfQuestions,validUserTag);
						//window.open('contentMap.html',"_self");
					}else{
						alert("Please add tags if you are not getting any recommended tags");
					}
					}							 
				);
});

function checkBlankInputValues(){
    //var recommtag = $("#questiontextbox").val().trim();
    //var usertag = $("#addtags").val().trim();
    if(flag && user_flag){
        return false;
    } else {
        return true;
    }
}






 function checkInStackOverflowTags(inputtag){
				/* var stackovertags = ["evercookie","memory-address","radio-button","facebook-graph-api-v2.0","static-content",
"into-outfile","sashform","aquery","installer","scaffolding","administrative","glibc","cac","signed","code-timing","equalizer",
"fabric8","pom.xml","corpus","google-chrome-extension","content-assist","google-play-services","shared-memory","filestructure",
"xmppframework","adobe","datefield","spooler","value-of","javacaps","automated-refactoring","greenplum","kdb","spec","log4cplus",
"author","junit-theory","object-layout","package-info","pre-commit-hook","netui","smali","versions","css3","ldapconnection",
"money-format","opus","structural-search","plist"
];
*/  
     var urlLink = 'http://192.168.0.16:5000/checkTag/'+inputtag;
     $.ajax({
        url: urlLink,
        method: 'GET', // or GET
        success: function(msg) {
            var mess = msg;
            if(mess == '1') {
                callback(inputtag);
            }
        },
        error: function (request, status, error) {
            if(error != '') {
                alert(error);
            }
        }
    });
}	

function callback(inputTag) {
    if(displaytags == null){
        displaytags = inputTag;
        lastValueOfQuestions = inputTag;
    } else {
        displaytags = displaytags + " " +inputTag;
        lastValueOfQuestions = displaytags + " " +inputTag;
    }
    $("#displaypara").text(displaytags);
    if(displaytags.trim()== ""){
                            flag = true;
                        }else{
                            flag = false;
                        }
}


function checkInStackOverflowUserTags(inputtag){
				/* var stackovertags = ["evercookie","memory-address","radio-button","facebook-graph-api-v2.0","static-content",
"into-outfile","sashform","aquery","installer","scaffolding","administrative","glibc","cac","signed","code-timing","equalizer",
"fabric8","pom.xml","corpus","google-chrome-extension","content-assist","google-play-services","shared-memory","filestructure",
"xmppframework","adobe","datefield","spooler","value-of","javacaps","automated-refactoring","greenplum","kdb","spec","log4cplus",
"author","junit-theory","object-layout","package-info","pre-commit-hook","netui","smali","versions","css3","ldapconnection",
"money-format","opus","structural-search","plist"
];
*/
     var urlLink = 'http://192.168.0.16:5000/checkTag/'+inputtag;
     $.ajax({
        url: urlLink,
        method: 'GET', // or GET
        success: function(msg) {
            var mess = msg;
            if(mess == '1') {
                callback_user(inputtag);
            }
        },
        error: function (request, status, error) {
            if(error != '') {
                alert(error);
            }
        }
    });
}

function callback_user(inputTag) {
    if(displayusertag == null){
        displayusertag = inputTag;
        validUserTag = inputTag;
    } else {
        displayusertag = displayusertag + " " +inputTag;
        validUserTag = displayusertag + " " +inputTag;
    }
    $("#displayusertag").text(displayusertag);
    if(displayusertag.trim()== ""){
                            user_flag = true;
                        }else{
                            user_flag = false;
                        }
}

function savingTags(lastValueOfQuestions,validUserTag){
		var urlLink = 'http://192.168.0.16:5000/writeAfterFirst/'+lastValueOfQuestions.trim()+" "+validUserTag.trim();
        $.ajax({
            url: urlLink,
            method: 'GET', // or GET
            success: function(msg) {
                onSubmit();
            },
            error: function (request, status, error) {
                if(status == 'error') {
                    alert("Something Wrong Happened. Please Try again later");
                }
            }
        });


    }

 function onSubmit(){
 	window.open('contentMap.html',"_self");
 }



 //Word cloud

	var frequency_list = [{"text": "java", "size": 410}, {"text": "android", "size": 400}, {"text": "swing", "size": 390}, {"text": "spring", "size": 380}, {"text": "eclipse", "size": 370}, {"text": "arrays", "size": 360}, {"text": "hibernate", "size": 350}, {"text": "multithreading", "size": 340}, {"text": "maven", "size": 330}, {"text": "string", "size": 320}, {"text": "xml", "size": 310}, {"text": "jsp", "size": 300}, {"text": "json", "size": 290}, {"text": "spring-mvc", "size": 280}, {"text": "arraylist", "size": 270}, {"text": "mysql", "size": 260}, {"text": "regex", "size": 250}, {"text": "servlets", "size": 240}, {"text": "jpa", "size": 230}, {"text": "sql", "size": 220}, {"text": "tomcat", "size": 210}, {"text": "jdbc", "size": 200}, {"text": "generics", "size": 190}, {"text": "java-ee", "size": 180}, {"text": "javascript", "size": 170}, {"text": "user-interface", "size": 160}, {"text": "javafx", "size": 150}, {"text": "sockets", "size": 140}, {"text": "junit", "size": 130}, {"text": "java-8", "size": 120}, {"text": "netbeans", "size": 110}, {"text": "rest", "size": 100}, {"text": "algorithm", "size": 90}, {"text": "class", "size": 80}, {"text": "html", "size": 60}, {"text": "file", "size": 70}, {"text": "jar", "size": 50}, {"text": "jframe", "size": 40}, {"text": "methods", "size": 30}, {"text": "exception", "size": 20}];

						var color = d3.scale.linear()
										.domain([0,1,2,3,4,5,6,10,15,20,30,40,100,200,300,400])
										.range(["#CD5C5C", "#802A2A", "#C67171", "#8B3A3A", "#CD9B9B", "#BC8F8F", "#6F4242", "#856363", "#8B6969", "#EEE9E9", "#CDC9C9", "#8B8989"]);
                        

						d3.layout.cloud().size([950, 300])
										.words(frequency_list)
										.rotate(0)
										.fontSize(function(d) { return (d.size/8); })
										.on("end", draw)
										.start();

						function draw(words) {
								d3.select(".wordcloud").append("svg")
												.attr("width", 950)
												.attr("height", 350)
												.attr("class", "wordcloud")
												.append("g")
												// without the transform, words words would get cutoff to the left and top, they would
												// appear outside of the SVG area
												.attr("transform", "translate(320,200)")
												.selectAll("text")
												.data(words)
												.enter().append("text")
												.style("font-size", function(d) { return (d.size) + "px"; })
												.style("fill", function(d, i) { return color(i); })
												.attr("transform", function(d) {
														return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
												})
												.text(function(d) { return d.text; });
						}