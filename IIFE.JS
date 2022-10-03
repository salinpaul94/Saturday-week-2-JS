// IIFE = Immediately Invoked Function Expression

// Ex- (function(x,y){
//      console.log(x*y);
//      }
//  )(5, 10);

var area = (function(x, y){
    console.log(x*y);
    return x*y;
    }
)(5, 10);