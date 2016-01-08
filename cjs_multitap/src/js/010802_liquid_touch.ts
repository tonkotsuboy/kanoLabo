/// <reference path="../typings/tsd.d.ts" />

namespace project {
    import MouseEvent = createjs.MouseEvent;
    export class Main {
        /** HTMLのCanvasエレメント */
        private _canvas:HTMLCanvasElement;
        /** ステージ */
        private _stage:createjs.Stage;
        /** オブジェクトを配置するコンテナ */
        private _container:createjs.Container;

        public MOUSE_DOWN:string = "mousedown";

        public PRESS_MOVE:string = "pressmove";

        public PRESS_UP:string = "pressup";

        constructor() {
            this._canvas = <HTMLCanvasElement> document.getElementById("myCanvas");
            this._stage = new createjs.Stage(this._canvas);

            // コンテナを作成する。
            this._container = new createjs.Container();
            this._stage.addChild(this._container);

            // 星を作成して、それぞれコンテナに配置する。
            let star:project.Star = new project.Star();
            this._container.addChild(star);

            star.addEventListener(this.MOUSE_DOWN, (event:MouseEvent) => this.mouseDownHandler(event));

            // リサイズイベント
            this.resizeHandler();
            window.addEventListener("resize", () => this.resizeHandler());

            // Tickerを作成
            createjs.Ticker.timingMode = createjs.Ticker.RAF;
            createjs.Ticker.addEventListener("tick", (event:MouseEvent) => this.tickHandler(event));
        }

        private mouseDownHandler(event:MouseEvent):void {
            // イベントの発生したオブジェクト
            var target = event.target;
            // タッチした位置を保持しておく
            var offset:createjs.Point = new createjs.Point();
            offset.x = target.x - event.stageX;
            offset.y = target.y - event.stageY;

            target.addEventListener(this.PRESS_MOVE, (event:MouseEvent) => this.pressMoveHandler(event, offset));
            target.addEventListener(this.PRESS_UP, (event:MouseEvent) => this.pressUpHandler(event));
        }

        private pressMoveHandler(event:MouseEvent, offset:createjs.Point):void {
            var target = event.target;
            target.x = event.stageX + offset.x;
            target.y = event.stageY + offset.y;
        }

        private pressUpHandler(event:MouseEvent):void {
            var target = event.target;
            target.removeEventListener(this.PRESS_MOVE);
            target.removeEventListener(this.PRESS_UP);
        }

        /**
         * リサイズ時のイベント処理
         */
        private resizeHandler():void {
            var windowWidth:number = window.innerWidth;
            var windowHeight:number = window.innerHeight;
            // Canvasのサイズをwindowのサイズに変更する。
            this._canvas.width = windowWidth;
            this._canvas.height = windowHeight;
            // オブジェクトを配置するコンテナは、常にステージ中央に配置しておく。
            this._container.x = windowWidth / 2;
            this._container.y = windowHeight / 2;
        }

        /**
         * Tick Handler
         */
        private tickHandler(event):void {
            if (!event.paused) {
                this._stage.update();
            }
        }
    }

    export class Star extends createjs.Shape {
        /** シェイプのライン太さ */
        private LINE_STROKE:number = 1;
        /** シェイプのラインの色 */
        private LINE_COLOR:string = "#ffffff";

        constructor() {
            super();
            this.graphics.beginFill(this.LINE_COLOR);
            this.graphics.setStrokeStyle(this.LINE_STROKE);
            this.graphics.drawPolyStar(0, 0, 100, 5, 0.5, -90);
            this.graphics.endStroke();
        }
    }
}

window.addEventListener("load", () => new project.Main());

