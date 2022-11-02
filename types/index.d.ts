export interface BeforeDrawGlobulesFn {
  (sphereCollision: SphereCollisionC): void;
}
export interface AfterDrawGlobulesFn {
  (sphereCollision: SphereCollisionC): void;
}
export interface OnMouseFn {
  (event: MouseEvent, sphereCollision: SphereCollisionC): void;
}
export interface SphereCollisionOptions {
  collisionRectX?: number;
  collisionRectY?: number;
  collisionRectWidth?: number;
  collisionRectHeight?: number;
  monitorMousePos?: boolean;
  beforeDrawGlobules?: BeforeDrawGlobulesFn | null;
  afterDrawGlobules?: AfterDrawGlobulesFn | null;
  onMouseDownCanvas?: OnMouseFn | null;
  onMouseMoveCanvas?: OnMouseFn | null;
  onMouseUpCanvas?: OnMouseFn | null;
  onMouseLeaveCanvas?: OnMouseFn | null;
}
export interface BeforeDrawGlobuleFn {
  (globule: GlobuleC): void;
}
export interface AfterDrawGlobuleFn {
  (globule: GlobuleC): void;
}
export interface AfterCalculateNextFrameGlobuleFn {
  (nextFrameGlobule: GlobuleC): void;
}
export interface GlobuleOptions {
  id?: any;
  initX?: number;
  initY?: number;
  vx?: number;
  vy?: number;
  radius?: number;
  color?: string;
  alpha?: number;
  alphaChangeV?: number;
  bgImg?: string;
  collisionLossV?: number;
  moveLossV?: number;
  gDirection?:
    | "toInit"
    | "toBottom"
    | "toTop"
    | "toLeft"
    | "toRight"
    | undefined;
  gCoefficient?: number;
  requiredMouseInteraction?: boolean;
  mouseInteractionBehavior?: "over" | "drag";
  fixedPos?: boolean;
  receiveOutForce?: boolean;
  receiveWallForce?: boolean;
  onlyCheckCollision?: boolean;
  maxMouseOutForce?: number | null;
  maxMoveV?: number | null;
  beforeDrawGlobule?: BeforeDrawGlobuleFn | null | undefined;
  afterDrawGlobule?: AfterDrawGlobuleFn | null | undefined;
  afterCalculateNextFrameGlobule?:
    | AfterCalculateNextFrameGlobuleFn
    | null
    | undefined;
}
export interface MousePos {
  mouseX: number | null;
  mouseY: number | null;
}
export enum AnimationState {
  "waitStart" = 0,
  "inAnimation" = 1,
  "stop" = 2,
}
export declare class SphereCollisionC {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  globuleList: GlobuleC[];
  options: SphereCollisionOptions;
  frameId: number;
  animationState: AnimationState;
  mousePos: MousePos;
  prevMousePos: MousePos;
  isMouseDown: boolean;
  mouseDownPos: MousePos;
  mouseInGlobuleList: GlobuleC[];
  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    globuleOptionsList?: GlobuleOptions[],
    options?: SphereCollisionOptions
  );
  start(): void;
  createGlobule(globuleOptions: GlobuleOptions): GlobuleC;
  updateGlobuleList(newGlobuleList: GlobuleC[]): void;
  stop(): void;
  private _updateMouseProperty;
  private _getMouseInGlobuleList;
  private _checkMouseInGlobule;
}
export declare class GlobuleC {
  id: any;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  requiredMouseInteraction: boolean;
  mouseInteractionBehavior: "over" | "drag" | undefined;
  maxMouseOutForce: number | null;
  initX: number;
  initY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  alphaChangeV: number;
  bgImg: string;
  collisionLossV: number;
  moveLossV: number;
  gDirection:
    | "toInit"
    | "toBottom"
    | "toTop"
    | "toLeft"
    | "toRight"
    | undefined;
  gCoefficient: number;
  fixedPos: boolean;
  receiveOutForce: boolean;
  receiveWallForce: boolean;
  onlyCheckCollision: boolean;
  mousePos: MousePos;
  maxMoveV: number | null;
  controlledByMouse: boolean;
  firstHoverX: number | null;
  firstHoverY: number | null;
  outForceLastTime: number | null;
  inCollisionGlobule: boolean;
  inCollisionGlobuleList: GlobuleC[];
  inCollisionWall: boolean;
  beforeDrawGlobule: BeforeDrawGlobuleFn | null | undefined;
  afterDrawGlobule: AfterDrawGlobuleFn | null | undefined;
  afterCalculateNextFrameGlobule:
    | AfterCalculateNextFrameGlobuleFn
    | null
    | undefined;
  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    id?: any,
    initX?: number,
    initY?: number,
    vx?: number,
    vy?: number,
    radius?: number,
    color?: string,
    alpha?: number,
    alphaChangeV?: number,
    bgImg?: string,
    collisionLossV?: number,
    moveLossV?: number,
    gDirection?: "toInit" | "toBottom" | "toTop" | "toLeft" | "toRight",
    gCoefficient?: number,
    requiredMouseInteraction?: boolean,
    mouseInteractionBehavior?: "over" | "drag",
    fixedPos?: boolean,
    receiveOutForce?: boolean,
    receiveWallForce?: boolean,
    onlyCheckCollision?: boolean,
    maxMouseOutForce?: number | null,
    mousePos?: MousePos,
    maxMoveV?: number | null,
    beforeDrawGlobule?: BeforeDrawGlobuleFn | null,
    afterDrawGlobule?: AfterDrawGlobuleFn | null,
    afterCalculateNextFrameGlobule?: AfterCalculateNextFrameGlobuleFn | null
  );
  private _draw;
  _drawCurrentFrame(
    globuleList: GlobuleC[],
    index: number,
    collisionRectX: number,
    collisionRectY: number,
    collisionRectWidth: number,
    collisionRectHeight: number
  ): void;
  _calculateNextFrame(
    globuleList: GlobuleC[],
    index: number,
    collisionRectX: number,
    collisionRectY: number,
    collisionRectWidth: number,
    collisionRectHeight: number
  ): void;
  private _getOutForce;
  addOutForce(
    outForceVX: number,
    outForceVY: number,
    isCollision?: boolean
  ): void;
  private _checkHover;
  private _checkCollisionWall;
  private _checkCollisionGlobule;
  private _addCollisionLoss;
  private _addMoveLoss;
  private _checkOverlap;
  private _checkOverWall;
  private _addGravitation;
}
