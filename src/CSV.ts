export class CSV
{
    private fs = require("fs");

    raw: string;

    constructor()
    {
        this.raw = "";
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
        });
    }
}
