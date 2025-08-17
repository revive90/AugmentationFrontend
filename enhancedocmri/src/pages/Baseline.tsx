import React from "react";
import styled from "styled-components";
import "../index.css";
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
    background-color: #eaf0f7;
  `;
  const SideNavMenu = styled.div`
    min-width: 250px;
    width: 20%;
    background-color: #4723da;
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    border-radius: 15px;
    box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.2);
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
    background-color: #eaf0f7;
    display: flex;
    flex-direction: column;
    padding-right: 10px;
  `;
  //---------------------------------------------------------------------------------------

  // Styled components for the inputs and progress section

  const InputsProgressContainer = styled.div`
    width: 100%;
    height: 60%;
    background-color: #eaf0f7;
    margin-top: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
  `;
  const InputsSection = styled.div`
    width: 40%;
    background-color: #f0f2f5ff;
    border-radius: 15px;
    box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
  `;
  const InputsSectionHeader = styled.h3`
    font-size: 1.2em;
    color: #4566ea;
    background-color: #dadef0ff;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 93%;
    border-radius: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
    align-self: center;
    box-shadow: 0px 3px 13px 0px rgba(89, 89, 89, 0.1);
  `;
  const InputLabel = styled.p`
    font-size: 1em;
    font-weight: 500;
    color: #7f7f7fff;
    font-family: "Inter", sans-serif;
    margin-top: 10px;
    margin-bottom: 5px;
    margin-left: 10px;
  `;
  const InputField = styled.input`
    width: 95%;
    height: 35px;
    outline: none;
    padding-left: 10px;
    border: none;
    align-self: center;
    font-size: 1em;
    border-radius: 10px;
    color: #7f7f7fff;
    box-shadow: 0px 3px 13px 0px rgba(89, 89, 89, 0.1);
  `;
  const ProceedButton = styled.button`
    width: 97%;
    border: none;
    align-self: center;
    outline: none;
    height: 40px;
    margin-top: 15px;
    background-color: #4566ea;
    color: rgba(224, 229, 249, 1);
    border-radius: 10px;
    cursor: pointer;
    font-family: "Inter", sans-serif;
    font-size: 1em;
    font-weight: bold;
    transition: background-color 0.6s ease-in-out;
    &:hover {
      background-color: #107944ff; // Color on hover
    }
  `;
  const StopButton = styled.button`
    width: 97%;
    border: none;
    align-self: center;
    outline: none;
    height: 40px;
    margin-top: 10px;
    margin-bottom: 5px;
    background-color: #4566ea;
    color: rgba(224, 229, 249, 1);
    border-radius: 10px;
    cursor: pointer;
    font-family: "Inter", sans-serif;
    font-size: 1em;
    font-weight: bold;
    transition: background-color 0.6s ease-in-out;
    &:hover {
      background-color: #a52222ff; // Color on hover
    }
  `;
  //---------------------------------------------------------------------------------------

  const AugProgressSection = styled.div`
    width: 60%;
    background-color: #f0f2f5ff;
    border-radius: 15px;
    margin-left: 10px;
    box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.2);
  `;
  const AugTerminalSection = styled.div`
    width: 100%;
    height: 40%;
    margin-bottom: 10px;
    margin-top: 10px;
    border-radius: 15px;
    background-color: #162b24;
    box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.2);
    justify-content: center;
    display: flex;
    align-items: center;
  `;
  const TerminalText = styled.textarea`
    width: 80%;
    height: 80%;
    color: #75f97d;
    font-family: "Cascadia Mono", Courier, monospace;
    font-size: 1.2em;
    decoration: none;
    background-color: transparent;
    border: none;
    outline: none;
    resize: none;
    scrollbar-width: 0px;
    scrollbar-color: transparent transparent;
    cursor: crosshair;
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
            <InputsSection>
              <InputsSectionHeader>
                Baseline Augmentation Setup
              </InputsSectionHeader>
              <InputLabel>Training Data Folder Path</InputLabel>
              <InputField type="text"></InputField>
              <InputLabel>Output Folder Path</InputLabel>
              <InputField type="text"></InputField>
              <InputLabel>Lower Threshold (Th1)</InputLabel>
              <InputField type="text"></InputField>
              <InputLabel>Upper Threshold (Th2)</InputLabel>
              <InputField type="text"></InputField>
              <InputLabel>% Tolerance</InputLabel>
              <InputField type="text"></InputField>
              <ProceedButton>START</ProceedButton>
              <StopButton>STOP</StopButton>
            </InputsSection>
            <AugProgressSection></AugProgressSection>
          </InputsProgressContainer>
          <AugTerminalSection>
            <TerminalText placeholder="Terminal Output" />
          </AugTerminalSection>
        </MainContentPane>
      </MainPage>
    </>
  );
};
export default Baseline;
