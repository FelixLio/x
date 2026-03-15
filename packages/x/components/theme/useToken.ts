import type { Theme } from '@antdv-next/cssinjs'
import type { Ref } from 'vue'
import type { DesignTokenProviderProps } from './context'
import type { AliasToken, GlobalToken, SeedToken } from './interface'
import useAntdToken, {
  ignore as antdIgnore,
  unitless as antdUnitless,
  getComputedToken as getAntdComputedToken,
} from 'antdv-next/dist/theme/useToken'

export const unitless: {
  [key in keyof AliasToken]?: boolean
} = antdUnitless

export const ignore: {
  [key in keyof AliasToken]?: boolean
} = antdIgnore

export const getComputedToken = getAntdComputedToken as (
  originToken: SeedToken,
  overrideToken: DesignTokenProviderProps['components'] & {
    override?: Partial<AliasToken>
  },
  theme: Theme<any, any>,
) => any

export function useInternalToken(): [
  theme: Ref<Theme<SeedToken, AliasToken>>,
  realToken: Ref<GlobalToken>,
  hashId: Ref<string>,
  token: Ref<GlobalToken>,
  cssVar: Ref<DesignTokenProviderProps['cssVar']>,
] {
  const [theme, token, hashId, realToken, cssVar] = useAntdToken()
  return [
    theme as Ref<Theme<SeedToken, AliasToken>>,
    realToken as Ref<GlobalToken>,
    hashId,
    token as Ref<GlobalToken>,
    cssVar as Ref<DesignTokenProviderProps['cssVar']>,
  ]
}

export default function useToken() {
  const [theme, _realToken, hashId, token] = useInternalToken()

  return { theme, token, hashId }
}
