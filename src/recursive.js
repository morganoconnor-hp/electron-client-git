function recursive(filesTree) {
    let listData = '';

    function uuidFunction() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    let uuid = uuidFunction();

    if(filesTree){
        if (filesTree.type === "directory") {
            listData += '<li>' +
                '<button title="' + uuid + '" class="btn btn-secondary d-flex align-items-center list-group icon-file-tree my-2 px-2">' +
                '<i id="icon-' + uuid + '" class="fas fa-folder-open pr-2"></i>' +
                '<p class="no-padding-margin">'+filesTree.name+'</p>' +
                '</button>';
        } else {
            listData += '<li>' +
                '<span class="list-group icon-file-tree to-read my-2">'+
                '<i class="fas fa-file pr-2"></i>'+
                '<p id="' + filesTree.path +'" class="no-padding-margin">'+filesTree.name+'</p>'+
                '</span>';
        }
        if("children" in filesTree) {
            listData += '<ul class="list-group-item" id="' + uuid + '">';
            if(filesTree.children.length > 0){
                filesTree.children.map(child =>{
                    listData += recursive(child)
                })
            }
            listData += '</ul>';
        }
        listData += '</li>';
    }

    return listData
}

module.exports = { recursive };