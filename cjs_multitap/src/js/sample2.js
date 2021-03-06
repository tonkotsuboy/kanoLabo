/// <reference path="../typings/tsd.d.ts" />
window.onload = function () { return new project.Main(); };
var project;
(function (project) {
    var Main = (function () {
        function Main() {
            var _this = this;
            /** シェイプのライン太さ */
            this.LINE_STROKE = 1;
            /** シェイプのラインの色 */
            this.LINE_COLOR = "#ffffff";
            this.SMALL_CIRCLE_NUM = 4;
            this._canvas = document.getElementById("myCanvas");
            this._stage = new createjs.Stage(this._canvas);
            // コンテナを作成する。
            this._container = new createjs.Container();
            this._stage.addChild(this._container);
            // 星、円を作成して、それぞれコンテナに配置する。
            var star = this.createStar();
            var circle = this.createCircle();
            this._container.addChild(star);
            this._container.addChild(circle);
            this._smallCircles = [];
            for (var i = 0; i < this.SMALL_CIRCLE_NUM; i++) {
                var smallCircle = this.createCircle(200);
                this._smallCircles.push(smallCircle);
                this._container.addChild(smallCircle);
            }
            // リサイズイベント
            this.resizeHandler();
            window.addEventListener("resize", function () { return _this.resizeHandler(); });
            // Tickerを作成
            createjs.Ticker.timingMode = createjs.Ticker.RAF;
            createjs.Ticker.addEventListener("tick", function (event) { return _this.tickHandler(event); });
        }
        /**
         * 星型図形の作成
         */
        Main.prototype.createStar = function () {
            var shape = new createjs.Shape();
            shape.graphics.beginStroke(this.LINE_COLOR);
            shape.graphics.setStrokeStyle(this.LINE_STROKE);
            shape.graphics.drawPolyStar(0, 0, 100, 5, 0.5, -90);
            shape.graphics.endStroke();
            return shape;
        };
        /**
         * 円形図形の作成
         */
        Main.prototype.createCircle = function (circleSize) {
            if (circleSize === void 0) { circleSize = 100; }
            var shape = new createjs.Shape();
            shape.graphics.beginStroke(this.LINE_COLOR);
            shape.graphics.setStrokeStyle(this.LINE_STROKE);
            shape.graphics.drawCircle(0, 0, circleSize);
            shape.graphics.endStroke();
            return shape;
        };
        /**
         * リサイズ時のイベント処理
         */
        Main.prototype.resizeHandler = function () {
            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;
            // Canvasのサイズをwindowのサイズに変更する。
            this._canvas.width = windowWidth;
            this._canvas.height = windowHeight;
            // オブジェクトを配置するコンテナは、常にステージ中央に配置しておく。
            this._container.x = windowWidth / 2;
            this._container.y = windowHeight / 2;
            // コンテンツ3隅に小サークルを配置する
            for (var i = 0; i < this.SMALL_CIRCLE_NUM; i++) {
                var smallCircle = this._smallCircles[i];
                smallCircle.x = windowWidth / 2;
                smallCircle.y = windowHeight / 2;
                if (i == 0 || i == 2)
                    smallCircle.x *= -1;
                if (i == 0 || i == 3)
                    smallCircle.y *= -1;
            }
        };
        /**
         * Tick Handler
         */
        Main.prototype.tickHandler = function (event) {
            if (!event.paused) {
                this._stage.update();
            }
        };
        return Main;
    })();
    project.Main = Main;
})(project || (project = {}));
//# sourceMappingURL=sample2.js.map