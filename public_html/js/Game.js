function Game(width, height)
{
    this.width = width;
    this.height = height;
    this.screen = new GameScreen(); 
}

Game.prototype.draw = function(g, x, y) {
    
    g.clearRect(0, 0, this.width, this.height);
    
    this.screen.draw(g, x, y);
};

Game.prototype.update = function(deltaTime) {
    this.screen.update(deltaTime);
};

Game.prototype.onMouseMove = function(location) {
    this.screen.onMouseMove(location);
};

Game.prototype.onMouseDown = function (location) {
    this.screen.onMouseDown(location);
};

Game.prototype.onMouseUp = function(location) {
    this.screen.onMouseUp(location);
};