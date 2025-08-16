import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import TrainingEval from "./TrainingEval";
import Enhanced from "./Enhanced";
import AugProgress from "./AugProgress";
import TrainingProgress from "./TrainingProgress";

const Baseline: React.FunctionComponent = () => {
  const MainPage = styled.div`
    font-family: "Poppins", sans-serif;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    background-color: rgba(255, 255, 255, 1);
  `;
  const SideNavMenu = styled.div`
    min-width: 250px;
    width: 20%;
    background-color: #4566ea;
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    border-radius: 10px;
  `;
  const NavLogo = styled.h1`
    font-size: 2em;
    margin-top: 60px;
    margin-bottom: 40px;
    color: #ffffff;
  `;
  const NavSubMenuHeader = styled.h3`
    font-size: 1em;
    color: rgb(178, 192, 247);
    margin-bottom: 25px;
    margin-top: 50px;
    cursor: none;
  `;
  const MenuItem = styled.li`
    decoration: none;
    color: #ffffff;
    list-style: none;
    margin-bottom: 15px;
    cursor: pointer;
    font-size: 1.2em;
    &:hover {
      color: rgb(165, 194, 231);
      transform: scale(1.25);
      transition: 0.1s ease-in-out;
    }
  `;
  const ReloadButton = styled.li`
    decoration: none;
    color: rgb(216, 216, 216);
    list-style: none;
    margin-top: 45px;
    margin-bottom: 15px;
    cursor: pointer;
    font-size: 1.2em;
    &:hover {
      color: rgb(252, 160, 137);
      transform: scale(1.25);
      transition: 0.1s ease-in-out;
    }
  `;
  const MainContentPane = styled.div`
    width: 80%;
    height: 100vh;
    background-color: rgba(255, 255, 255, 1);
    display: flex;
    flex-direction: column;
    padding-right: 10px;
  `;
  const InputsProgressContainer = styled.div`
    width: 100%;
    height: 60%;
    background-color: rgba(255, 255, 255, 1);
    margin-top: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
  `;
  const InputsSection = styled.div`
    width: 40%;
    background-color: rgba(128, 131, 128, 1);
    border-radius: 10px;
  `;
  const AugProgressSection = styled.div`
    width: 60%;
    background-color: rgba(94, 114, 94, 1);
    border-radius: 10px;
    margin-left: 10px;
  `;
  const AugTerminalSection = styled.div`
    width: 100%;
    height: 40%;
    margin-bottom: 10px;
    margin-top: 10px;
    border-radius: 10px;
    background-color: rgba(176, 176, 176, 1);
    drop-shadow: 10px 10px 10px rgba(0, 0, 0, 1.9);
  `;

  return (
    <>
      <MainPage>
        <SideNavMenu>
          <NavLogo>Enhanced OCMRI</NavLogo>
          <ul>
            <NavSubMenuHeader>AUGMENTATION</NavSubMenuHeader>

            <MenuItem>
              <Link
                to="/Baseline"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Baseline
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to="/Enhanced"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Enhanced
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to="/AugProgress"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Status
              </Link>
            </MenuItem>
            <NavSubMenuHeader>MODEL</NavSubMenuHeader>
            <MenuItem>
              <Link
                to="/TrainingEval"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Training & Evaluation
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to="/TrainingProgress"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Status
              </Link>
            </MenuItem>
            <ReloadButton>Reload All</ReloadButton>
          </ul>
        </SideNavMenu>
        <MainContentPane>
          <InputsProgressContainer>
            <InputsSection></InputsSection>
            <AugProgressSection></AugProgressSection>
          </InputsProgressContainer>
          <AugTerminalSection> </AugTerminalSection>
        </MainContentPane>
      </MainPage>
    </>
  );
};
export default Baseline;
