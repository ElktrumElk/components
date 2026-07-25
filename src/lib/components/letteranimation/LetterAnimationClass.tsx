import React from "react";

type AnimationType = "letters" | "words";
type TextType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "pre";

export interface WordSegment {
  text: string;
  keyframes?: Keyframe[];
}

/**
 * Props for the LetterAnimation component.
 *
 * Animates individual letters or words of a text string using the Web Animations API.
 * Supports built-in animation presets, custom keyframes, and per-letter/word overrides.
 */
export interface LetterAnimationProp {
  /** The text string to animate. */
  text: string;
  /** Animation mode: `"letters"` animates each character, `"words"` animates each word. Defaults to `"letters"`. */
  type?: AnimationType;
  /** Built-in animation preset name (e.g. `"fadeUp"`, `"bounceIn"`). Ignored when custom `keyframes` are provided. */
  animation?: AnimationPreset;
  /** Custom keyframe array applied to every animated token. Overrides the preset when set. */
  keyframes?: Keyframe[];
  /** Per-letter custom keyframes. Each index maps to the letter at the same position. */
  letterKeyframes?: Keyframe[][];
  /** Word segments with optional per-word keyframe overrides (used in `"words"` mode). */
  words?: WordSegment[];
  /** Font size applied to the rendered text (e.g. `"2rem"`, `"32px"`). */
  size?: string;
  /** HTML element used to render the text. Accepts `"h1"` through `"h6"`, `"p"`, or `"pre"`. Defaults to `"div"`. */
  textType?: TextType;
  /** Duration of each animation in milliseconds. Defaults to `300`. */
  duration?: number;
  /** Base delay before the first token starts animating, in milliseconds. Defaults to `0`. */
  delay?: number;
  /** Additional delay between consecutive tokens, in milliseconds. Defaults to `50`. */
  stagger?: number;
  /** Number of times each animation repeats. `Infinity` for endless loop. Defaults to `1`. */
  iterations?: number;
  /** Playback direction (`"normal"`, `"reverse"`, `"alternate"`, etc.). Defaults to `"normal"`. */
  direction?: PlaybackDirection;
  /** Fill mode (`"forwards"`, `"backwards"`, `"both"`, `"none"`). Defaults to `"forwards"`. */
  fill?: FillMode;
  /** CSS timing function string (e.g. `"ease"`, `"cubic-bezier(0.4,0,0.2,1)"`). Defaults to `"ease"`. */
  easing?: string;
  /** Additional CSS class name applied to the container `<div>`. */
  className?: string;
  /** Inline styles merged onto the container `<div>`. */
  style?: React.CSSProperties;
  /** Additional HTML attributes spread onto the container `<div>`. */
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  /** Callback invoked with the `_LetterAnimation` instance after mount, useful for imperative control. */
  onFunc?: (self: _LetterAnimation) => void;
}

export type AnimationPreset =
  | "fadeUp"
  | "fadeDown"
  | "fadeIn"
  | "slideLeft"
  | "slideRight"
  | "scaleUp"
  | "scaleDown"
  | "rotateIn"
  | "flipIn"
  | "bounceIn"
  | "typewriter"
  | "blurIn"
  | "swingIn"
  | "wave"
  | "glitch"
  | "pop"
  | "dropIn"
  | "foldIn"
  | "elastic"
  | "spiral";

