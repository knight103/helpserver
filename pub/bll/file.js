const config = require('./../config/config')
const fs = require('fs')

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
// Generate a pseudo-GUID by concatenating random hexadecimal. 
function guid() {
    return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
}
let app = {
    async add(ctx) {

        const file = ctx.request.files.file; // 获取上传文件
        // 创建可读流
        const reader = fs.createReadStream(file.path);
        let filePath = process.cwd() + '/public/uploads/files/';
        let pat = guid() + file.name.substring(file.name.lastIndexOf('.'), file.name.length)

        // 创建可写流
        const upStream = fs.createWriteStream(filePath + pat);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
        return ctx.body = {
            data: config.uploadPath + pat
        };
    }
}
module.exports = app