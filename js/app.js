function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

function loadYoutube(tags) {
    var request = gapi.client.youtube.search.list({
        part: "snippet",
        type: "video",
        q: encodeURIComponent(tags).replace(/%20/g, "+"),
        maxResults: 5,
        order: "viewCount",
        publishedAfter: "2015-01-01T00:00:00Z"
    });
    // execute the request
    request.execute(function(response) {
        var results = response.result;
        $("#results").html("");
        $.each(results.items, function(index, item) {
            $.get("tpl/item.html", function(data) {
                $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
            });
        });
        resetVideoHeight();
    });
    $(window).on("resize", resetVideoHeight);
}

function loadBooks(tags) {
    var googleAPI = "https://www.googleapis.com/books/v1/volumes?q="+(tags.replace(" ", "+"));
    // Make a ajax call to get the json data as response.
    $.getJSON(googleAPI, function (response) {
        var count = 0;
        $.each(response.items, function(index, item) {
            if(index < 8) {
                $.get("tpl/book.html", function (data) {
                    $("#books").append(tplawesome(data, [{
                        "title": item.volumeInfo.title,
                        "bookIcon": item.volumeInfo.imageLinks.smallThumbnail,
                        "pdfLink": item.accessInfo.webReaderLink
                    }]));
                });
            }
        });
    });
}
function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init() {
    gapi.client.setApiKey("AIzaSyAfmwTuGyN3lY2zH8S48nJenAG9G_lxEOc");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}
