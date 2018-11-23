/*
 * File:        miscellaneous_funcs.js
 * Description: functions out of dictionary
 * Author:      swallow
 */


function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
};


function setDataInOrderList(list)
{

    if (list == null) {
        return;
    }

    g_allwords_sort_list = [];
    for (let i = 0; i< list.length; i ++) {
        let oneItem = [];
        oneItem["id_entry"] = list[i][0];
        oneItem["entry"] = list[i][1];
        oneItem["interpre"] = list[i][2];
        oneItem["lang_code"] = list[i][3];
        oneItem["update_date"] = list[i][4];

        g_allwords_sort_list.push(oneItem);
    }
}