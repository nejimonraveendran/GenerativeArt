class Vector{
    public x: number;
    public y: number;

    constructor(x?: number, y?: number){
        this.x = x;
        this.y = y; 
    }

    //tested
    copy(){
        let v = new Vector();
        v.x = this.x;
        v.y = this.y;
        return v;
    }

    //tested
    add(v: Vector): Vector {
        this.x += v.x;
        this.y += v.y;
        return this;  
    }

    //tested
    subtract(v: Vector): Vector {
        this.x -= v.x;
        this.y -= v.y;
        return this;  
    }

    //tested
    multiply(v: Vector): Vector {
        this.x *= v.x;
        this.y *= v.y;
        return this;  
    }

    //tested
    divide(v: Vector): Vector {
        if (v.x === 0 || v.y === 0) {
            console.warn('Vector error', 'divide by 0');
            return this;
        }

        this.x /= v.x;
        this.y /= v.y;
        return this;
    }

     //tested
    distance(v: Vector): number{
        return v.copy().subtract(this).magnitude();
    }

    //tested
    magnitude(): number{
        return Math.sqrt(this.magSq());
    }
    
    //tested
    magSq(): number {
        const x = this.x;
        const y = this.y;
        return x * x + y * y;
    }

    //tested
    normalize(): Vector{
        const len = this.magnitude();

        if(len !== 0){
            this.x *= 1/len;
            this.y *= 1/len;
        }

        return this;
    }

    //tested
    limit(max: number): Vector{
        const mSq = this.magSq();

        if (mSq > max * max) {
            this.x /= Math.sqrt(mSq);
            this.y /= Math.sqrt(mSq);
            this.x *= max;
            this.y *=max;    
        }

        return this;
    }

    //tested
    setMagnitude(num: number): Vector{
        this.normalize();
        this.x *= num;
        this.y *= num;
        return this;
    }

    dot(vector: Vector): number {
        return this.x * (vector.x || 0) + this.y * (vector.y || 0);
    }

    angleBetween(v: Vector): AngleInfo {
        let angleInRadiansV1 = Math.atan2(v.y, v.x);
        let angleInDegreesV1 = angleInRadiansV1 * (180 / Math.PI); 
        
        let angleInRadiansV2 = Math.atan2(this.y, this.x);
        let angleInDegreesV2 = angleInRadiansV2 * (180 / Math.PI); 

        let radianDifference = Math.abs(angleInRadiansV2 - angleInRadiansV1);
        let degreesDifference = Math.abs(angleInDegreesV2 - angleInDegreesV1);
        
        return new AngleInfo(degreesDifference, radianDifference);
    }


}

class Polar{ 
    public angleInDegrees: number;
    public angleInRadians: number;
    public radius: number;

    constructor(angleInDegrees?: number, angleInRadians?: number, radius?: number){
        this.angleInDegrees = angleInDegrees;
        this.angleInRadians = angleInRadians;
        this.radius = radius;
    }
}

class AngleInfo{
    public angleInDegrees: number;
    public angleInRadians: number;

    constructor(angleInDegrees?: number, angleInRadians?: number){
        this.angleInDegrees = angleInDegrees;
        this.angleInRadians = angleInRadians;
    }
}
