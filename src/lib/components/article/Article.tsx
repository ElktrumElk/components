import { useRef } from "react";
import { _Article, type _ArticleProp } from "./articleClass";

const InitializeArticle = () => {
  const _article = useRef<_Article | null>(null);

  if (!_article.current) {
    _article.current = new _Article();
  }

  return { _article };
}

/**
 * Article component that renders a semantic <article> element with title and body sections.
 *
 * @example
 * <Article
 *   title={() => <h2>Article Title</h2>}
 *   body={() => <p>Article body content goes here.</p>}
 *   padding="1rem"
 * />
 *
 * @example
 * // With custom styling and gesture attributes
 * <Article
 *   title={TitleComponent}
 *   body={BodyComponent}
 *   className="my-article"
 *   style={{ maxWidth: '640px' }}
 *   gest={{ onClick: handleClick }}
 * />
 *
 * @see articleClass.tsx for the underlying _Article class.
 *
 * @param title - Component type rendered as the article title.
 * @param body - Component type rendered as the article body.
 * @param padding - CSS padding applied to the article element.
 * @param className - Additional CSS class for the article element.
 * @param style - Custom inline styles for the article element.
 * @param gest - Additional HTML attributes spread onto the <article> element.
 * @param onFunc - Callback receiving the _Article instance after mount.
 */
export default function Article({ ...a }: _ArticleProp) {
  const { _article } = InitializeArticle();
  a?.onFunc?.(_article?.current as _Article);
  return _article.current?.build?.({ ...a });
}
