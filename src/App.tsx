import {
  Badge,
  BottomNavigationBar,
  Button,
  Card,
  Components,
  Container,
  Header,
  Icon,
  Main,
  Page,
  Stack,
  Text,
  useComponent,
} from "./components";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Heart,
  Home,
  Layers,
  Search,
  Sparkles,
  User,
} from "./icons";
import { appStyles } from "./rule/AppStyles";
import "./App.css";

interface AppState {
  activeNav: number;
  saved: boolean;
  progress: number;
}

class AppController extends Components<AppState> {
  constructor() {
    super({ activeNav: 0, saved: false, progress: 68 });
  }

  selectNavigation = (activeNav: number) =>
    this.set((state) => ({ ...state, activeNav }));

  toggleSaved = () =>
    this.set((state) => ({ ...state, saved: !state.saved }));

  continueLesson = () =>
    this.set((state) => ({
      ...state,
      progress: Math.min(100, state.progress + 8),
    }));
}

const navigationItems = [
  { id: "home", label: "Today", icon: <Icon icon={Home} size={21} /> },
  { id: "library", label: "Library", icon: <Icon icon={Layers} size={21} /> },
  { id: "search", label: "Explore", icon: <Icon icon={Search} size={21} /> },
  { id: "profile", label: "Profile", icon: <Icon icon={User} size={21} /> },
] as const;

