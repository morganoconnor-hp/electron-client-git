const { remote} = require('electron')
const dialog = remote.dialog
const dirTree = require("directory-tree");
const {recursive} = require("./recursive");
const fs = require("fs");

let listData = '';

function openDirectory() {
    dialog.showOpenDialog({properties: ['openDirectory']}).then(r => {
        const pathDirectory = r.filePaths[0];

        const filesTree = dirTree(pathDirectory);

        listData = recursive(filesTree);

        document.getElementById('treeFiles').innerHTML = listData;

        document.querySelectorAll('.icon-file-tree').forEach((element) => {
            element.addEventListener("click",function(event){
                let parent = event.target.parentElement;
                let title = parent.title;

                let toggleCible = document.getElementById(title);
                let toggleIconCible = document.getElementById('icon-' + title);

                if (toggleCible.style.display === 'none') {
                    toggleCible.style.display = 'block';
                    toggleCible.style.height = '100%';
                    parent.style.background = 'gray'
                    toggleIconCible.className = 'fas fa-folder-open mr-2'
                } else {
                    toggleCible.style.display = 'none';
                    toggleCible.style.height = '0';
                    parent.style.background = 'coral'
                    toggleIconCible.className = 'fas fa-folder mr-2'
                }
            },false);
        })

        document.querySelectorAll('.to-read').forEach((element) => {
            element.addEventListener("click",function(event){
                console.log('read', event.target.id)
                fs.readFile(event.target.id, 'utf-8', function (err, data) {
                    if (err) {
                        return console.error(err);
                    }
                    let readFile = document.getElementById('read-file')
                    readFile.innerHTML = data;
                });
            })
        })
    })
}