const PRESETS: Record<AnimationPreset, Keyframe[]> = {
  fadeUp: [
    { opacity: "0", transform: "translateY(20px)" },
    { opacity: "1", transform: "translateY(0)" },
  ],
  fadeDown: [
    { opacity: "0", transform: "translateY(-20px)" },
    { opacity: "1", transform: "translateY(0)" },
  ],
  fadeIn: [
    { opacity: "0" },
    { opacity: "1" },
  ],
  slideLeft: [
    { opacity: "0", transform: "translateX(-40px)" },
    { opacity: "1", transform: "translateX(0)" },
  ],
  slideRight: [
    { opacity: "0", transform: "translateX(40px)" },
    { opacity: "1", transform: "translateX(0)" },
  ],
  scaleUp: [
    { opacity: "0", transform: "scale(0)" },
    { opacity: "1", transform: "scale(1)" },
  ],
  scaleDown: [
    { opacity: "0", transform: "scale(1.6)" },
    { opacity: "1", transform: "scale(1)" },
  ],
  rotateIn: [
    { opacity: "0", transform: "rotate(-120deg) scale(0.5)" },
    { opacity: "1", transform: "rotate(0deg) scale(1)" },
  ],
  flipIn: [
    { opacity: "0", transform: "perspective(400px) rotateY(-90deg)" },
    { opacity: "1", transform: "perspective(400px) rotateY(0deg)" },
  ],
  bounceIn: [
    { opacity: "0", transform: "scale(0.3)" },
    { opacity: "0", transform: "scale(1.05)" },
    { opacity: "1", transform: "scale(0.9)" },
    { opacity: "1", transform: "scale(1)" },
  ],
  typewriter: [
    { width: "0", opacity: "0" },
    { width: "1ch", opacity: "1" },
  ],
  blurIn: [
    { opacity: "0", filter: "blur(12px)" },
    { opacity: "1", filter: "blur(0px)" },
  ],
  swingIn: [
    { opacity: "0", transform: "rotate(-20deg) translateX(-30px)" },
    { opacity: "1", transform: "rotate(5deg) translateX(0)" },
    { opacity: "1", transform: "rotate(0deg) translateX(0)" },
  ],
  wave: [
    { opacity: "0", transform: "translateY(20px) rotateX(-60deg)" },
    { opacity: "1", transform: "translateY(-6px) rotateX(10deg)" },
    { opacity: "1", transform: "translateY(0) rotateX(0deg)" },
  ],
  glitch: [
    { opacity: "0", transform: "translate(4px, -4px)" },
    { opacity: "1", transform: "translate(-3px, 2px)" },
    { opacity: "1", transform: "translate(2px, -1px)" },
    { opacity: "1", transform: "translate(0, 0)" },
  ],
  pop: [
    { opacity: "0", transform: "scale(0)" },
    { opacity: "1", transform: "scale(1.25)" },
    { opacity: "1", transform: "scale(0.9)" },
    { opacity: "1", transform: "scale(1)" },
  ],
  dropIn: [
    { opacity: "0", transform: "translateY(-60px) scaleY(1.4)" },
    { opacity: "1", transform: "translateY(4px) scaleY(0.95)" },
    { opacity: "1", transform: "translateY(0) scaleY(1)" },
  ],
  foldIn: [
    { opacity: "0", transform: "perspective(600px) rotateX(-80deg)" },
    { opacity: "1", transform: "perspective(600px) rotateX(10deg)" },
    { opacity: "1", transform: "perspective(600px) rotateX(0deg)" },
  ],
  elastic: [
    { opacity: "0", transform: "scale(0)" },
    { opacity: "1", transform: "scale(1.3)" },
    { opacity: "1", transform: "scale(0.8)" },
    { opacity: "1", transform: "scale(1.1)" },
    { opacity: "1", transform: "scale(0.95)" },
    { opacity: "1", transform: "scale(1)" },
  ],
  spiral: [
    { opacity: "0", transform: "rotate(-360deg) scale(0)" },
    { opacity: "0.5", transform: "rotate(-180deg) scale(0.5)" },
    { opacity: "1", transform: "rotate(-20deg) scale(0.9)" },
    { opacity: "1", transform: "rotate(5deg) scale(1.05)" },
    { opacity: "1", transform: "rotate(0deg) scale(1)" },
  ],
};

export function getPresetKeyframes(name: AnimationPreset): Keyframe[] {
  return PRESETS[name];
}

const DEFAULT_KEYFRAMES: Keyframe[] = PRESETS.fadeUp;

export class _LetterAnimation {
  containerRef = React.createRef<any>();
  animations: Animation[] = [];

