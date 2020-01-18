/*
 * @Author: cbl
 * @Date: 2019-12-11 11:06:19
 * @Description: 工具集合 - 解放全人类的生产工具 - 持续更新中...
 */

export default class UtilToolDiy {

    /** copy所有属性 copy接口必备 */
    static copyAll = function (source, dest) {
        for (let key in source) {
            dest[key] = source[key];
        }
        return source;
    }

    /** copy Array */
    static clone = function (arr) {
        var a = [];
        for (var i in arr) {
            a.push(arr[i]);
        }
        return a;
    }

    /** 深拷贝 */
    static deepCopy(data) {
        return JSON.parse(JSON.stringify(data));
    }

    /** 区间随机数[min,max) */
    static random = function (min, max): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * des:截取小数位 
     * @_num    需要截取的数字
     * @_digits 需要截取的小数位，默认0
     * @returns 截取后的数字 (number类型)
     */
    static toPrecision = function (_num: string | number, _digits: number = 0): number {
        let num = +_num;
        let digits = _digits;
        return +num.toPrecision(digits);
    }

    /** 从indices内，获得另一个index 
     *  @param [index] 原来的值
     *  @param [indices] 数字数组
    */
    static getOtherIndex = function (index, indices) {
        if (!indices.length) {
            console.error("长度为0，或者没有length这个属性");
            return;
        }
        if (indices.length == 1) {
            return index;
        }
        let random = this.random(0, indices.length);
        if (random === index) {                     // 如果index为原来值，则重新随机
            this.getOtherIndex(index, indices);
        } else {
            return random;
        }
    }

    /** 获取obj的第index个元素 */
    static getObjEle(index, obj) {
        return Object.values(obj)[index];
    }

    /** 对象转数组 */
    static objToArr = function (obj) {
        return Object.keys(obj).map(i => obj[i]);
    }

    /** 对象升序 */
    static sortRise = function (value = "value", type = "type") {
        return function (a, b) {
            if (a[value] == b[value]) {
                return a[type] - b[type];
            }
            return a[value] - b[value];
        }
    }

    /** 对象降序 */
    static sortDes = function (value = "value", type = "type") {
        return function (a, b) {
            if (a[value] == b[value]) {
                return b[type] - a[type];
            }
            return b[value] - a[value];
        }
    }

    /** 判断数组是否包含元素 */
    static isContains = function (arr, element) {
        return [...arr].indexOf(element) === -1 ? false : true
    }

    /** 数字千位分隔符 100万 -> 1,000,000 */
    static calcCoinDigit = function (coin) {
        let temp = String(coin);
        let reg = /(?=(\B\d{3})+$)/g;
        temp = temp.replace(reg, ",");
        return temp;
    }

    /**
    * @description: 截取小数位
    * @param {a}    要截取的数值，可以是数字也可以是字符串
    * @param {num}  截取的小数位数
    * @param {isNum}  是否输出为数字
    * example:  input: (1000.123,2)
    *           output: "1000.12"
    */
    static subStringNum = function (a, num, isNum = false) {
        var a_type = typeof (a);
        if (a_type == "number") {
            var aStr = a.toString();
            var aArr = aStr.split('.');
        } else if (a_type == "string") {
            var aArr = a.split('.');
        }

        if (aArr.length > 1) {  // 保证有小数
            a = aArr[0] + "." + aArr[1].substr(0, num);
        }
        return isNum ? Number(a) : a;
    }

    /**
     * 时间转换, 秒->时分秒, HH:mm:ss
     */
    static formatSecondsTo_HHmmss = function (value) {
        let result = + value
        let h = Math.floor(result / 3600) < 10 ?
            '0' + Math.floor(result / 3600) :
            Math.floor(result / 3600)
        let m = Math.floor((result / 60 % 60)) < 10 ?
            '0' + Math.floor((result / 60 % 60)) :
            Math.floor((result / 60 % 60))
        let s = Math.floor((result % 60)) < 10 ?
            '0' + Math.floor((result % 60)) :
            Math.floor((result % 60))
        return `${h}:${m}:${s}`
    }

    /**
     * 时间转换，秒->分秒, mm:ss
     */
    static formatSecondsTo_mmss = function (value) {
        value = +value;
        let minute: any = Math.floor(value / 60);
        let second: any = Math.floor(value % 60);
        minute < 10 ? minute = "0" + minute : null;
        second < 10 ? second = "0" + second : null;
        return `${minute}:${second}`;
    }

    /**
     * des: 倒计时
     * @param  : 结束时间戳(单位秒)
     * @beginTime ? 开始时间
     */
    static countDown_mmss = function (endTime, beginTime?: number) {
        let time = Number(endTime);
        let now;
        let cd;
        let res;
        (String(time)).length == 13 ? time /= 1000 : time;
        (String(beginTime)).length == 13 ? beginTime /= 1000 : beginTime;
        now = beginTime || Number(new Date()) / 1000;
        cd = time - now;
        cd > 0 ? res = UtilToolDiy.formatSecondsTo_mmss(cd) : res = null;
        return res;
    }

