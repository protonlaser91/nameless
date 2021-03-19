"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TwoWayMap {
    constructor(map) {
        this.get = (key) => { return this.map[key]; };
        this.revGet = (key) => { return this.reverseMap[key]; };
        this.map = map;
        this.reverseMap = {};
        for (var key in map) {
            var value = map[key];
            this.reverseMap[value] = key;
        }
    }
}
exports.default = TwoWayMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHdvV2F5TWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvVHdvV2F5TWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBcUIsU0FBUztJQUkxQixZQUFZLEdBQVE7UUFTcEIsUUFBRyxHQUFHLENBQUMsR0FBUSxFQUFFLEVBQUUsR0FBRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsV0FBTSxHQUFHLENBQUMsR0FBUSxFQUFFLEVBQUUsR0FBRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFUbkQsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixLQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtZQUNoQixJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUM7U0FDckM7SUFDQSxDQUFDO0NBSUo7QUFmRCw0QkFlQyJ9