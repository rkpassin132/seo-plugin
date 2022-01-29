$('document').ready(function(){

    chrome.tabs.getSelected(null, function(tab){
        let { index, url, height, width, favIconUrl, title }  = tab;
        $(".tab_url").text(url).attr("href", url);
        $("#tab_url").text(title).attr("href", url);
        $("#tab_favIconUrl").attr("src", favIconUrl);
        $("#tab_dimension").text("Dimension : " + width +" * "+ height);
        $("#tab_title").text(title);
        chrome.storage.local.set({"tab": tab});
        chrome.tabs.executeScript( tab.id, { code : get_page_details_code() });
        chrome.tabs.executeScript( tab.id, { code : get_tag('h1', ['textContent']) }, () => {
            chrome.tabs.executeScript( tab.id, { code : get_tag('h2', ['textContent']) }, () => {
                chrome.tabs.executeScript( tab.id, { code : get_tag('h3', ['textContent']) }, () => {
                    chrome.tabs.executeScript( tab.id, { code : get_tag('h4', ['textContent']) }, () => {
                        chrome.tabs.executeScript( tab.id, { code : get_tag('h5', ['textContent']) }, () => {
                            chrome.tabs.executeScript( tab.id, { code : get_tag('h6', ['textContent']) }, () => {
                                chrome.tabs.executeScript( tab.id, { code : get_tag('a', ['host', 'href','textContent']) }, () => {
                                    chrome.tabs.executeScript( tab.id, { code : get_tag('img', ['src']) }, () => {
                                        chrome.tabs.executeScript( tab.id, { code : get_tag('video', ['src']) }, () => {
                                            chrome.tabs.executeScript( tab.id, { code : get_tag('link', ['href']) }, () => {
                                                chrome.tabs.executeScript( tab.id, { code : get_tag('script', ['src']) }, () => {
                                                    chrome.tabs.executeScript( tab.id, { code : get_tag('meta') }, () => {
                                                        chrome.tabs.executeScript( tab.id, { code : 'chrome.runtime.sendMessage({action: "get_completed", source: true});' });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    }); 
                });
            });
        });
        
        
        
        
        
        
        
    });
    
    $("#count_aphabet_input").bind('input propertychange', function(e){
        $("#count_aphabet_answer").text($(this).val().length);
    });
    $("#count_word_input").bind('input propertychange', function(e){
        $("#count_word_answer").text($(this).val().split(/[\s\.\?]+/).length);
    });
    $("#count_sentance_input").bind('input propertychange', function(e){
        var text = $(this).val();
        var split = text.split(".");
        var amountOfSentences = text.charAt(text.length - 1) == "." ? split.length : split.length + 1;
        $("#count_sentance_answer").text(amountOfSentences);
    });
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    let data = request.source;
    switch (request.action) {
        case "get_h1":
            // h1 data 
            chrome.storage.local.set({"h1": data});
            if(data.length == 0) return;
            var html = "";
            for(h1 of data) html += "<li>"+ h1.textContent +"</li>";
            $("#h1_data").html(html);
            break;
        case "get_h2":
            // h2 data 
            chrome.storage.local.set({"h2": data});
            if(data.length == 0) return;
            var html = "";
            for(h2 of data) html += "<li>"+ h2.textContent +"</li>";
            $("#h2_data").html(html);
            break;
        case "get_h3":
            // h3 data
            chrome.storage.local.set({"h3": data});
            if(data.length == 0) return;
            var html = "";
            for(h3 of data) html += "<li>"+ h3.textContent +"</li>";
            $("#h3_data").html(html);
            break;
        case "get_h4":
            // h4 data
            chrome.storage.local.set({"h4": data});
            if(data.length == 0) return;
            var html = "";
            for(h4 of data) html += "<li>"+ h4.textContent +"</li>";
            $("#h4_data").html(html);
            break;
        case "get_h5":
            // h5 data
            chrome.storage.local.set({"h5": data});
            if(data.length == 0) return;
            var html = "";
            for(h5 of data) html += "<li>"+ h5.textContent +"</li>";
            $("#h5_data").html(html);
            break;
        case "get_h6":
            // h6 data
            chrome.storage.local.set({"h6": data});
            if(data.length == 0) return;
            var html = "";
            for(h6 of data) html += "<li>"+ h6.textContent +"</li>";
            $("#h6_data").html(html);
            break;
        case "get_a":
            // get external and internal links
            chrome.storage.local.set({"a": data});
            if(data.length == 0) return;
            var html = "";
            for(a of data){
                html += `
                <tr>
                    <td><a href="${a.href}" target="_blank" rel="">${a.href}</a></td>
                    <td><a href="${a.host}" target="_blank" rel="">${a.host}</a></td>
                </tr>`;
            }
            $("#link_anchor_data").html(html);
            $("#link_anchor_data_count").text(data.length);
            $("#table_link_anchor").DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copyHtml5',
                    'excelHtml5',
                ]
            });
            break;
        case "get_img":
            // get external and internal links
            chrome.storage.local.set({"img": data});
            if(data.length == 0) return;
            var html = "";
            for(image of data){
                html += `
                <tr>
                    <td><img src="${image.src}" class="rounded-circle bg-dark" id="tab_favIconUrl" height="35" width="35" alt="Avatar"></td>
                    <td><a href="${image.src}" target="_blank" rel="">${image.src}</a></td>
                </tr>`;
            }
            $("#link_image_data").html(html);
            $("#link_image_data_count").text(data.length);
            $("#table_link_image").DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copyHtml5',
                    'excelHtml5',
                ]
            });
            break;
        case "get_script":
            // meta tage with value
            chrome.storage.local.set({"script": data});
            if(data.length == 0) return;
            var html = "";
            for(script of data){
                html += `
                <tr>
                    <td><a href="${script.src}" target="_blank" rel="">${script.src}</a></td>
                </tr>`;
            }
            $("#link_script_data").html(html);
            $("#link_script_data_count").text(data.length);
            $("#table_link_script").DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copyHtml5',
                    'excelHtml5',
                ]
            });
            break;
        case "get_video":
            // meta tage with value
            chrome.storage.local.set({"video": data});
            if(data.length == 0) return;
            var html = "";
            for(video of data){
                html += `
                <tr>
                    <td><a href="${video.src}" target="_blank" rel="">${video.src}</a></td>
                </tr>`;
            }
            $("#link_video_data").html(html);
            $("#link_video_data_count").text(data.length);
            $("#table_link_video").DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copyHtml5',
                    'excelHtml5',
                ]
            });
            break;
        case "get_link":
            // link data
            chrome.storage.local.set({"link": data});
            if(data.length == 0) return;
            var html = "";
            for(link of data){
                html += `
                <tr>
                    <td><a href="${link.href}" target="_blank" rel="">${link.href}</a></td>
                </tr>`;
            }
            $("#link_link_data").html(html);
            $("#link_link_data_count").text(data.length);
            $("#table_link_link").DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copyHtml5',
                    'excelHtml5',
                ]
            });
            break;
        case "get_meta":
            // meta data
            chrome.storage.local.set({"meta": data});
            if(data.length == 0) return;
            var html ="";
            for(meta of data){
                if(meta.name == "description") $("#meta_description").text(meta.context);
                if(meta.name == "robots") $("#meta_robots").text(meta.context);
                html += `
                <div class="row mt-2">
                    <div class="col-12">
                        <div class="card text-center">
                            <div class="p-2">
                                <p class="card-text text-muted f-13">Meta ${meta.name}</p>
                                <p class="">${meta.context}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
            }
            $("#meta_data").html(html);
            break;
        case "get_page_details":
            chrome.storage.local.set({"page_details": data});
            $(".tab_page_size").text(data.page_size + " kb");
            const date = new Date(data.load_time);
            $(".tab_page_load_time").text(`${date.getSeconds()}:${date.getMilliseconds()} sec`);
            break;
        case "get_completed":
            // data completed
            chrome.storage.local.get(['tab','h1','h2','h3','h4','h5','h6','a','img','video','script','link','meta'], function(local) {
                chrome.storage.local.clear();
                $("#h1_h2_count").text(local.h1.length + local.h2.length);

                var tab_url = new URL(local.tab.url);
                get_external_internal_link(tab_url.hostname, local.a, {internal:0, external:0}).then((link) => {
                    get_external_internal_link(tab_url.hostname, local.img, link).then((link) => {
                        get_external_internal_link(tab_url.hostname, local.video, link).then((link) => {
                            get_external_internal_link(tab_url.hostname, local.script, link).then((link) => {
                                get_external_internal_link(tab_url.hostname, local.link, link).then((link) => {
                                    $(".internal_link_count").text(link.internal);
                                    $(".external_link_count").text(link.external);
                                    $("#total_links").text(link.internal + link.external)
                                });
                            });
                        });
                    });
                });

                get_external_internal_link(tab_url.hostname, local.a, {internal:0, external:0}).then((link) => {
                    $(".link_to_page_count").text(link.internal);
                });
                console.log(local);

            });
            break;
                
        
        default:
            break;
    }
});
