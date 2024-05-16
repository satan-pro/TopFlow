import { useState, useEffect } from "react";
import "pattern.css";
import "animate.css";
import hero_img from "./assets/dashboard.png";
import hero_bg from "./assets/hero_bg.png";
import CTACard_1 from "./assets/CTACard_1.png";
import CTACard_2 from "./assets/CTACard_2.png";
import CTACard_3 from "./assets/CTACard_3.png";
import CTACard_4 from "./assets/CTACard_4.png";
import { ArrowForwardIcon } from "@chakra-ui/icons";

function Navbar() {
  return (
    <nav className="w-screen h-6 px-28 py-8 flex justify-between items-center border-b border-secondary-gray-800 fixed top-0 left-0 right-0 bg-navbar-white backdrop-filter backdrop-blur-md bg-opacity-45 z-20 animate__animated animate__fadeInDown">
      <div className="flex gap-5 items-center">
        <h1 className="text-2xl font-semibold border-r-2 border-secondary-gray pr-5">
          Topflow
        </h1>
        <div className="flex basis-2/5 gap-5 text-md items-center font-medium">
          <a href="#">Home</a>
          <a href="#features">Features</a>
          <a href="#">Blog</a>
          <a href="#">Updates</a>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="w-24 flex items-center justify-center border-solid border-2 border-primary-blue rounded-lg p-2 text-primary-blue">
          Login
        </button>
        <button className="w-24 flex items-center justify-center border-solid border-2 rounded-lg p-2  border-primary-blue bg-primary-blue text-white">
          Sign Up
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-48 gap-5">
      <div className="flex flex-col items-center justify-center w-6/12">
        <h1 className="text-5xl font-semibold text-center mb-3.5 animate__animated animate__fadeInDown">
          Revolutionize Your Team{" "}
          <span className="text-primary-blue">Collaboration</span> with TopFlow
        </h1>
        <p className="text-sm text-center w-11/12 animate__animated animate__fadeInDown">
          TopFlow is the ultimate tool for modern team collaboration. Our
          platform brings together workflow, timeline, board, and calendar
          features all in one place, making it easy to keep track of your team's
          progress and stay on top of deadlines.
        </p>
      </div>
      <div className="hero-button flex w-6/12 items-center justify-center gap-5 mt-6">
        <button className=" flex items-center justify-center py-3 px-5 border-solid border-2 rounded-lg bg-primary-blue text-white text-medium z-10 animate__animated animate__fadeInDown">
          Try For Free
        </button>
        <button className="flex items-center justify-center py-3 px-5 border-solid border-2 border-primary-blue rounded-lg text-primary-blue text-medium z-10 bg-white animate__animated animate__fadeInDown">
          Explore More
        </button>
      </div>
      <div className="w-full flex items-center justify-center -mt-12 animate__animated animate__fadeInUp">
        <img
          src={hero_img}
          alt="Hero Image"
          className="w-9/12 rounded-xl border-solid border-2 border-secondary-gray-800 mt-32 mb-16"
        />
      </div>
    </div>
  );
}

function FeatureCard(props) {
  return (
    <div className="rounded-lg bg-gradient-to-bl from-light-gunmetal via-lighter-gunmetal to-lightest-gunmetal p-px mb-7 mr-5">
      <div className="flex items-center p-5 basis-48 border-solid  border-primary-gray rounded-lg grow shrink  bg-gradient-to-bl from-lightest-gunmetal via-lighter-gunmetal to-dark-gunmetal w-full">
        <div className="flex flex-col gap-8 basis-7/12 grow">
          <h1 className="text-3xl text-white font-semibold">{props.heading}</h1>
          <p className="text-md text-primary-gray">{props.content}</p>
          <span className="text-md text-purple-light flex items-center gap-1">
            <a href="#features">Learn More</a>
            <ArrowForwardIcon />
          </span>
        </div>
        <div className="flex justify-end w-fit -mr-5">
          <img
            src={props.img}
            alt="Card Image"
            className="w-5/6 rounded-l-lg"
          />
        </div>
      </div>
    </div>
  );
}

function Features() {
  let cardData = [
    {
      heading: "Collaboration Tools",
      content:
        "Foster seamless team collaboration with TopFlow's built-in communication tools like keeping everyone on the same page.",
      img: CTACard_1,
    },

    {
      heading: "Timeline Visualization",
      content:
        "Gain a clear overview of project timelines with TopFlow's visual timeline feature. Easily set milestones, dependencies, and deadlines to ensure ti ely project delivery and efficient resource allocation.",
      img: CTACard_3,
    },
    {
      heading: "Workflow Management",
      content:
        "Keep your team organized and on track with TopFlow's intuitive workflow management. Create and customize workflows to match your team's progress, ensuring smooth progress from start to finish.",
      img: CTACard_2,
    },
    {
      heading: "Calendar Integration",
      content:
        "Keep track of project deadlines, and team availability with TopFlow's integrated calendar.",
      img: CTACard_4,
    },
  ];
  return (
    <div
      className="w-full flex flex-col items-center justify-center p-16 bg-dark-gunmetal"
      id="features"
    >
      <div className="flex w-full justify-between mb-16">
        <div className="flex flex-col gap-7 basis-6/12">
          <h2 className="text-xl text-purple-light leading-loose">
            DRIVE EFFICIENCY ACROSS TEAMS
          </h2>
          <h1 className="text-4xl text-white font-semibold leading-12 tracking-wide">
            Power-Packed Features to Boost Your Team's Productivity
          </h1>
        </div>
        <div className="flex flex-col gap-5 basis-5/12 justify-end">
          <p className="text-md text-primary-gray w-9/12">
            Experience the power of TopFlow's feature-rich platform to
            streamline your team collaboration.
          </p>
          <button className="flex items-center justify-center py-3 px-5 rounded-lg bg-primary-blue text-white w-3/12 leading-loose">
            Learn More
          </button>
        </div>
      </div>
      <div className="columns-2">
        {cardData.map((item, index) => {
          return (
            <FeatureCard
              key={index}
              heading={item.heading}
              content={item.content}
              img={item.img}
            />
          );
        })}
      </div>
    </div>
  );
}

function Brands() {
  return(
    <div className="w-full flex flex-col items-center py-16 gap-5">
      <h2 className="text-xl text-primary-blue leading-loose text-center">
        BRING YOUR WORK TOGETHER
      </h2>
      <h1 className="text-5xl font-semibold leading-12 text-center">
        Integrate your Project with More Apps
      </h1>
      <p className="font-medium text-md w-6/12 text-center">
        We have a lot of integrations, so you can use your favourite work tools to communicate, collaborate, and coordinate work in one place, from start to finish.
      </p>
    </div>
  )
}

function Body() {
  return (
    <body className="w-screen relative">
      <Navbar />
      <Hero />
      <Features />
      <Brands/>
    </body>
  );
}

export default function Landing() {
  return <Body />;
}