export default function App() {
  const [controller, state] = useComponent(() => new AppController());
  const styles = appStyles.classes;
  
  

  const HeaderTitle = () => (
    <Stack
      className={styles.brandLockup}
      direction="row"
      align="center"
      child={() => (
        <>
          <Container width="2.25rem" height="2.25rem" padding="0" className={styles.brandMark} child={() => <Text type="p" text="e" />} />
          <Text type="p" text="elk studio" className={styles.brandName} />
        </>
      )}
    />
  );

  const HeaderAction = () => (
    <Button
      width="2.5rem"
      height="2.5rem"
      padding="0"
      className={styles.avatarButton}
      child={() => <Icon icon={User} size={19} />}
      gest={{ "aria-label": "Open profile" }}
    />
  );

  const Hero = () => (
    <Container
      padding="clamp(2rem, 6vw, 5rem)"
      className={styles.hero}
      gest={{ role: "region", "aria-label": "Featured learning path" }}
      child={() => (
        <>
          <Stack
            className={styles.heroTitle}
            child={() => (
              <>
                <Badge
                  text="CURATED FOR YOU"
                  color="#173f36"
                  backgroundColor="#d8f36a"
                  className={styles.eyebrow}
                />
                <Stack
                  className={styles.heroTitle}
                  child={() => (
                    <>
                      <Text type="h1" text="Make space for" />
                      <Text type="h1" text="better ideas." className={styles.heroAccent} />
                    </>
                  )}
                />
                <Text
                  type="p"
                  text="A calm, practical path through design systems, interaction, and creative code."
                  className={styles.heroDescription}
                />
              </>
            )}
          />

          <Container
            padding="0"
            width="clamp(14rem, 27vw, 20rem)"
            className={styles.heroArt}
            gest={{ "aria-hidden": true }}
            child={() => (
              <>
                <Container width="115%" height="38%" padding="0" className={`${styles.orbit} ${styles.orbitOne}`} />
                <Container width="92%" height="28%" padding="0" className={`${styles.orbit} ${styles.orbitTwo}`} />
                <Icon icon={Sparkles} size={58} color="#173f36" className={styles.heroSpark} />
                <Text type="p" text="12" className={styles.heroNumber} />
                <Text type="p" text="new lessons" className={styles.heroCaption} />
              </>
            )}
          />
        </>
      )}
    />
  );

  const SectionHeading = () => (
    <Stack
      className={styles.sectionHeading}
      direction="row"
      align="flex-end"
      justify="space-between"
      child={() => (
        <>
          <Stack
            child={() => (
              <>
                <Text type="p" text="YOUR MOMENTUM" className={styles.sectionKicker} />
                <Text type="h2" text="Continue learning" />
              </>
            )}
          />
          <Button
            padding=".6rem 0"
            className={styles.textLink}
            child={() => (
              <Stack
                direction="row"
                align="center"
                child={() => (
                  <>
<<<<<<< HEAD
                    <Text type="p" text="View plan" />
                    <Icon icon={ArrowRight} size={16} />
=======
                    <Hover
                      transition="transform .3s ease"
                      style={{ color: "orange", transform: "scale(1.3)" }}
                      child={() => (
                        <Text text="Hover Wassup" type="h1" color="white" />
                      )}
                    />
                    <SectionDivider
                      animate
                      variant="wave"
                      direction="ltr"
                      duration={1000}
                      flip
                      fillColor="#02c8ff"
                    />

                    <Animation
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      style={{ width: "auto", height: "max-content" }}
                      child={() => (
                        <>
                          <Hover
                            style={{ color: "blue" }}
                            transition="color 1s ease"
                            child={() => (
                              <LetterAnimation
                                animation="glitch"
                                textType="h1"
                                text="Hello how are you doing"
                                style={{ color: "red" }}
                                iterations={Infinity}
                                duration={3000}
                              />
                            )}
                          />
                        </>
                      )}
                    />
                    <Card />
>>>>>>> 8c8675eee0dd53ac0d8a00ef5fd622fe91b9c596
                  </>
                )}
              />
            )}
          />
        </>
      )}
    />
  );

  const FeatureCopy = () => (
    <Stack
      padding="clamp(2rem, 5vw, 4.5rem)"
      className={styles.featureCopy}
      child={() => (
        <>
          <Stack
            className={styles.metaRow}
            direction="row"
            align="center"
            child={() => (
              <>
                <Badge text="INTERACTION" color="#173f36" backgroundColor="#f5a278" />
                <Stack
                  direction="row"
                  align="center"
                  gap=".38rem"
                  child={() => (
                    <>
                      <Icon icon={Clock} size={15} />
                      <Text type="p" text="18 min" />
                    </>
                  )}
                />
              </>
            )}
          />
          <Text type="h3" text="Motion that makes meaning" />
          <Text
            type="p"
            text="Learn how timing, hierarchy, and spatial continuity make an interface feel natural."
            className={styles.featureDescription}
          />
          <Stack
            className={styles.progressRow}
            direction="row"
            align="center"
            child={() => (
              <>
                <Container
                  padding="0"
                  width="min(22rem, 100%)"
                  height=".42rem"
                  className={styles.progressTrack}
                  gest={{ role: "progressbar", "aria-valuenow": state.progress, "aria-valuemin": 0, "aria-valuemax": 100 }}
                  child={() => (
                    <Container width={`${state.progress}%`} height="100%" padding="0" className={styles.progressValue} />
                  )}
                />
                <Text type="p" text={`${state.progress}%`} className={styles.progressLabel} />
              </>
            )}
          />
          <Button
            width="fit-content"
            padding=".85rem 1.15rem"
            className={styles.continueButton}
            child={() => (
              <Stack
                direction="row"
                align="center"
                gap=".55rem"
                child={() => (
                  <>
                    <Text type="p" text="Continue lesson" />
                    <Icon icon={ArrowRight} size={17} />
                  </>
                )}
              />
            )}
            gest={{ onClick: controller.continueLesson }}
          />
        </>
      )}
    />
  );

  const FeaturePoster = () => (
    <Container
      padding="0"
      className={styles.featurePoster}
      gest={{ "aria-hidden": true }}
      child={() => (
        <>
          <Container padding="0" className={styles.posterGrid} />
          <Container width="68%" padding="0" className={styles.posterDisc} />
          <Text type="p" text="ease" className={styles.posterPill} />
          <Text type="p" text="↗" className={styles.posterArrow} />
        </>
      )}
    />
  );

  const Lesson = () => (
    <Container
      padding="clamp(4rem, 8vw, 7rem) clamp(0rem, 2vw, 1rem) 0"
      gest={{ role: "region", "aria-label": "Continue learning" }}
      child={() => (
        <>
          <SectionHeading />
          <Card
            className={styles.featureCard}
            width="100%"
            height="auto"
            padding="0"
            radius="1.75rem"
            backgroundColor="#173f36"
            borderColor="#173f36"
            body={() => (
              <Container
                padding="0"
                className={styles.featureContent}
                child={() => (
                  <>
                    <FeatureCopy />
                    <FeaturePoster />
                  </>
                )}
              />
            )}
          />
        </>
      )}
    />
  );

  const StoryMeta = ({ time }: { time: string }) => (
    <Stack
      className={styles.storyMeta}
      direction="row"
      align="center"
      gap=".38rem"
      child={() => (
        <>
          <Icon icon={time.includes("exercise") ? CheckCircle : Clock} size={15} />
          <Text type="p" text={time} />
        </>
      )}
    />
  );

  const Stories = () => (
    <Container
      padding="clamp(4rem, 8vw, 7rem) clamp(0rem, 2vw, 1rem) 0"
      gest={{ role: "region", "aria-label": "Picked this week" }}
      child={() => (
        <>
          <Stack
            className={styles.sectionHeading}
            child={() => (
              <>
                <Text type="p" text="FRESH PERSPECTIVES" className={styles.sectionKicker} />
                <Text type="h2" text="Picked this week" />
              </>
            )}
          />
          <Container
            padding="0"
            className={styles.storyGrid}
            child={() => (
              <>
                <Container
                  padding="clamp(1.6rem, 4vw, 3rem)"
                  className={`${styles.storyCard} ${styles.storyCoral}`}
                  child={() => (
                    <>
                      <Button
                        width="2.8rem"
                        height="2.8rem"
                        padding="0"
                        className={styles.saveButton}
                        child={() => <Icon icon={Heart} size={19} fill={state.saved} fillColor="#173f36" />}
                        gest={{
                          "aria-label": state.saved ? "Remove saved lesson" : "Save lesson",
                          "aria-pressed": state.saved,
                          onClick: controller.toggleSaved,
                        }}
                      />
                      <Text type="p" text="01" className={styles.storyIndex} />
                      <Container width="3.4rem" height="3.4rem" padding="0" className={styles.storyIcon} child={() => <Icon icon={Layers} size={30} />} />
                      <Text type="h3" text="Designing beyond the rectangle" />
                      <Text type="p" text="Layer, overlap, and break the grid without losing clarity." />
                      <StoryMeta time="6 exercises" />
                    </>
                  )}
                />
                <Container
                  padding="clamp(1.6rem, 4vw, 3rem)"
                  className={`${styles.storyCard} ${styles.storyBlue}`}
                  child={() => (
                    <>
                      <Text type="p" text="02" className={`${styles.storyIndex} ${styles.storyBlueIndex}`} />
                      <Container width="3.4rem" height="3.4rem" padding="0" className={styles.storyIcon} child={() => <Icon icon={Sparkles} size={30} />} />
                      <Text type="h3" text="Build a visual rhythm" />
                      <Text type="p" text="Turn spacing and type into a system people can feel." />
                      <StoryMeta time="24 minutes" />
                    </>
                  )}
                />
              </>
            )}
          />
        </>
      )}
    />
  );

  const Body = () => (
    <Main
      className={styles.main}
      child={() => (
        <>
          <Hero />
          <Lesson />
          <Stories />
        </>
      )}
    />
  );

  return (
    <Page
      className={styles.page}
      background="#f4f0e6"
      header={() => <Header className={styles.header} title={HeaderTitle} action={HeaderAction} />}
      body={Body}
      footer={() => (
        <BottomNavigationBar
          mode="floating"
          className={styles.bottomNav}
          items={navigationItems}
          activeIndex={state.activeNav}
          onChange={controller.selectNavigation}
          ariaLabel="Studio navigation"
        />
      )}
    />
  );
}
