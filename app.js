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
		var i;
		if(this.color === "green"){
			i = 0;
		} else if (this.color ==="orange"){
			i=1;
		}
		else
			i=2;
		this.colors[i].score += piece *position;
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
	
	this.isPieceAvailable = function(piece){
		return this.pieces[this.color][5-parseInt(piece, 10)] >0;
	};
});
