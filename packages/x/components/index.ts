import type { App } from 'vue'
import { version } from '../package.json'
import Actions, {
  ActionsAudio,
  ActionsCopy,
  ActionsFeedback,
  ActionsItem,
  XActions,
} from './actions'
import Bubble, {
  XBubble,
  XBubbleDivider,
  XBubbleList,
  XBubbleSystem,
} from './bubble'

const components = [
  XBubble,
  XBubbleList,
  XBubbleSystem,
  XBubbleDivider,
  XActions,
  ActionsAudio,
  ActionsCopy,
  ActionsFeedback,
  ActionsItem,
]

export default {
  install(app: App) {
    components.forEach((component) => {
      if (component.name)
        app.component(component.name, component)
    })
  },
  version,
}

export {
  Actions,
  ActionsAudio,
  ActionsCopy,
  ActionsFeedback,
  ActionsItem,
  Bubble,
  version,
  XActions,
  XBubble,
  XBubbleDivider,
  XBubbleList,
  XBubbleSystem,
}

export type {
  ActionsAudioProps,
  ActionsClickInfo,
  ActionsCopyProps,
  ActionsFeedbackProps,
  ActionsItemProps,
  ActionsProps,
  ActionsRef,
  ItemType,
} from './actions'

export type {
  BubbleItemType,
  BubbleListProps,
  BubbleListRef,
  BubbleProps,
  BubbleRef,
} from './bubble'
