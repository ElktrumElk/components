import { useRef } from "react";
import { _Article, type _ArticleProp } from "./articleClass";

const InitializeArticle = () => {
  const _article = useRef<_Article | null>(null);

  if (!_article.current) {
    _article.current = new _Article();
  }

  return { _article };
}

export default function Article({ ...a }: _ArticleProp) {
  const { _article } = InitializeArticle();
  a?.onFunc?.(_article?.current as _Article);
  return _article.current?.build?.({ ...a });
}
