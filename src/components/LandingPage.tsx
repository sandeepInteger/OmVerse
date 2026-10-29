import Hero from "./Hero"
import WhoWeAre from "./WhoWeAre";
import WhoWeServe from "./WhoWeServe";
import Services from "./Services";
import ChooseInteger from "./ChooseInteger";
import Banner from "./Banner";
import VisionMission from "./VisionMission";
import Stats from "./Stats";
import { usePageMeta } from "@/lib/usePageMeta";

const LandingPage = ()=>
{
    usePageMeta(null);
    return (
        <>
      <Hero/>
      <Stats/>
      

      <WhoWeAre/>
      <VisionMission/>
      <ChooseInteger/>
      <Services/>
      <WhoWeServe/>
      <Banner/>
      
        </>
    )
}
export default LandingPage;