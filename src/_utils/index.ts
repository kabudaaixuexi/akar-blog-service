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
  return (
    year +
    "-" +
    todo(mon) +
    "-" +
    todo(day) +
    " " +
    todo(hour) +
    ":" +
    todo(min) +
    ":" +
    todo(sec)
  );
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
      return "星期天";
      break;
    case 1:
      return "星期一";
      break;
    case 2:
      return "星期二";
      break;
    case 3:
      return "星期三";
      break;
    case 4:
      return "星期四";
      break;
    case 5:
      return "星期五";
      break;
    case 6:
      return "星期六";
      break;
  }
}

export function getUuiD(randomLength = Math.random()) {
  return Number(
    Math.random().toString().substr(2, randomLength) + Date.now()
  ).toString(36);
}

// zsq
export function VerifiEmptyField(fields: any[]) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): void {
    let fn = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      let emptyField: String = "";
      fields.forEach((ev) => {
        (args[0][ev] === undefined || args[0][ev] === "") && (emptyField = ev);
      });
      return emptyField
        ? {
            statusCode: 999,
            message: `${emptyField}不能为空`,
          }
        : await fn.apply(this, args);
    };
  };
}

/**
 * 筛选发布的文章
 * type -- explain -- params -- resultType
 * 0 -- 某人发布的文章 -- {uid} -- []
 * 1 -- 某个分类的文章 -- {drawe} -- []
 * 2 -- 某一篇文章 -- {noteid} -- {}
 * 3 -- 某人点赞的文章 -- {uid} -- []
 * 4 -- 某人收藏的文章 -- {uid} -- []
 * 5 -- 某人浏览的文章 -- {uid} -- []
 * 6 -- 点赞量前二十 -- {} -- []
 * 7 -- 收藏量前二十 -- {} -- []
 * 8 -- 浏览量前二十 -- {} -- []
 * 9 -- 随机抽取二十篇文章 -- {} -- []
 */
export function filterPulishLish(list = [], payload) {
  const { type } = payload;
  const pulishList: any = list.filter(ev => !!ev.published)
  if (type == undefined) {
    return pulishList;
  }
  let result: any = [];
  switch (Number(type)) {
    case 0:
      result = pulishList.filter((ev) => ev.uid == payload.uid) || [];
      break;
    case 1:
      result = pulishList.filter((ev) => ev.drawe == payload.drawe);
      break;
    case 2:
      result = list.find((ev) => ev.noteid == payload.noteid) || {};
      break;
    case 3:
      result = pulishList.filter((ev) => {
        const stars = ev.extData?.star || [];
        return stars.includes(payload.uid);
      });
      break;
    case 4:
      result = pulishList.filter((ev) => {
        const takes = ev.extData?.take || [];
        return takes.includes(payload.uid);
      });
      break;
    case 5:
      result = pulishList.filter((ev) => {
        const skims = ev.extData?.skim || [];
        return skims.includes(payload.uid);
      });
      break;
    case 6:
      result = pulishList
        .sort((a, b) => {
          return (b.extData?.star || []).length - (a.extData?.star || []).length;
        })
        .slice(0, 20);
      break;
    case 7:
      result = pulishList
        .sort((a, b) => {
          return (b.extData?.take || []).length - (a.extData?.take || []).length;
        })
        .slice(0, 20);
      break;
    case 8:
      result = pulishList
        .sort((a, b) => {
          return (b.extData?.skim || []).length - (a.extData?.skim || []).length;
        })
        .slice(0, 20);
      break;
    case 9:
      result = getRandomArrayElements(pulishList, 20);
      break;
  }
  return result;
}
function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
  }
  