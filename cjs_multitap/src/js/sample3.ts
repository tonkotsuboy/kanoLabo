/// <reference path="../typings/tsd.d.ts" />

window.onload = () => new project.Main();

namespace project {
    export class Main {
        /** HTMLのCanvasエレメント */
        private _canvas:HTMLCanvasElement;
        /** ステージ */
        private _stage:createjs.Stage;
        /** オブジェクトを配置するコンテナ */
        private _container:createjs.Container;
        /** シェイプのライン太さ */
        private LINE_STROKE:number = 1;
        /** シェイプのラインの色 */
        private LINE_COLOR:string = "#ffffff";

        private SMALL_CIRCLE_NUM:number = 4;
        private _smallCircles:createjs.Shape[];

        private _ratio:number = window.devicePixelRatio || 1;

        constructor() {
            this._canvas = <HTMLCanvasElement> document.getElementById("myCanvas")
            this._stage = new createjs.Stage(this._canvas);

            // コンテナを作成する。
            this._container = new createjs.Container();
            this._stage.addChild(this._container);

            // 星、円を作成して、それぞれコンテナに配置する。
            let star:createjs.Shape = this.createStar();
            let circle:createjs.Shape = this.createCircle();
            this._container.addChild(star);
            this._container.addChild(circle);

            this._smallCircles = [];

            for (let i:number = 0; i < this.SMALL_CIRCLE_NUM; i++) {
                let smallCircle:createjs.Shape = this.createCircle(200);
                this._smallCircles.push(smallCircle);
                this._container.addChild(smallCircle);
            }

            // リサイズイベント
            this.resizeHandler();
            window.addEventListener("resize", () => this.resizeHandler());

            // Tickerを作成
            createjs.Ticker.timingMode = createjs.Ticker.RAF;
            createjs.Ticker.addEventListener("tick", (event) => this.tickHandler(event));
        }

        /**
         * 星型図形の作成
         */
        private createStar():createjs.Shape {
            let shape:createjs.Shape = new createjs.Shape();
            shape.graphics.beginStroke(this.LINE_COLOR);
            shape.graphics.setStrokeStyle(this.LINE_STROKE * this._ratio);
            shape.graphics.drawPolyStar(0, 0, 100, 5, 0.5, -90);
            shape.graphics.endStroke();
            shape.scaleX = shape.scaleY = this._ratio;
            return shape;
        }

        /**
         * 円形図形の作成
         */
        private createCircle(circleSize:number = 100):createjs.Shape {
            let shape:createjs.Shape = new createjs.Shape();
            shape.graphics.beginStroke(this.LINE_COLOR);
            shape.graphics.setStrokeStyle(this.LINE_STROKE);
            shape.graphics.drawCircle(0, 0, circleSize);
            shape.graphics.endStroke();
            shape.scaleX = shape.scaleY = this._ratio;
            return shape;
        }

        /**
         * リサイズ時のイベント処理
         */
        private resizeHandler():void {
            var windowWidth:number = window.innerWidth;
            var windowHeight:number = window.innerHeight;

            // Canvasのサイズをwindowのサイズに変更する。
            this._canvas.width = windowWidth * this._ratio;
            this._canvas.height = windowHeight * this._ratio;

            this._canvas.style.zoom = String(1 / this._ratio);

            // オブジェクトを配置するコンテナは、常にステージ中央に配置しておく。
            this._container.x = this._ratio * windowWidth / 2;
            this._container.y = this._ratio * windowHeight / 2;

            // コンテンツ3隅に小サークルを配置する
            for (let i:number = 0; i < this.SMALL_CIRCLE_NUM; i++) {
                let smallCircle:createjs.Shape = this._smallCircles[i];

                smallCircle.x = this._ratio * windowWidth / 2;
                smallCircle.y = this._ratio * windowHeight / 2;

                if (i == 0 || i == 2)
                    smallCircle.x *= -1;
                if (i == 0 || i == 3)
                    smallCircle.y *= -1;
            }



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
}