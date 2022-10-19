<h1 align="center">sphere-collision</h1>
<div align="center">
一个用于在Canvas上实现球体碰撞场景，高可用、高扩展的库。
</div>

## 使用说明

安装
```
npm i sphere-collision
```
使用示例
```
import SphereCollision from "sphere-collision";

const canvasWidth = 600; // 画布宽度
const canvasHeight = 600; // 画布高度
const globuleRadius = 60; // 球半径

const beforeDrawGlobules = (sphereCollision) => {
    const { ctx } = sphereCollision;
    // 绘制整个画布的背景色
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
};

const canvas = document.getElementById("myCanvas");
if (canvas) {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");

    // 实例化SphereCollision对象
    const sphereCollision = new SphereCollision(
    ctx,
    canvas,
    [
        {
        initX: 400,
        initY: 400,
        vx: 6,
        vy: 3,
        radius: globuleRadius,
        },
    ],
    false,
    beforeDrawGlobules
    );

    // 开使执行动画
    sphereCollision.start();
}
```

## 案例展示
### 1. 探照灯效果
<img src="./images/searchlight.gif" alt="" width={1200}/>

### 2. 球体碰撞交互效果
<img src="./images/globuleInteraction.gif" alt="" width={1000}/>

### 3. 消灭行星小游戏
<img src="./images/killPlanet.gif" alt="" width={1000}/>

## API文档
**SphereCollisionC**

| 参数（顺序从上往下依次传入）      | 数据类型                                                  | 说明                         | 默认值           | 是否必需 |
|---------------------|-------------------------------------------------------|----------------------------|---------------|------|
| ctx                 | CanvasRenderingContext2D                              | context对象                  | null          | 是    |
| canvas              | HTMLCanvasElement                                     | canvas对象                   | null          | 是    |
| globuleOptionsList  | GlobuleOptions[]                                      | 初始化球体的配置列表                 | []            | 否    |
| monitorMousePos     | boolean                                               | 是否监听鼠标的位置                  | false         | 否    |
| beforeDrawGlobules  | (sphereCollision: SphereCollisionC) => void            | 每一帧绘制所有球体之前执行的钩子函数         | null          | 否    |
| afterDrawGlobules   | (sphereCollision: SphereCollisionC) => void            | 每一帧绘制所有球体之后执行的钩子函数         | null          | 否    |
| collisionRectX      | number                                                | 球体发生碰撞的矩形区域的左上角x坐标（向右为正方向） | 0             | 否    |
| collisionRectY      | number                                                | 球体发生碰撞的矩形区域的左上角y坐标（向下为正方向） | 0             | 否    |
| collisionRectWidth  | number                                                | 球体发生碰撞的矩形区域的宽度             | canvas.width  | 否    |
| collisionRectHeight | number                                                | 球体发生碰撞的矩形区域的高度             | canvas.height | 否    |
| **属性**                  |                                                       |                            |               |      |
| globuleList         | GlobuleC[]                                             | 保存所有球体实例的列表                |               |      |
| animationState      | enum AnimationState{"waitStart","inAnimation","stop"} | 当前动画状态                     |               |      |
| **方法**                  |                                                       |                            |               |      |
| start               | () => void                                            | 必须调用该方法，canvas才渲染，开始执行相关动画 |               |      |
| createGlobule       | (globuleOptions: GlobuleOptions) => Globule           | 创建球体实例的方法                  |               |      |
| updateGlobuleList   | (newGlobuleList: GlobuleC[]) => void                   | 更新球体实例列表，用于动态增加或减少球体实例     |               |      |
| stop                | () => void                                            | 停止整个frame动画                |  |  |
<br/>

**GlobuleOptions**

| 属性                       | 数据类型                                | 说明                             | 默认值       | 是否必需 |
|--------------------------|-------------------------------------|--------------------------------|-----------|------|
| id                       | any                                 | 可以传任意值，可以把它当做存放数据的地方           |           | 否    |
| initX                    | number                              | 初始x坐标（向右为正方向）                  | 0         | 否    |
| initY                    | number                              | 初始y坐标（向下为正方向）                  | 0         | 否    |
| vx                       | number                              | 在水平方向的速度（向右为正方向）               | 0         | 否    |
| vy                       | number                              | 在垂直方向的速度（向下为正方向）               | 0         | 否    |
| radius                   | number                              | 半径                             | 10        | 否    |
| color                    | string                              | 颜色                             | "#666666" | 否    |
| alpha                    | number                              | 透明度                            | 1         | 否    |
| alphaChangeV             | number                              | 透明度改变的速度（正数增加，负数减小）            | 0         | 否    |
| bgImg                    | string                              | 背景图片地址                         | ""        | 否    |
| collisionLossV           | number                              | 碰撞时的速度损失                       | 0         | 否    |
| moveLossV                | number                              | 移动时的速度损失                       | 0         | 否    |
| gDirection               | "toInit"                            | 引力方向。暂时只有"toInit"，即指向球体的初始位置   |           | 否    |
| gCoefficient             | number                              | 引力系数                           | 0         | 否    |
| requiredMouseInteraction | boolean                             | 是否需要鼠标交互                       | false     | 否    |
| fixedPos                 | boolean                             | 是否固定位置                         | false     | 否    |
| receiveOutForce          | boolean                             | 是否接受外力                         | true      | 否    |
| receiveWallForce         | boolean                             | 是否接受墙的力（与墙体发生碰撞）               | true      | 否    |
| onlyCheckCollision       | boolean                             | 当不接受外力时，是否检测碰撞（检测碰撞相关状态但不获取外力） | false     | 否    |
| maxMouseOutForce         | number                              | 鼠标交互时能提供的最大力限制                 | null      | 否    |
| maxMoveV                 | number                              | 最大移动速度                         | null      | 否    |
| beforeDrawGlobule        | (globule: GlobuleC) => void          | 每一帧绘制该球体之前执行的钩子函数              | null      | 否    |
| afterDrawGlobule         | (globule: GlobuleC) => void          | 每一帧绘制该球体之后执行的钩子函数              | null      | 否    |
| nextFrameGlobuleState    | (nextFrameGlobule: GlobuleC) => void | 每一帧绘制球体后,计算并修改为下一帧状态后执行的钩子函数   | null      | 否    |
<br/>

