#!/c/dev/apps/nodejs/node

'use strict';

var aList = ['firstValue', 'secondValue', 'thirdValue'];

function init(){

	aList.forEach(function(o, index){
		if(o === 'secondValue') aList.splice(index,1);
	});
	aList.forEach(function(o, index){ console.log(o);});

}

init();
