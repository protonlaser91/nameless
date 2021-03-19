export default class TwoWayMap {
    reverseMap: any;
    map: any;

    constructor(map: any){
        this.map = map;
        this.reverseMap = {};
        for(var key in map) {
            var value = map[key];
            this.reverseMap[value] = key;   
   }
    }

    get = (key: any) =>{ return this.map[key]; };
    revGet = (key: any) =>{ return this.reverseMap[key]; };
}