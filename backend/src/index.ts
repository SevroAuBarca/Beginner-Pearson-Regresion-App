const express = require("express");
const app = express();
const port = 3000;

type tableData = Array<number[]>;

const data: tableData = [
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

class pearsonRegression {
  public sumX: number;
  public sumY: number;
  private data: tableData;
  constructor(data: tableData) {
    this.data = data;
    this.sumX = this.summatoryData(0);
    this.sumY = this.summatoryData(1);
  }

  summatoryData(number: number, data: tableData = this.data): number {
    return data.reduce(
      (acc: number, item: number[]) => (acc = acc + item[number]),
      0
    );
  }
  getMiddle(number: number) {
    return number / this.data.length;
  }
  getMinusMiddle(value: number, middle: number) {
    return value - middle;
  }
  getToSquareMinusMiddle(index: number, middle: number) {
    return this.data.map((item) =>
      Math.pow(this.getMinusMiddle(item[index], middle), 2)
    );
  }
  getPlusMinusMiddle(x: number, y: number) {}
}

app.get("/", (req: any, res: any) => {
  const pearson = new pearsonRegression(data);
  const middleX = pearson.getMiddle(pearson.sumX);
  const middleY = pearson.getMiddle(pearson.sumY);
  res.json({
    summatory: {
      x: pearson.sumX,
      y: pearson.sumY,
    },
    middle: {
      x: middleX,
      y: middleY,
    },
    toSquare: {
      x: pearson.getToSquareMinusMiddle(0, middleX),
      y: pearson.getToSquareMinusMiddle(1, middleY),
    },
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
