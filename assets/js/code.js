/** @format */

function get_tag(tag, attributes = []) {
    // attributes array to string
    let attribute = "[";
    for (att of attributes) attribute += `"${att}",`;
    attribute += "]";
    
    // creating code string
    let code = `
    let code_${tag} = document.getElementsByTagName("${tag}");
    let send_${tag} = [];
    for(data of code_${tag}){`;
    if (tag == "meta") {
        code += `let obj = {};
            if(data.hasAttribute("name")) obj["name"] = data.getAttribute('name')
            if(data.hasAttribute("property")) obj["name"] = data.getAttribute('property')
            obj["context"] = data.getAttribute('content');
            send_${tag}.push(obj);`;
    } else {
        code += `let obj = {};
            for (key of ${attribute}){
                if(data[key] != '' && data[key] != null) obj[key] = data[key];
            }
            if(Object.keys(obj).length !== 0) send_${tag}.push(obj);
            `;
    }
    code += `}
    send_${tag} = send_${tag}.length > 0 ? send_${tag} : null;
    chrome.runtime.sendMessage({action: "get_${tag}", source: send_${tag}});
    `;
    return code;
}

