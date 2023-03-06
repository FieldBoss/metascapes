export default function sphereCloud(nodecount, location) {
    let mySphereCloud = [];
    let mySphereCloud2 = [];
    let center = [];
    function randomSpherePoint(x0,y0,z0,radius){
        var u = Math.random();
        var v = Math.random();
        var theta = 2 * Math.PI * u;
        var phi = Math.acos(2 * v - 1);
        var x = x0 + (radius * Math.sin(phi) * Math.cos(theta));
        var y = y0 + (radius * Math.sin(phi) * Math.sin(theta));
        var z = z0 + (radius * Math.cos(phi));
        return [x,y,z];
    }

    function makeSphereCloud() {
        let min = 101;   let max = 98; let diff = 0;
        for (var j = 0; j < nodecount; j++) {
            switch (location) {
                case "Avatar Park & Ride":
                    mySphereCloud.push(randomSpherePoint(-0.161835,-78.478831,97.35,0.001));
                    center.push(-78.478831); center.push(-0.161835);
                    break;
                case "Fashion District":
                    mySphereCloud.push(randomSpherePoint(-1.2852623809454684,36.82094551772883,97.35,0.001));
                    center.push(36.82094551772883); center.push(-1.2852623809454684);
                    break;
                case "Events Center": 
                    mySphereCloud.push(randomSpherePoint(1.3926136527227584,103.88874184685591,97.35,0.001));
                    center.push(103.88874184685591); center.push(1.3926136527227584);
                    break;
            }
        }
        //get max/min of myCloud z values
        for (var k = 0; k < mySphereCloud.length; k++) {
            if( mySphereCloud[k][2] < min){
                min =  mySphereCloud[k][2]
               }
        }
        for (var m = 0; m < mySphereCloud.length; m++) {
            if( mySphereCloud[m][2] > max){
                max =  mySphereCloud[m][2]; 
            }
        }
    
        diff = max - min;
        for (var x = 0; x < mySphereCloud.length; x++) {
            let p = mySphereCloud[x][2] - min;
            let b = p/diff;
            let elev = b * 60000;
            mySphereCloud2.push([mySphereCloud[x][1], mySphereCloud[x][0], elev]);
        }
    }
    makeSphereCloud();
    return [mySphereCloud2, center]
}
    