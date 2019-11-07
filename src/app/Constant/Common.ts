export class Common {
    static setRadomNumber(): number {
        const idr = Math.floor(Math.random() * 1000);
        return idr;
     }

     static Guid(): any {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
     }
}