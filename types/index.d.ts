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
    gDirection?: "toInit" | undefined;
    gCoefficient?: number;
    requiredMouseInteraction?: boolean;
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
  export interface BeforeDrawGlobulesFn {
    (sphereCollision: SphereCollisionC): void;
  }
  export interface AfterDrawGlobulesFn {
    (sphereCollision: SphereCollisionC): void;
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
    frameId: number;
    animationState: AnimationState;
    monitorMousePos: boolean;
    mousePos: MousePos;
    collisionRectX: number;
    collisionRectY: number;
    collisionRectWidth: number;
    collisionRectHeight: number;
    beforeDrawGlobules: BeforeDrawGlobulesFn | null | undefined;
    afterDrawGlobules: AfterDrawGlobulesFn | null | undefined;
    constructor(
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      globuleOptionsList?: GlobuleOptions[],
      monitorMousePos?: boolean,
      beforeDrawGlobules?: BeforeDrawGlobulesFn,
      afterDrawGlobules?: AfterDrawGlobulesFn,
      collisionRectX?: number,
      collisionRectY?: number,
      collisionRectWidth?: number,
      collisionRectHeight?: number
    );
    start(): void;
    createGlobule(globuleOptions: GlobuleOptions): GlobuleC;
    updateGlobuleList(newGlobuleList: GlobuleC[]): void;
    stop(): void;
  }
  export declare class GlobuleC {
    id: any;
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    requiredMouseInteraction: boolean;
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
    gDirection: "toInit" | undefined;
    gCoefficient: number;
    fixedPos: boolean;
    receiveOutForce: boolean;
    receiveWallForce: boolean;
    onlyCheckCollision: boolean;
    mousePos: MousePos;
    maxMoveV: number | null;
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
      gDirection?: "toInit",
      gCoefficient?: number,
      requiredMouseInteraction?: boolean,
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
    _draw(): void;
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
    _initCollisionState(): void;
    _getOutForce(
      forceX: number,
      forceY: number,
      forceVX: number,
      forceVY: number,
      isMouse?: boolean
    ): {
      outForceVX: number;
      outForceVY: number;
    };
    addOutForce(
      outForceVX: number,
      outForceVY: number,
      isCollision?: boolean
    ): void;
    _checkHover(): void;
    _checkCollisionWall(
      collisionRectX: number,
      collisionRectY: number,
      collisionRectWidth: number,
      collisionRectHeight: number
    ): void;
    _checkCollisionGlobule(outGlobule: GlobuleC): void;
    _addCollisionLoss(direction: "x" | "y"): void;
    _addMoveLoss(): void;
    _checkOverlap(outGlobule: GlobuleC): void;
    _checkOverWall(
      collisionRectX: number,
      collisionRectY: number,
      collisionRectWidth: number,
      collisionRectHeight: number
    ): void;
    _addGravitation(): void;
  }
  