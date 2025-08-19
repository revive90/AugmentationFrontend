import React from "react";
import styled from "styled-components";
import "../index.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import TrainingEval from "./TrainingEval";
import Enhanced from "./Enhanced";
import AugProgress from "./AugProgress";
import TrainingProgress from "./TrainingProgress";
import {CircularProgress} from "@heroui/progress";


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

  //background-color: #f0f2f5ff;
  const AugProgressSection = styled.div`
    width: 60%;
    background-color: transparent ;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    padding-top: 2px;
    padding-left: 5px;
    padding-right: 5px;
    padding-bottom: 2px;
    border-radius: 15px;
  `;
  const AugUpperSection = styled.div`
    width: 100%;
    height: 60%;
    background-color: transparent;
    padding-top :5px;
    padding-right :5px;
    padding-left :5px;
    padding-bottom :0px;
    align-self: center;
    display: flex;
    flex-direction: row;
    `;
  const AugUpperSectionLeft = styled.div`
  width: 60%;
  height: 100%;
  background-color: #f0f2f5ff;
  border-radius: 15px;
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.2);
  `;
  const AugUpperSectionRight = styled.div`
  width: 40%;
  height: 100%;
  background-color: transparent;
  margin-left: 5px;
  border-radius: 15px;
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.2);
  `;
    const AugLowerSection = styled.div`
    width: 100%;
    height: 40%;
    background-color: transparent;
    padding :5px;
    align-self: center;
    display: flex;
    flex-direction: row;
    `;

    const AugLowerSectionLeft = styled.div`
  width: 35%;
  height: 100%;
  background-color: transparent;
  border-radius: 15px;
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.2);
  `;
  const AugLowerSectionRight = styled.div`
  width: 65%;
  height: 100%;
  background-color: transparent;
  margin-left: 5px;
  border-radius: 15px;
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.2);
  `;



  // --------------------------   TERMINAL  -------------------------------
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

const Baseline: React.FunctionComponent = () => {

  // --------  EXECUTIUON LOGIC -----------------------------------------------------
  interface AugmentationParams {
    ROOT_DATASET_DIR: string;
    MAIN_OUTPUT_DIR: string;
    INITIAL_TH1: number;
    INITIAL_TH2: number;
    ACCEPTABLE_DIFFERENCE_PERCENTAGE: number;
  }

  const [formData, setFormData] = useState<AugmentationParams>({
    ROOT_DATASET_DIR: "",
    MAIN_OUTPUT_DIR: "",
    INITIAL_TH1: 0,
    INITIAL_TH2: 0,
    ACCEPTABLE_DIFFERENCE_PERCENTAGE: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value, type } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name as keyof AugmentationParams]:
      type === "number"
        ? value === "" // allow empty string while typing
          ? ("" as unknown as number)
          : Number(value)
        : value,
    }));
  };


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // create a copy that's mutable
  const payload: AugmentationParams = { ...formData };

  // make sure numbers are actually numbers
  payload.INITIAL_TH1 = Number(formData.INITIAL_TH1);
  payload.INITIAL_TH2 = Number(formData.INITIAL_TH2);
  payload.ACCEPTABLE_DIFFERENCE_PERCENTAGE = Number(
    formData.ACCEPTABLE_DIFFERENCE_PERCENTAGE
  );

  try {
    const response = await fetch("http://127.0.0.1:8000/run-augmentation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Backend response:", data);
    alert("Augmentation started: " + JSON.stringify(data));
  } catch (error) {
    console.error("Error:", error);
  }
};

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
              <InputField
                type="text"
                name="ROOT_DATASET_DIR"
                value={formData.ROOT_DATASET_DIR || ""}
                onChange={handleChange}
              ></InputField>
              <InputLabel>Output Folder Path</InputLabel>
              <InputField
                type="text"
                name="MAIN_OUTPUT_DIR"
                value={formData.MAIN_OUTPUT_DIR || ""}
                onChange={handleChange}
              ></InputField>
              <InputLabel>Lower Threshold (Th1)</InputLabel>
              <InputField
                type="number"
                name="INITIAL_TH1"
                value={formData.INITIAL_TH1 || ""}
                onChange={handleChange}
              ></InputField>
              <InputLabel>Upper Threshold (Th2)</InputLabel>
              <InputField
                type="number"
                name="INITIAL_TH2"
                value={formData.INITIAL_TH2 || ""}
                onChange={handleChange}
              ></InputField>
              <InputLabel>% Tolerance</InputLabel>
              <InputField
                type="number"
                name="ACCEPTABLE_DIFFERENCE_PERCENTAGE"
                value={formData.ACCEPTABLE_DIFFERENCE_PERCENTAGE || ""}
                onChange={handleChange}
              ></InputField>
              <ProceedButton type="submit" onClick={handleSubmit}>
                START
              </ProceedButton>
              <StopButton>STOP</StopButton>
            </InputsSection>
            <AugProgressSection>
              <AugUpperSection>
                <AugUpperSectionLeft>
                  <h1> Progress Icon Here</h1>
                  <h3> --------</h3>
                </AugUpperSectionLeft>
                <AugUpperSectionRight>
                  <h4>Augmentation Status</h4>
                  <h4>===================</h4>
                  <h4>running</h4>
                  <h4>===================</h4>
                  <h4>===================</h4>
                  <h4>Stopped</h4>
                  <h4>===================</h4>
                </AugUpperSectionRight>
                </AugUpperSection>
              <AugLowerSection>
                <AugLowerSectionLeft></AugLowerSectionLeft>
                <AugLowerSectionRight></AugLowerSectionRight>
              </AugLowerSection>
            </AugProgressSection>
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
