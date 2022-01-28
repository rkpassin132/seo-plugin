$('document').ready(function(){

    function check_url(url=false){
        // if url in storage then send message fron storage
        if(url){
            return true;
        }
        return false;
    }

    chrome.tabs.getSelected(null, function(tab){
        let { index, url, height, width, favIconUrl, title }  = tab;
        // if url not exist in storage then get data
        chrome.tabs.executeScript( tab.id, { code : get_tag('h1', ['textContent']) });
        chrome.tabs.executeScript( tab.id, { code : get_tag('h3', ['textContent']) }, () => {});
        chrome.tabs.executeScript( tab.id, { code : get_tag('h4', ['textContent']) }, () => {});
        chrome.tabs.executeScript( tab.id, { code : get_tag('h5', ['textContent']) }, () => {});
        chrome.tabs.executeScript( tab.id, { code : get_tag('h6', ['textContent']) }, () => {});
        chrome.tabs.executeScript( tab.id, { code : get_tag('a', ['host', 'href','textContent']) }, () => {
            chrome.tabs.executeScript( tab.id, { code : get_tag('img', ['src']) }, () => {
                chrome.tabs.executeScript( tab.id, { code : get_tag('link', ['href']) }, () => {
                    chrome.tabs.executeScript( tab.id, { code : get_tag('script', ['src']) }, () => {
                        chrome.tabs.executeScript( tab.id, { code : get_tag('meta') }, () => {
                            console.log("Data get complete");
                        });
                    });
                });
            });
        });
        
    });
    
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    let data = request.source;
    switch (request.action) {
        case "get_h1":
            // h1 data 
            console.log("h1",data);
            break;
        case "get_h2":
            // h1 data 
            console.log("h2",data);
            break;
        case "get_h3":
            // h1 data
            console.log("h3",data);
            break;
        case "get_h4":
            // h1 data
            console.log("h4",data);
            break;
        case "get_h5":
            // h1 data
            console.log("h5",data);
            break;
        case "get_h6":
            // h1 data
            console.log("h6",data);
            break;
        case "get_a":
            // get external and internal links
            console.log("a",data);
            break;
        case "get_img":
            // get external and internal links
            console.log("img",data);
            break;
        case "get_script":
            // meta tage with value
            console.log("script",data);
            break;
        case "get_link":
            // h1 data
            console.log("link",data);
            break;
        case "get_meta":
            // h1 data
            console.log("meta",data);
            break;
                
        
        default:
            break;
    }
});
