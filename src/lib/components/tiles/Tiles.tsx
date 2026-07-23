import { useRef } from "react"
import { _Tiles, type TilesProp } from "./tilesClass"

const InitializeTiles = () => {
  const _tiles = useRef<_Tiles>(null)

  if (!_tiles.current) {
    _tiles.current = new _Tiles()
  }

  return { _tiles }
}

export default function Tiles({ ...a }: TilesProp) {
  const { _tiles } = InitializeTiles()
  a?.onFunc?.(_tiles?.current as _Tiles)
  return _tiles.current?.build?.({ ...a })
}
