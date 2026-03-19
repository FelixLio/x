import { computed } from "vue";

import type { XComponentConfig, XComponentsConfig } from "../context";

import { useXProviderContextData } from "../context";

export default function useXComponentConfig(
  component: keyof XComponentsConfig,
) {
  const xProviderContext = useXProviderContextData();

  return computed<XComponentConfig>(() => {
    const componentConfig = xProviderContext.value?.[component] ?? {};
    const typedConfig = componentConfig as XComponentConfig;

    return {
      style: typedConfig.style,
      styles: typedConfig.styles ?? {},
      classes: typedConfig.classes ?? {},
      shortcutKeys: typedConfig.shortcutKeys ?? {},
    };
  });
}
