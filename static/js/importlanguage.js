/*
 * File:        importlanguage.js
 * Description: implement language file importing
 * Author:      swallow
 */

function button_import_history_click(addNodeName, pageName){

 $.ajax({
     url: '/ajax/get_importHistory/',
     data: {
       'current_language': g_current_language
     },
     dataType: 'json',
     success: function (data) {
         g_import_history_list = data.result_list;
         clearCurrentPageContent(addNodeName);
         if (g_import_history_list.length > 0){
             createImportInfoTable(addNodeName, pageName);
         }
         else{
            show_message(addNodeName, 'No data found.');
         }
     }
  });
}
