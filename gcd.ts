export class GCD {
    static gcdBruteForce(a: number, b: number): number {
        a = Math.abs(a);
        b = Math.abs(b);

        if (a === 0) return b;
        if (b === 0) return a;

        const start = Math.min(a, b);

        for (let i = start; i >= 1; i--) {
            if (a % i === 0 && b % i === 0) {
            return i;
            }
        }

        return 1;
    }

    static gcdEuclid(a: number, b: number): number {
        a = Math.abs(a);
        b = Math.abs(b);

        if (a === 0) return b;
        if (b === 0) return a;

        if (a === b) return a;

        if (a > b) {
            return this.gcdEuclid(a - b, b);
        } else {
            return this.gcdEuclid(a, b - a);
        }
    }
}