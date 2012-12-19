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
            canvasWidth = 4000,
            canvasHeight = 2000,
            context,
            frame,
            self = this;

        frame = document.getElementById(targetId);
        frame.width = canvasWidth;
        frame.height = canvasHeight;
        context = target.getContext("2d");
        context.width = canvasWidth;
        context.height = canvasHeight;

        this.frame = frame;
        this.context = context;
        this.universe = new Universe();

        this.start = function () {
            timer = setInterval( function () { self.renderTick(); }, speed );
        };

        this.stop = function () {
            clearInterval(timer);
        };

        this.setSpeed = function (val) {
            if (val > 0) {
                this.stop();
                speed = val;
                this.start();
            }
        };
    };

    CanvasRenderer.prototype.doRender = function () {
        /* render the canvas */
        var
            i,
            state = this.universe.state,
            state_len = this.universe.state.length,
            cell,
            x,
            y;

        this.context.clearRect(0, 0, this.frame.width, this.frame.height);
        this.context.fillStyle = randomColor();

        for (i=0; i < state_len; i++) {
            cell = state[i];
            x = cell[0]+50;
            y = cell[1]+50;

            this.context.fillRect(x, y, 1, 1);
        }
    };

    CanvasRenderer.prototype.renderTick = function () {
        this.universe.doTick();
        this.doRender();
    };

    CanvasRenderer.prototype.addCritter = function (name) {
        // Debug by loading a glider
        this.universe.addCells(Library[name]);
        NS.console.log(name + " loaded.");
    };

    // Plugin registration
    (NS[pluginNS] || (NS[pluginNS] = {}))['Renderer'] = CanvasRenderer;

}(this));
