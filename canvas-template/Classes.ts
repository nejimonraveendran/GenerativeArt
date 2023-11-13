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
    add(vector: Vector): Vector {
        this.x += vector.x;
        this.y += vector.y;
        return this;  
    }

    //tested
    subtract(vector: Vector): Vector {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;  
    }

    //tested
    multiply(vector: Vector): Vector {
        this.x *= vector.x;
        this.y *= vector.y;
        return this;  
    }

    //tested
    divide(vector: Vector): Vector {
        if (vector.x === 0 || vector.y === 0) {
            console.warn('Vector error', 'divide by 0');
            return this;
        }

        this.x /= vector.x;
        this.y /= vector.y;
        return this;
    }

     //tested
    distance(vector: Vector): number{
        return vector.copy().subtract(this).magnitude();
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

    angleBetween(vector) {
        // const magSqMult = this.magSq() * vector.magSq();

        // // Returns NaN if either vector is the zero vector.
        // if (magSqMult === 0) {
        //   return NaN;
        // }

        // const u = this.cross(v);
        // // The dot product computes the cos value, and the cross product computes
        // // the sin value. Find the angle based on them. In addition, in the case of
        // // 2D vectors, a sign is added according to the direction of the vector.
        // let angle = Math.atan2(u.mag(), this.dot(vector));

        // if (this.isPInst) {
        //   angle = this._fromRadians(angle);
        // }

        // return angle;
    }


}

class Polar{ 
    public angleInDegrees: number;
    public radius: number;

    constructor(angleInDegrees: number, radius: number){
        this.angleInDegrees = angleInDegrees;
        this.radius = radius;
    }
}

class Particle{
    public x: number;
    public y: number;
    public speed: number;
    public xDir: number;
    public yDir: number;

    public draw(){
        circle(this.x,  this.y, 10, 'white');
    }
}

