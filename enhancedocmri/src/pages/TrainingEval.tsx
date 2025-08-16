import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Enhanced from "./Enhanced";
import AugProgress from "./AugProgress";
import Baseline from "./Baseline";
import TrainingProgress from "./TrainingProgress";
import NavbarSide from "../components/NavbarSide";

const TrainingEval: React.FunctionComponent = () => {
  const MainPage = styled.div`
    font-family: "Poppins", sans-serif;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    background-color: rgba(129, 128, 128, 1);
  `;

  return (
    <>
      <MainPage>
        <NavbarSide />
      </MainPage>
    </>
  );
};
export default TrainingEval;
