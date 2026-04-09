import type { CSSProperties, PropType, VNodeChild } from "vue";

import { computed, defineComponent } from "vue";

import type {
  CardInfo,
  ExtendNode,
  FileCardSlotInfo,
  SemanticType,
} from "../FileCard";

import { getSize } from "../utils";

export interface FileProps {
  styles?: Partial<Record<SemanticType, CSSProperties>>;
  classes?: Partial<Record<SemanticType, string>>;
  prefixCls?: string;
  name?: string;
  namePrefix?: string;
  ext?: string;
  size?: "small" | "default";
  byte?: number;
  src?: string;
  type?: string;
  description?: ExtendNode;
  icon?: VNodeChild;
  iconColor?: string;
  onClick?: (info: CardInfo, event: MouseEvent) => void;
  mask?: ExtendNode;
  descriptionRenderSlot?: (info: FileCardSlotInfo) => VNodeChild;
  maskRenderSlot?: (info: FileCardSlotInfo) => VNodeChild;
  iconSlot?: (info: FileCardSlotInfo) => VNodeChild;
}

const File = defineComponent({
  name: "FileCardFile",
  props: {
    styles: {
      type: Object as PropType<Partial<Record<SemanticType, CSSProperties>>>,
      default: () => ({}),
    },
    classes: {
      type: Object as PropType<Partial<Record<SemanticType, string>>>,
      default: () => ({}),
    },
    prefixCls: {
      type: String,
      default: "antd-file-card",
    },
    name: {
      type: String,
      default: "",
    },
    namePrefix: {
      type: String,
      default: "",
    },
    ext: {
      type: String,
      default: "",
    },
    size: {
      type: String as PropType<"small" | "default">,
      default: "default",
    },
    byte: {
      type: Number,
      default: undefined,
    },
    src: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: undefined,
    },
    description: {
      type: [
        String,
        Number,
        Object,
        Array,
        Function,
        Boolean,
      ] as PropType<ExtendNode>,
      default: undefined,
    },
    icon: {
      type: [String, Number, Object, Array, Function] as PropType<VNodeChild>,
      default: undefined,
    },
    iconColor: {
      type: String,
      default: undefined,
    },
    onClick: {
      type: Function as PropType<(info: CardInfo, event: MouseEvent) => void>,
      default: undefined,
    },
    mask: {
      type: [
        String,
        Number,
        Object,
        Array,
        Function,
        Boolean,
      ] as PropType<ExtendNode>,
      default: undefined,
    },
    descriptionRenderSlot: {
      type: Function as PropType<FileProps["descriptionRenderSlot"]>,
      default: undefined,
    },
    maskRenderSlot: {
      type: Function as PropType<FileProps["maskRenderSlot"]>,
      default: undefined,
    },
    iconSlot: {
      type: Function as PropType<FileProps["iconSlot"]>,
      default: undefined,
    },
  },
  setup(props) {
    const compCls = computed(() => `${props.prefixCls}-file`);

    const getCardInfo = () => {
      const size = typeof props.byte === "number" ? getSize(props.byte) : "";
      return {
        size,
        icon: props.icon,
        name: props.name,
        namePrefix: props.namePrefix,
        nameSuffix: props.ext,
        src: props.src,
        type: props.type,
      } as CardInfo;
    };

    const descNode = computed(() => {
      const fallback =
        typeof props.byte === "number" ? getSize(props.byte) : "";
      if (typeof props.description === "function")
        return props.description(getCardInfo());
      if (props.description === false) return null;
      return props.description ?? fallback;
    });

    const maskNode = computed(() => {
      if (typeof props.mask === "function") return props.mask(getCardInfo());
      if (props.mask === false) return null;
      return props.mask;
    });

    const iconNode = computed(() => props.icon);

    const renderWithSlot = (
      slotRender: ((info: FileCardSlotInfo) => VNodeChild) | undefined,
      originNode: VNodeChild,
    ) => {
      if (slotRender) {
        return slotRender({
          info: getCardInfo(),
          originNode,
        });
      }

      return originNode;
    };

    const hasDescription = computed(
      () =>
        !!props.descriptionRenderSlot ||
        (descNode.value !== null && descNode.value !== undefined),
    );

    const hasMask = computed(
      () =>
        !!props.maskRenderSlot ||
        (maskNode.value !== null && maskNode.value !== undefined),
    );

    const handleClick = (event: MouseEvent) => {
      if (!props.onClick) return;
      props.onClick(getCardInfo(), event);
    };

    return () => (
      <div
        class={[
          compCls.value,
          props.classes.file,
          {
            [`${compCls.value}-pointer`]: !!props.onClick,
            [`${compCls.value}-small`]: props.size === "small",
          },
        ]}
        style={props.styles.file}
        onClick={handleClick}
      >
        <div
          class={[`${compCls.value}-icon`, props.classes.icon]}
          style={{
            color: props.iconColor,
            ...props.styles.icon,
          }}
        >
          {renderWithSlot(props.iconSlot, iconNode.value)}
        </div>
        <div class={`${compCls.value}-content`}>
          <div
            class={[`${compCls.value}-name`, props.classes.name]}
            style={props.styles.name}
          >
            <span class={`${compCls.value}-name-prefix`}>
              {props.namePrefix}
            </span>
            <span class={`${compCls.value}-name-suffix`}>{props.ext}</span>
          </div>
          {hasDescription.value ? (
            <div
              class={[
                `${compCls.value}-description`,
                props.classes.description,
              ]}
              style={props.styles.description}
            >
              {renderWithSlot(props.descriptionRenderSlot, descNode.value)}
            </div>
          ) : null}
        </div>
        {hasMask.value ? (
          <div class={`${compCls.value}-mask`}>
            <div class={`${compCls.value}-mask-info`}>
              {renderWithSlot(props.maskRenderSlot, maskNode.value)}
            </div>
          </div>
        ) : null}
      </div>
    );
  },
});

export default File;