    /**
     * 根据时间撮转换成日期
     * @param _date 时间对象
     */
    static formatDate(_date: Date) {
        let year = _date.getFullYear();
        let month = _date.getMonth() + 1;
        let date = _date.getDate();
        let hour = _date.getHours();
        let minute = _date.getMinutes();
        let second = _date.getSeconds();
        let strSecond = "";
        if (second < 10) {
            strSecond = second.toString()
            strSecond = "0" + strSecond;
        } else {
            strSecond = second.toString();
        }
        let time = year + "." + month + "." + date + "\\n" + hour + ":" + minute + ":" + strSecond;
        while (time.indexOf("\\n") >= 0) { time = time.replace("\\n", " \n "); }
        return time
    }


    /** 计算大厅金币单位  百万，亿 */
    public calcCoinUnit(coin, fixed = 2) {
        let temp = String(coin);
        coin = Number(coin);
        if (Math.abs(coin % 10000) === 0) { fixed = 0 };
        if (Math.abs(coin / 10000) >= 1) {
            temp = (coin / 10000).toFixed(fixed) + "万";
            if (Math.abs(coin / 100000000) >= 1) {
                temp = (coin / 100000000).toFixed(fixed) + "亿";
            }
        }
        return temp;
    }


    /**
     * 不会让代码整个卡死的睡眠方法，请用以下方法使用：
     * await sleep(1000);
     * @param ms 暂停毫秒数
     */
    static sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    /** 随机截取num个元素 */
    static randomElement(_arr: any[], num): any[] {
        let arr = this.copyAll(_arr, []) as any[];
        let result = [];
        num > arr.length && (num = arr.length);
        for (let i = 0; i < num; i++) {
            let ran = Math.floor(Math.random() * arr.length);
            result.push(arr.splice(ran, 1)[0]);
        }
        return result;
    }

}

// =-=-=-=-=-=-=-=-=- 本地存储 =-=-==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=
export class StorageMgr {
    // 根据版本号，更新玩家存储的数据
    private static VERSION = "1.0.0";

    static enum = {
        test: "test_idle",
        StorageJson: {
            // localPath: "StorageJson_localPath_",
        }
    }
    /** 根据名字清除本地存储 */
    static clearStorageByName = function (tokenName) {
        cc.sys.localStorage.removeItem(StorageMgr.VERSION + tokenName)
    }
    /** 根据名字获取本地存储数据 - 复杂数据 */
    static getStorageJSON = function (tokenName) {
        let data = cc.sys.localStorage.getItem(StorageMgr.VERSION + tokenName);
        if (data instanceof Array && data.length < 1) { return null; }
        if (data) { return JSON.parse(data) }
        return null;
    }
    /** 根据名字本地存储数据 - 复杂数据 */
    static setStorageJSON = function (tokenName, data) {
        cc.sys.localStorage.setItem(StorageMgr.VERSION + tokenName, JSON.stringify(data));
    }
    /** 根据名字获取本地存储数据 - 简单数据 */
    static getStorage = function (tokenName) {
        return cc.sys.localStorage.getItem(StorageMgr.VERSION + tokenName);
    }
    /** 根据名字本地存储数据 - 简单数据 */
    static setStorage = function (tokenName, data) {
        cc.sys.localStorage.setItem(StorageMgr.VERSION + tokenName, data);
    }
}


// =-=-=-=-=-=-=- 需要Cocos配合的工具 =-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=
export class CocosUtilTool {

    /** 远程sprite */
    static loadSpriteByUrl(_url: string, node: cc.Node, spriteType = "png") {
        cc.loader.load({ url: _url, type: spriteType }, (err, texture) => {
            if (!err && texture) {
                let spriteFrame = new cc.SpriteFrame(texture);
                node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }
        });
    }

    /** 本地sprite */
    static loadSpriteByLocal(_url: string, _node: cc.Node) {
        let url = _url;
        let node = _node;
        cc.loader.loadRes(url, cc.SpriteFrame, (err, texture) => {
            node.getComponent(cc.Sprite).spriteFrame = texture;
        })
    }

    /**
     * @des: 数字label刷新动画
     * @param: label 需要改变的数字label
     * @param: num 最终显示的结果
     * @param: head/tail label头尾字符串
     * @param: decimal 小数位精度
     * @param: originNum 原数字 (计算区间，做规定数值label动画增加) 
     */
    static async labelAnime({ label, num, head = "", tail = "", decimal = 2, originNum = 0 }) {
        // 1 找到差值
        let gap = 0;
        if (num >= originNum) {
            gap = (num - originNum) / 10;
        } else {
            label.string = `${head}${num.toFixed(decimal)}${tail}`;
            return;
        }
        // 2 原值 + 差值*i
        for (let i = 0; i < 10; i++) {
            let temp = (originNum + (i + 1) * gap).toFixed(decimal);
            label.string = `${head}${temp}${tail}`;
            await UtilToolDiy.sleep(80);
        }
        label.string = `${head}${num.toFixed(decimal)}${tail}`;
    }

    /**
     * des: labelAnime的倒序版
     */
    static async labelAnimeDes({ label, num, head = "", tail = "", decimal = 2, originNum = 0 }) {
        // 1 找到差值
        let gap = 0;
        if (originNum >= num) {
            gap = (originNum - num) / 10
        } else {
            label.string = `${head}${num.toFixed(decimal)}${tail}`;
            return;
        }
        // 2 原值 - 差值*i
        for (let i = 0; i < 10; i++) {
            let temp = (originNum - gap * (i + 1)).toFixed(decimal);
            label.string = `${head}${temp}${tail}`;
            await UtilToolDiy.sleep(80);
        }
        label.string = `${head}${num.toFixed(decimal)}${tail}`;
    }

}