import FluidSection from "@/components/Post/FluidSection";
import Posts from "@/components/Post/Posts";
import ScrollToTopBtn from "./components/common/ScrollToTopBtn";

const Home = () => {
  return (
    <main className="flex-fill">
      <FluidSection>
        <Posts />
      </FluidSection>
      <ScrollToTopBtn />
    </main>
  );
};

export default Home;
