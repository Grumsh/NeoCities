"use strict";

var triominos = angular.module('Triominos', []);
triominos.controller("AppController", function(){
	var self = this;
	this.colors = [
		{
			"score":0,
			"class":"green"
		},
		{
			"score":0,
			"class":"orange"
		},
		{
			"score":0,
			"class":"blue"
		}
	];

	this.color = "green";

	this.setColor= function(piece, position){
		this.pieces[this.color][5-parseInt(piece, 10)] -= 1;
		var i = getIndex(this.color);
		this.colors[i].score += piece *position;
		this.undo.push({
			color:this.color,
			piece:piece,
			position:position,
			label:(""+piece+"*"+position+"="+position*piece)
		});
	};

	function getIndex(color){
		if(color === "green"){
			return 0;
		} else if (color ==="orange"){
			return 1;
		}
		return 2;
	}

	this.moves=[
		{
			"name":"5",
			"class":'five',
			"available":1
		},
		{
			"name":"4",
			"class":'four',
			"available":3
		},
		{
			"name":"3",
			"class":'three',
			"available":3
		},
		{
			"name":"2",
			"class":'two',
			"available":3
		},
		{
			"name":"1",
			"class":'one',
			"available":3
		}
	];

	this.pieces = {};
	this.colors.forEach(function(color){
		var piece = [];
		self.moves.forEach(function(move, index){
			piece.push(move.available);
		});
		self.pieces[color.class] = piece;
	});

	this.undo=[];

	this.undoMove = function(undoIndex){
		undoIndex = this.undo.length-undoIndex-1;
		var move = this.undo.splice(undoIndex, 1)[0];
		this.pieces[move.color][5-parseInt(move.piece, 10)] += 1;
		var i = getIndex(move.color);
		this.colors[i].score -= move.piece * move.position;
	}
	
	this.isPieceAvailable = function(piece){
		return this.pieces[this.color][5-parseInt(piece, 10)] >0;
	};
});

triominos.filter('reverse', function() {
  return function(items) {
  	var ret = [];
  	for (var i = items.length;i>0;i--)
  		ret.push(items[i-1]);
    return ret;
  };
});

