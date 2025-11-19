import React from "react";
import Banner from "./Banner";
import WhyGoGreen from "./WhyGoGreen";
import HowItWorks from "./HowItWorks";
import RecentTips from "./RecentTips";
import LiveStatistics from "./LiveStatistics";
import Challenges1 from "./Challenges1";
import UpComingEvents from "./UpComingEvents";

const Home = () => {
  return (
    <div className="my-6">
      <Banner></Banner>
      <LiveStatistics></LiveStatistics>
      <Challenges1></Challenges1>
      <RecentTips></RecentTips>
      <WhyGoGreen></WhyGoGreen>
      <HowItWorks></HowItWorks>
      <UpComingEvents></UpComingEvents>
    </div>
  );
};

export default Home;
