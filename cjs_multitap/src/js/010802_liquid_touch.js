/// <reference path="../typings/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var project;
(function (project) {
    var Main = (function () {
        function Main() {
            var _this = this;
            this.MOUSE_DOWN = "mousedown";
            this.PRESS_MOVE = "pressmove";
            this.PRESS_UP = "pressup";
            this._canvas = document.getElementById("myCanvas");
            this._stage = new createjs.Stage(this._canvas);
            // コンテナを作成する。
            this._container = new createjs.Container();
            this._stage.addChild(this._container);
            // 星を作成して、それぞれコンテナに配置する。
            var star = new project.Star();
            this._container.addChild(star);
            star.addEventListener(this.MOUSE_DOWN, function (event) { return _this.mouseDownHandler(event); });
            // リサイズイベント
            this.resizeHandler();
            window.addEventListener("resize", function () { return _this.resizeHandler(); });
            // Tickerを作成
            createjs.Ticker.timingMode = createjs.Ticker.RAF;
            createjs.Ticker.addEventListener("tick", function (event) { return _this.tickHandler(event); });
        }
        Main.prototype.mouseDownHandler = function (event) {
            var _this = this;
            // イベントの発生したオブジェクト
            var target = event.target;
            // タッチした位置を保持しておく
            var offset = new createjs.Point();
            offset.x = target.x - event.stageX;
            offset.y = target.y - event.stageY;
            target.addEventListener(this.PRESS_MOVE, function (event) { return _this.pressMoveHandler(event, offset); });
            target.addEventListener(this.PRESS_UP, function (event) { return _this.pressUpHandler(event); });
        };
        Main.prototype.pressMoveHandler = function (event, offset) {
            var target = event.target;
            target.x = event.stageX + offset.x;
            target.y = event.stageY + offset.y;
        };
        Main.prototype.pressUpHandler = function (event) {
            var target = event.target;
            target.removeEventListener(this.PRESS_MOVE);
            target.removeEventListener(this.PRESS_UP);
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
    var Star = (function (_super) {
        __extends(Star, _super);
        function Star() {
            _super.call(this);
            /** シェイプのライン太さ */
            this.LINE_STROKE = 1;
            /** シェイプのラインの色 */
            this.LINE_COLOR = "#ffffff";
            this.graphics.beginFill(this.LINE_COLOR);
            this.graphics.setStrokeStyle(this.LINE_STROKE);
            this.graphics.drawPolyStar(0, 0, 100, 5, 0.5, -90);
            this.graphics.endStroke();
        }
        return Star;
    })(createjs.Shape);
    project.Star = Star;
})(project || (project = {}));
window.addEventListener("load", function () { return new project.Main(); });
//# sourceMappingURL=010802_liquid_touch.js.map