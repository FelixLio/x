export {};

declare module "vue" {
  export interface GlobalComponents {
    AActions: (typeof import("./dist/actions"))["default"];
    AActionsAudio: (typeof import("./dist/actions"))["ActionsAudio"];
    AActionsCopy: (typeof import("./dist/actions"))["ActionsCopy"];
    AActionsFeedback: (typeof import("./dist/actions"))["ActionsFeedback"];
    AActionsItem: (typeof import("./dist/actions"))["ActionsItem"];
    ABubble: (typeof import("./dist/bubble"))["default"];
    ABubbleList: (typeof import("./dist/bubble"))["BubbleList"];
    ABubbleSystem: (typeof import("./dist/bubble"))["BubbleSystem"];
    ABubbleDivider: (typeof import("./dist/bubble"))["BubbleDivider"];
    XActions: (typeof import("./dist/actions"))["default"];
    XActionsAudio: (typeof import("./dist/actions"))["ActionsAudio"];
    XActionsCopy: (typeof import("./dist/actions"))["ActionsCopy"];
    XActionsFeedback: (typeof import("./dist/actions"))["ActionsFeedback"];
    XActionsItem: (typeof import("./dist/actions"))["ActionsItem"];
    XBubble: (typeof import("./dist/bubble"))["default"];
    XBubbleList: (typeof import("./dist/bubble"))["BubbleList"];
    XBubbleSystem: (typeof import("./dist/bubble"))["BubbleSystem"];
    XBubbleDivider: (typeof import("./dist/bubble"))["BubbleDivider"];
  }
}
