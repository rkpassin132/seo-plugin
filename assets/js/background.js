/** @format */

// getCurrentWindowActiveTabIndex().then(tab => {
//    console.log("tab",tab);
//    alert(tab.index);
// });

// // asnyc getter, not just a regular 'thunk'
// function getCurrentWindowActiveTabIndex () {
//     return new Promise((resolve, reject) => {
//         chrome.tabs.query({
//             currentWindow: true,
//             active: true,
//         }, (currentWindowActiveTabs = []) => {
//             if (!currentWindowActiveTabs.length) reject();
//             resolve(currentWindowActiveTabs[0]);
//         });
//     });
// }

