// Objects in JS contain as key:value pairs
var obj={name:'Demo', count:1}

var obj2={"first name":'Demo', count:1}

// an object can have a key having a function as value to it-

var obj3={name:'Demo',
            count:1,
            updateCount:function(){
                this.count++;
            }
        }

// to delete 'delete obj["keyname"]