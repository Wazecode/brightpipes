/**
 * MenuScreen handles all drawing and input related to the menu screen.
 */

/**
 * Creates a new MenuScreen
 * @param {type} width The width of the canvas
 * @param {type} height The height of the canvas
 * @param {type} screenController The screen controller
 */
function MenuScreen(width, height, screenController) {
    this.CELL_DIMENSIONS = 50;

    this.START_BUTTON_LOCATION = new Vector(0, 95);
    // this.LEADERBOARDS_BUTTON_LOCATION = new Vector(0, 145);
    this.TUTORIAL_BUTTON_LOCATION = new Vector(0, 145);
    this.SETTINGS_BUTTON_LOCATION = new Vector(0, 195);
    
    var outer = this;

    this.startButton = new Button("Start", function () {
        screenController.setScreen(new GameScreen(width, height, screenController));
    });
    // this.leaderboardsButton = new Button("Leaderboard", function () {
    //     screenController.setScreen(new LeaderboardScreen(width, height, screenController));
    // });
    this.tutorialButton = new Button("Tutorial", function () {
        screenController.setScreen(new TutorialScreen(width, height, screenController));
    });
    this.settingsButton = new Button("Settings", function () {
        screenController.setScreen(new SettingsScreen(width, height, screenController, outer));
    });

    this.lastActiveControl = null;

    this.width = width;
    this.height = height;
}

/**
 * Performs any update to the logic in this screen.
 * @param {type} deltaTime The time that has past since this method was last invoked.
 */
MenuScreen.prototype.update = function (deltaTime) {

};

/**
 * Corrects the layout respective to the canvas size.
 */
MenuScreen.prototype.correctLayout = function () {
    this.START_BUTTON_LOCATION.x = (this.width - this.startButton.getBounds().width) / 2;
    // this.LEADERBOARDS_BUTTON_LOCATION.x = (this.width - this.leaderboardsButton.getBounds().width) / 2;
    this.TUTORIAL_BUTTON_LOCATION.x = (this.width - this.tutorialButton.getBounds().width) / 2;
    this.SETTINGS_BUTTON_LOCATION.x = (this.width - this.settingsButton.getBounds().width) / 2;
};

/**
 * Draws game screen.
 * @param {Context2D} g Graphics context object through which to draw.
 * @param {Number} x The draw offset
 * @param {Number} y The draw offset
 */
MenuScreen.prototype.draw = function (g, x, y) {
    this.correctLayout();

    g.fillStyle = "#F4BF09";
    g.font = "60px Trade Winds";
    var text = "Menu";
    var txtX = (this.width - g.measureText(text).width) / 2;
    g.fillText(text, x + txtX, 60);

    this.startButton.draw(g, x + this.START_BUTTON_LOCATION.x, y + this.START_BUTTON_LOCATION.y);
    // this.leaderboardsButton.draw(g, x + this.LEADERBOARDS_BUTTON_LOCATION.x, y + this.LEADERBOARDS_BUTTON_LOCATION.y);
    this.tutorialButton.draw(g, x + this.TUTORIAL_BUTTON_LOCATION.x, y + this.TUTORIAL_BUTTON_LOCATION.y);
    this.settingsButton.draw(g, x + this.SETTINGS_BUTTON_LOCATION.x, y + this.SETTINGS_BUTTON_LOCATION.y);

};

/**
 * On mouse down event handler.
 * @param {Vector} location Location of mouse cursor during event.
 */
MenuScreen.prototype.onMouseDown = function (location) {
    this.onMouseMove(location);

    if (this.lastActiveControl !== null)
        this.lastActiveControl.onMouseDown(location);
};

/**
 * On mouse up event handler, passes to active screen.
 * @param {Vector} location Location of mouse cursor during event.
 */
MenuScreen.prototype.onMouseUp = function (location) {
    if (this.lastActiveControl !== null)
        this.lastActiveControl.onMouseUp(location);
};

/**
 * On mouse down event handler.
 * @param {Vector} location Location of mouse cursor during event.
 */
MenuScreen.prototype.onMouseMove = function (location) {
    var selectedControl = null;

    if (this.startButton.getBounds().add(this.START_BUTTON_LOCATION).contains(location))
        selectedControl = this.startButton;
    // else if (this.leaderboardsButton.getBounds().add(this.LEADERBOARDS_BUTTON_LOCATION).contains(location))
    //     selectedControl = this.leaderboardsButton;
    else if (this.tutorialButton.getBounds().add(this.TUTORIAL_BUTTON_LOCATION).contains(location))
        selectedControl = this.tutorialButton;
    else if (this.settingsButton.getBounds().add(this.SETTINGS_BUTTON_LOCATION).contains(location))
        selectedControl = this.settingsButton;

    if (selectedControl !== this.lastActiveControl) {
        if (this.lastActiveControl !== null)
            this.lastActiveControl.onMouseLeave();

        if (selectedControl !== null)
            selectedControl.onMouseEnter();
    }

    this.lastActiveControl = selectedControl;
};

/**
 * Handles key events for this screen.
 * @param {type} keyCode The key code for the key that was pressed.
 */
MenuScreen.prototype.onKeyDown = function (keyCode) {

};