**Globule**

| 属性                       | 数据类型                                                | 说明                             |
|--------------------------|-----------------------------------------------------|--------------------------------|
| id                       | any                                                 | 任意值,存放数据的地方                    |
| ctx                      | CanvasRenderingContext2D                            | context对象                      |
| canvas                   | HTMLCanvasElement                                   | canvas对象                       |
| requiredMouseInteraction | boolean                                             | 是否需要鼠标交互                       |
| maxMouseOutForce         | number                                              | 鼠标交互时能提供的最大力限制                 |
| initX                    | number                                              | 初始x坐标（向右为正方向）                  |
| initY                    | number                                              | 初始y坐标（向下为正方向）                  |
| x                        | number                                              | x坐标（向右为正方向）                    |
| y                        | number                                              | y坐标（向下为正方向）                    |
| vx                       | number                                              | 在水平方向的速度（向右为正方向）               |
| vy                       | number                                              | 在垂直方向的速度（向下为正方向）               |
| radius                   | number                                              | 半径                             |
| color                    | string                                              | 颜色                             |
| alpha                    | number                                              | 透明度                            |
| alphaChangeV             | number                                              | 透明度改变的速度（正数增加，负数减小）            |
| bgImg                    | string                                              | 背景图片地址                         |
| collisionLossV           | number                                              | 碰撞时的速度损失                       |
| moveLossV                | number                                              | 移动时的速度损失                       |
| gDirection               | "toInit"                                            | 引力方向。暂时只有"toInit"，即指向球体的初始位置   |
| gCoefficient             | number                                              | 引力系数                           |
| fixedPos                 | boolean                                             | 是否固定位置                         |
| receiveOutForce          | boolean                                             | 是否接受外力                         |
| receiveWallForce         | boolean                                             | 是否接受墙的力（与墙体发生碰撞）               |
| onlyCheckCollision       | boolean                                             | 当不接受外力时，是否检测碰撞（检测碰撞相关状态但不获取外力） |
| mousePos                 | MousePos{ mouseX：number \| null; mouseY: number \| null } | 鼠标相对于canvas的位置坐标               |
| maxMoveV                 | number \| null                                       | 最大移动速度                         |
| inCollisionGlobule       | boolean                                             | 是否与其他球体发生碰撞的状态                 |
| inCollisionGlobuleList   | GlobuleC[]                                           | 与其他球体碰撞的其他球体实例列表               |
| inCollisionWall          | boolean                                             | 是否与墙体发生碰撞的状态                   |
| beforeDrawGlobule        | (globule: GlobuleC) => void \| null                   | 每一帧绘制该球体之前执行的钩子函数              |
| afterDrawGlobule         | (globule: GlobuleC) => void \| null                   | 每一帧绘制该球体之后执行的钩子函数              |
| **方法**                       |                                                       |                            |
| addOutForce              | (outForceVX: number, outForceVY: number, isCollision?:boolean = false) => void | 添加外力。用于动态增加或减小球体速度 |

## 特别说明
* 球体的fixedPos属性为true时， 获取不了外力，所以小球不会移动，但还是会使其他球体受到外力，进行反弹。
* 球体的receiveOutForce属性为false时，获取不了来自鼠标和其他小球的外力, 所以不会与另一球体发生碰撞，即使另一个球体的receiveOutForce属性为true。
* 球体的noReceiveWallForce属性为true时，获取不了来自墙体的外力，所以不会与墙体发生碰撞。
* 球体的beforeDrawGlobule和afterDrawGlobule两个钩子函数，主要作用是在绘制球体之前和之后分别去绘制其他元素，而afterCalculateNextFrameGlobule钩子函数是用于做一些其他的逻辑判断，因为只有这个函数里拿到的球体实例是带有是否发生碰撞等相关信息的。
* 如果实例化SphereCollision对象时传入了beforeDrawGlobules钩子函数，并且需要在每一帧绘制前要清除整个画布，则需要使用者自己清除，这是考虑到有些不需要清除的场景。
