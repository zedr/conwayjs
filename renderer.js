(function (NS) {

    var
        pluginNS = 'Conway',
        document = NS.document,
        Universe = NS[pluginNS].Universe,
        Library = NS[pluginNS].Library;

    var randomColor = function () {
        // Demo function to test the canvas
        var col = Math.floor(Math.random() * 16777215).toString(16),
            padding = Array(7 - col.length).join("0"),
            rgb = '#' + padding + col;
        return rgb;
    };

    var CanvasRenderer = function (targetId) {
        var
            timer,
            speed = 1000,
            context,
            self = this;

        this.context = document.getElementById(targetId).getContext("2d");
        this.universe = new Universe();

        this.start = function () {
            timer = setInterval( function () { self.renderTick(); }, speed );
        };

        this.stop = function () {
            clearInterval(timer);
        };
    };

    CanvasRenderer.prototype.doRender = function () {
        /* render the canvas */
        this.context.fillStyle = randomColor();
        this.context.fillRect(0, 0, 150, 75);
    };

    CanvasRenderer.prototype.renderTick = function () {
        this.universe.doTick();
        this.doRender();
    };

    CanvasRenderer.prototype.init = function () {
        // Debug by loading a glider
        this.universe.state = Library['glider'];
        NS.console.log("Glider loaded");
    };

    // Plugin registration
    (NS[pluginNS] || (NS[pluginNS] = {}))['Renderer'] = CanvasRenderer;

}(this));
