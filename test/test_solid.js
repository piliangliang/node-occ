var assert = require("assert");
var should = require("should");

var occ = require("../build/Release/occ");

// see https://npmjs.org/package/should

describe("testing solid construction",function(){


	describe("empty solid", function() {
	    var solid;
		before(function() {
			solid = new occ.Solid();		
		});
		it("should have no faces", function() { 
			solid.numFaces.should.equal(0);	
		});
		it("should have no solid", function() { 
			solid.numSolids.should.equal(0);
		});
	});
	describe("makeBox with 2 points", function() {
	    var solid;
		before(function() {
			solid = new occ.Solid();		
			solid.makeBox([10,20,30],[20,40,60]);
		});
		it("should have 6 faces", function() { 
			solid.numFaces.should.equal(6);
		});
		it("should have 1 solid", function() { 
			solid.numSolids.should.equal(1);
		});
		it("should have a shapeType beeing 'SOLID' ", function() { 
			solid.shapeType.should.equal("SOLID");
		});
		it("should have (20-10)*(40-20)*(60-30) as a volume", function() { 
			solid.volume.should.equal( (20-10)*(40-20)*(60-30));
		});
		it("should have ~ 2*((20-10)*(40-20)+(20-10)*(60-30)+(40-20)*(60-30)) as a area", function() { 
			
			var expectedArea = 2*((20-10)*(40-20)+(20-10)*(60-30)+(40-20)*(60-30));
			var eps = 0.001;
			solid.area.should.be.within( expectedArea - eps, expectedArea+eps );
		});
	});

	describe("fuse 2 overlapping boxes", function() {
	    var solid1;
	    var solid2;
		before(function() {
			solid1 = new occ.Solid();		
			solid1.makeBox([10,20,30],[20,40,60]);
			solid2 = new occ.Solid();		
			solid2.makeBox([15,25,35],[-20,-40,-60]);
			
			solid1.fuse(solid2);
			//xx var solid3= solid1.fuse(solid2,true);
			//xx var solid3= occ.fuse(solid1,solid2);
		});
		it("should have 12 faces", function() { 
			solid1.numFaces.should.equal(12);
		});
		it("should have 1 solid", function() { 
			solid1.numSolids.should.equal(1);
		});
	});
	describe("cut a corner of a box", function() {
	    var solid1;
	    var solid2;
		before(function() {
			solid1 = new occ.Solid();		
			solid1.makeBox([10,20,30],[20,40,60]);
			solid2 = new occ.Solid();		
			solid2.makeBox([15,25,35],[-20,-40,-60]);
			
			solid1.cut(solid2);

		});
		it("should have 9 faces", function() { 
			solid1.numFaces.should.equal(9);
		});
		it("should have 1 solid", function() { 
			solid1.numSolids.should.equal(1);
		});
	});
    describe("Meshing a simple solid", function() {
        describe("Meshing a box", function() {
            var solid;
            before(function(){
                solid = new occ.Solid();
                solid.makeBox([10,20,30],[20,30,40]);

            });
            it("should have a mesh with 4*6 vertices", function() {
                solid.mesh.numVertices.should.equal(24);
            });
            it("should have a mesh with (2*3)*4 edges", function() {
                solid.mesh.numEdges.should.equal(24);
            });
            it("should have a mesh with 2*6 triangles", function() {
                solid.mesh.numTriangles.should.equal(12);
            });
        });

    });
	describe("Testing  Shape __prototype", function() {
		 var solid;
            before(function(){
                solid = new occ.Solid();
                solid.makeBox([10,20,30],[20,30,40]);
            });
			it("should expose the expected properties ", function() {
			   var expected = ["shapeType","numFaces","isNull","isValid","rotate","fuse"];
			   var actual = []
               for ( var j in occ.Solid.prototype) {
			      actual.push(j.toString())	
			   }
			   // console.log(actual);
			   var missing = []
               for ( var j in expected) {			   
			       if (actual.indexOf(expected[j]) == -1) {
				    missing.push(expected[j]);
				   }
			   }
			   missing.should.be.empty;

            });
	});
    describe("exporting a solid to STEP ", function() {
        var solid1,solid2;
        before(function(){
            solid1 = new occ.Solid();
            solid1.makeBox([10,20,30],[20,30,40]);
            solid1 = new occ.Solid();
            solid1.makeBox([20,30,50],[110,40,00]);
        });
        it("should export a single solid to STEP", function() {
            occ.writeSTEP("toto1.step",solid);
        });
        it("should export many solids to STEP", function() {
            occ.writeSTEP("toto2.step",solid1,solid2);
        });
    });

});