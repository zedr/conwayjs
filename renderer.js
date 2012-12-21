(function (NS) {

    var
        pluginNS = 'Conway',
        document = NS.document,
        Universe = NS[pluginNS].Universe,
        Library = NS[pluginNS].Library;

    var randomColor = function () {
        // Generate a random color
        var col = Math.floor(Math.random() * 16777215).toString(16),
            padding = Array(7 - col.length).join("0"),
            rgb = '#' + padding + col;
        return rgb;
    };

    var CanvasRenderer = function (targetId, width, height) {
        var
            timer,
            speed = 1000,
            context,
            frame,
            self = this;

        this.frame = document.getElementById(targetId);

        this.context = target.getContext("2d");

        this.universe = new Universe(width || 3000, height || 3000);

        this.frame.width = this.universe.width;
        this.frame.height = this.universe.height;

        var renderTick = function () {
            self.universe.doTick();
            self.doRender();
        };

        this.start = function () {
            timer = setInterval(renderTick, speed );
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

    CanvasRenderer.prototype.addCritter = function (name, x, y) {
        this.universe.addCells(Library[name], x, y);
        NS.console.log(name + " loaded.");
    };

    // Plugin registration
    (NS[pluginNS] || (NS[pluginNS] = {}))['Renderer'] = CanvasRenderer;

}(this));
