import { useRef } from "react"
import { _Tiles, type TilesProp } from "./tilesClass"

const InitializeTiles = () => {
  const _tiles = useRef<_Tiles>(null)

  if (!_tiles.current) {
    _tiles.current = new _Tiles()
  }

  return { _tiles }
}

/**
 * Tiles component renders a flexible tile layout with leading, title, subtitle, and trailing sections.
 * @example
 * <Tiles leading={Icon} title={TitleComponent} subtitle={SubtitleComponent} trailing={ActionButton} />
 * @see TilesProp
 * @prop leading - Optional React element type for leading content.
 * @prop title - Optional React element type for title.
 * @prop subtitle - Optional React element type for subtitle.
 * @prop trailing - Optional React element type for trailing content.
 * @prop padding - Padding (default: ".75rem 1rem").
 * @prop gap - Gap between items (default: ".75rem").
 * @prop borderBottom - Optional bottom border style.
 * @prop className - Optional CSS class name.
 * @prop style - Optional inline CSS styles.
 * @prop gest - Optional HTML div attributes.
 * @prop onFunc - Callback receiving the _Tiles instance.
 */
export default function Tiles({ ...a }: TilesProp) {
  const { _tiles } = InitializeTiles()
  a?.onFunc?.(_tiles?.current as _Tiles)
  return _tiles.current?.build?.({ ...a })
}
