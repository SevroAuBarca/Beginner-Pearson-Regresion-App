var express = require("express");
var app = express();
var port = 3000;
var data = [
    [178, 69.8],
    [160, 67.5],
    [183, 81],
    [152, 60.8],
    [168, 70.2],
    [178, 75.6],
    [188, 80.1],
    [165, 72],
    [157, 59.4],
    [170, 65.3],
    [165, 62.6],
    [173, 68.4],
];
var pearsonRegression = /** @class */ (function () {
    function pearsonRegression(data) {
        this.data = data;
        this.sumX = this.summatoryData(0);
        this.sumY = this.summatoryData(1);
    }
    pearsonRegression.prototype.summatoryData = function (number, data) {
        if (data === void 0) { data = this.data; }
        return data.reduce(function (acc, item) { return (acc = acc + item[number]); }, 0);
    };
    pearsonRegression.prototype.getMiddle = function (number) {
        return number / this.data.length;
    };
    pearsonRegression.prototype.getMinusMiddle = function (value, middle) {
        return value - middle;
    };
    pearsonRegression.prototype.getToSquareMinusMiddle = function (index, middle) {
        var _this = this;
        return this.data.map(function (item) {
            return Math.pow(_this.getMinusMiddle(item[index], middle), 2);
        });
    };
    pearsonRegression.prototype.getPlusMinusMiddle = function (x, y) { };
    return pearsonRegression;
}());
app.get("/", function (req, res) {
    var pearson = new pearsonRegression(data);
    var middleX = pearson.getMiddle(pearson.sumX);
    var middleY = pearson.getMiddle(pearson.sumY);
    res.json({
        summatory: {
            x: pearson.sumX,
            y: pearson.sumY
        },
        middle: {
            x: middleX,
            y: middleY
        },
        toSquare: {
            x: pearson.getToSquareMinusMiddle(0, middleX),
            y: pearson.getToSquareMinusMiddle(1, middleY)
        }
    });
});
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
