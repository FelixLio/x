import Bubble from "./Bubble";
import BubbleList from "./BubbleList";
import BubbleDivider from "./Divider";
import BubbleSystem from "./System";

export type {
  BubbleItemType,
  BubbleListProps,
  BubbleListRef,
  BubbleProps,
  BubbleRef,
} from "./interface";

type BubbleType = typeof Bubble & {
  List: typeof BubbleList;
  System: typeof BubbleSystem;
  Divider: typeof BubbleDivider;
};

const BubbleWithSub = Bubble as BubbleType;
BubbleWithSub.List = BubbleList;
BubbleWithSub.System = BubbleSystem;
BubbleWithSub.Divider = BubbleDivider;

export { BubbleDivider, BubbleList, BubbleSystem };

export default BubbleWithSub;
