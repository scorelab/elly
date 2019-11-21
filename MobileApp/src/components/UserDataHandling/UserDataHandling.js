var RNFS = require('react-native-fs');

export function createFile(filename, content){
    let path = RNFS.DocumentDirectoryPath + '/'+filename;
    // write the file
    RNFS.writeFile(path, content, 'utf8')
    .then((success) => {
        console.log('FILE WRITTEN!');
    })
    .catch((err) => {
        console.log(err.message);
    });
}

export function generateUUID(){
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    //console.log(uuid)
    return uuid
}