export class CSV
{
    private fs = require("fs");

    raw: string;
    grid: any;
    ready: boolean;

    constructor()
    {
        this.raw = "";
        this.ready = false;
    }

    open(fn: string)
    {
        this.fs.readFile(fn, (err: any, data: any) =>
        {
            if (err)
            {
                return console.error(err);
            }

            this.raw = data.toString();
            this.parse();
        });
    }

    parse()
    {
        let lines: any = this.raw.split("\n");
        let row: number = 0;
        let col: number = 0;
        this.grid = [];

        lines.forEach((e: any) =>
        {
            this.grid[row] = [];
            let pts = e.split(",");
            pts.forEach((f: any) =>
            {
                this.grid[row][col++] = f;
            });
            row++;
            col = 0;
        });

        this.ready = true;
    }

    isReady()
    {
        return this.ready;
    }

    get(row: number, col: number)
    {
        return this.grid[row][col];
    }

    getCol(col: number)
    {
        let out: any = [];
        this.grid.forEach((e: any) =>
        {
            out.push(e[col]);
        });

        return out;
    }
}