  play = () => this.animations.forEach((a) => a.play());
  pause = () => this.animations.forEach((a) => a.pause());
  reverse = () => this.animations.forEach((a) => a.reverse());
  cancel = () => {
    this.animations.forEach((a) => a.cancel());
    this.animations = [];
  };

  resolveKeyframes = (
    index: number,
    props: LetterAnimationProp,
  ): Keyframe[] => {
    const mode = props.type ?? "letters";
    if (mode === "letters" && props.letterKeyframes?.[index]) {
      return props.letterKeyframes[index];
    }
    if (props.animation) {
      return PRESETS[props.animation];
    }
    return props.keyframes ?? DEFAULT_KEYFRAMES;
  };

  apply = (props: LetterAnimationProp) => {
    this.cancel();
    const el = this.containerRef.current;
    if (!el) return;

    const mode = props.type ?? "letters";
    const duration = props.duration ?? 300;
    const baseDelay = props.delay ?? 0;
    const stagger = props.stagger ?? 50;
    const iterations = props.iterations ?? 1;
    const direction = props.direction ?? "normal";
    const fill = props.fill ?? "forwards";
    const easing = props.easing ?? "ease";

    const spans = el.querySelectorAll("[data-letter]");

    let animIndex = 0;
    spans.forEach((span: any) => {
      let keyframes: Keyframe[];
      if (mode === "words" && props.words?.[animIndex]?.keyframes) {
        keyframes = props.words[animIndex].keyframes!;
      } else {
        keyframes = this.resolveKeyframes(animIndex, props);
      }

      const animation = span.animate(keyframes, {
        duration,
        delay: baseDelay + animIndex * stagger,
        iterations,
        direction,
        fill,
        easing,
      });
      this.animations.push(animation);
      animIndex++;
    });
  };

  dispose = () => {
    this.cancel();
  };

  build? = ({ ...a }: LetterAnimationProp): React.JSX.Element => {
    const mode = a.type ?? "letters";

    const containerStyle: React.CSSProperties = {
      display: "inline-flex",
      flexWrap: "wrap",
      fontSize: a.size,
      margin: 0,
      ...a.style,
    };

    const { ref: _ignored, ...gestRest } = a.gest ?? {};

    const containerProps = {
      ref: this.containerRef,
      className: a.className,
      style: containerStyle,
      ...gestRest,
    } as any;

    const renderTokens = () => {
      if (mode === "words" && a.words) {
        return a.words.map((segment, i) => (
          <span
            key={i}
            data-letter
            style={{
              display: "inline-block",
              whiteSpace: "pre",
              ...(segment.keyframes
                ? {}
                : {}),
            }}
          >
            {segment.text}
          </span>
        ));
      }

      if (mode === "words") {
        return a.text.split(/(\s+)/).map((token, i) => {
          const isSpace = /^\s+$/.test(token);
          if (isSpace) {
            return (
              <span key={i} data-space style={{ whiteSpace: "pre" }}>
                {token}
              </span>
            );
          }
          return (
            <span
              key={i}
              data-letter
              style={{ display: "inline-block", whiteSpace: "pre" }}
            >
              {token}
            </span>
          );
        });
      }

      return a.text.split("").map((char, i) => {
        if (char === " ") {
          return (
            <span key={i} data-space style={{ whiteSpace: "pre" }}>
              {char}
            </span>
          );
        }
        return (
          <span
            key={i}
            data-letter
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {char}
          </span>
        );
      });
    };

    const content = renderTokens();

    switch (a.textType) {
      case "h1":
        return <h1 {...containerProps}>{content}</h1>;
      case "h2":
        return <h2 {...containerProps}>{content}</h2>;
      case "h3":
        return <h3 {...containerProps}>{content}</h3>;
      case "h4":
        return <h4 {...containerProps}>{content}</h4>;
      case "h5":
        return <h5 {...containerProps}>{content}</h5>;
      case "h6":
        return <h6 {...containerProps}>{content}</h6>;
      case "p":
        return <p {...containerProps}>{content}</p>;
      case "pre":
        return <pre {...containerProps}>{content}</pre>;
      default:
        return <div {...containerProps}>{content}</div>;
    }
  };
}
