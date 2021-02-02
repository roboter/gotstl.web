// title: Spiral ball bearing chute
// author: Peter Robinson
// license: None.  Free for all.
// description: A stackable spiral chute for ball bearings.

var radius = 50;
var slotwidth=6;
var wallthickness=1;


function main(params) {

    var a=2;
    return union(
        section(),
        section().translate([0,0,20]).rotateZ(90),
        section().translate([0,0,40]).rotateZ(180),
        section().translate([0,0,60]).rotateZ(270)
        );

}

function section(){
    return union(
        ramp(1,11,radius-4,radius-4,4),
        ramp(6,11,radius-3,radius-3,1),
        ramp(1,11,radius+3,radius+3,6),
        hub()
        );

}

function hub(){
    return  difference(
        union(
            CSG.cylinder({
            start:[0,0,0],
            end:[0,0,10],
            radius: 10,
            resolution:36
            }),
            CSG.cylinder({
            start:[0,0,10],
            end:[0,0,15],
            radiusStart: 8,
            radiusEnd: 7,
            resolution:36
            }),
            spoke().rotateZ(-27.5),
            spoke().rotateZ(-27.5-45).scale([1,1,0.5])
        ),
        union(
            CSG.cylinder({
            start:[0,0,-1],
            end:[0,0,17],
            radius: 6,
            resolution:36
            }),
            CSG.cylinder({
            start:[0,0,-0.5],
            end:[0,0,5.5],
            radiusStart: 7.9,
            radiusEnd: 6.9,
            resolution:36
            })
        )

    );
}

function spoke(){
    return CSG.cube()
        .scale([radius/2-slotwidth/2,1,5])
        .translate([-radius/2,0,5]);
}

function spiral(){
    var hex = CSG.Polygon.createFromPoints([
            [0,slotwidth/2, 0],
            [0,-slotwidth/2, 0],
            [0,-slotwidth/2, radius],
            [0,slotwidth/2, radius]
    ]).setColor(
        [0, 0.8, 0]
    );
    var angle = 5;
    return hex.solidFromSlices({
        numslices: 365 / angle,
        callback: function(t, slice) {
            var coef = 1 - t * 0.8;
            return this.
            translate([0 , radius, t*10]).
            rotateZ(angle * slice);
        }
    });

}

function ramp(slotwidth,climb,innerradius_start,innerradius_end,basethickness){
    var hex = CSG.Polygon.createFromPoints([
            [0,0, 0],
            [0,slotwidth, 0],
            [0,slotwidth, 1],
            [0,0, 1]
    ]).setColor(
        [0, 0.8, 0]
    );

    var base = CSG.Polygon.createFromPoints([
            [0,0, 0],
            [0,slotwidth, 0],
            [0,slotwidth, 1],
            [0,0, 1]
    ]).setColor(
        [0, 0.8, 0]
    );
    var angle = 5;
    var radiuschange = innerradius_end-innerradius_start

    var bottom = base.solidFromSlices({
        numslices: 95 / angle,
        callback: function(t, slice) {
            return this.
            translate([0 , innerradius_start +t*radiuschange, 0]).
            scale([1,1,basethickness]).
            rotateZ(angle * slice);
        }
    });

    var spiral = 
        hex.solidFromSlices({
        numslices: 95 / angle,
        callback: function(t, slice) {
            return this.
            translate([0 , innerradius_start +t*radiuschange, 0]).
            scale([1,1,climb*(0.1+t*0.9)]).
            rotateZ(angle * slice);
        }
    });


    return union(
        bottom,
        spiral.translate([0,0,basethickness])
    );

}