export function getTime() {
    var now = new Date();
    var year = now.getFullYear();
    var mon = now.getMonth() + 1;
    var day = now.getDate();
    var week = now.getDay();
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();

    // return year+"-"+todo(mon)+"-"+todo(day)+"-"+
    // toweek(week)+todo(hour)+":"+todo(min)+":"+todo(sec)
    return year + "-" + todo(mon) + "-" + todo(day) + " " + todo(hour) + ":" + todo(min) + ":" + todo(sec)
}
function todo(num) {
    if (num < 10) {
        return "0" + num;
    } else {
        return num;
    }
}
function toweek(num) {
    switch (num) {
        case 0:
            return '星期天';
            break;
        case 1:
            return '星期一';
            break;
        case 2:
            return '星期二';
            break;
        case 3:
            return '星期三';
            break;
        case 4:
            return '星期四';
            break;
        case 5:
            return '星期五';
            break;
        case 6:
            return '星期六';
            break;
    }
}

export function getUuiD(randomLength = Math.random()){
    return Number(Math.random().toString().substr(2,randomLength) + Date.now()).toString(36)
}

// zsq
export function VerifiEmptyField(fields: any[]) {
    return function(target:any,propertyKey:string,descriptor:PropertyDescriptor):void{
        let fn = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            let emptyField: String = ''
            fields.forEach(ev => {
                (args[0][ev] === undefined || args[0][ev] === '') && (emptyField = ev)
            });
            return emptyField ? {
                statusCode: 999,
                message: `${emptyField}不能为空`
            } : await fn.apply(this, args);
        }
    }
}