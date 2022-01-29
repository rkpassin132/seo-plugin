/** @format */

async function get_external_internal_link(tab_host, data, link){
    for(d of data){
        var url = null;
        if('href' in d) url = new URL(d.href);
        if('src' in d) url = new URL(d.src);
        if(url != null){ 
            if(url.hostname === tab_host) ++link.internal;
            else ++link.external;
        }
    }
    return link;
}

function get_tag(tag, attributes = []) {
    // attributes array to string
    let attribute = "[";
    for (att of attributes) attribute += `"${att}",`;
    attribute += "]";
    
    // creating code string
    let code = `
    var send_${tag} = [];
    console.log(document.getElementsByTagName("${tag}"));
    for(data of document.getElementsByTagName("${tag}")){`;
    if (tag == "meta") {
        code += `let obj = {};
            if(data.hasAttribute("name")) {
                obj["name"] = data.getAttribute('name');
                obj["context"] = data.getAttribute('content');
            }
            if(data.hasAttribute("property")){ 
                obj["name"] = data.getAttribute('property');
                obj["context"] = data.getAttribute('content');
            }
            if(Object.keys(obj).length !== 0) send_${tag}.push(obj);`;
    } else {
        code += `let obj = {};
            for (key of ${attribute}){
                if(data[key] != '' && data[key] != null) obj[key] = data[key];
            }
            if(Object.keys(obj).length !== 0) send_${tag}.push(obj);
            `;
    }
    code += `}
    chrome.runtime.sendMessage({action: "get_${tag}", source: send_${tag}});
    `;
    return code;
}

