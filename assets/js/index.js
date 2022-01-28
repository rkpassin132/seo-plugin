$('document').ready(function(){
    chrome.tabs.getSelected(null, function(tab){
        let { id, index, url, height, width, favIconUrl, title }  = tab;

        let tags = document.getElementsByTagName('a');
        console.log(tags);
    });
});
let tags = document.getElementsByTagName('a');
for (tag of tags){
    console.log(tag)
}