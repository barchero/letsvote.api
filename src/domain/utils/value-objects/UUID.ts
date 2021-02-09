export class UUID {
    readonly value: string;
    constructor(value: string = UUID.create()){
        this.value = value;
    }

    static create(): string{
        return (""+1e7+-1e3+-4e3+-8e3+-1e11).replace(/1|0/g,() => (0|Math.random()*16).toString(16));
    }
}
