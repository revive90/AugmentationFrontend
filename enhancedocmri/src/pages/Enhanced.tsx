import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import TrainingEval from "./TrainingEval";
import AugProgress from "./AugProgress";
import Baseline from "./Baseline";
import TrainingProgress from "./TrainingProgress";
import { Hourglass, Cpu, CpuIcon, Loader } from "lucide-react";
import { Flex, Progress } from "antd";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/100.css";
import { Height } from "@mui/icons-material";

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
  background-color: transparent;
  border-radius: 15px;
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
  margin-left: 25px;
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
  margin-top: 40px;
  background-color: #4566ea;
  color: rgba(224, 229, 249, 1);
  border-radius: 10px;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-size: 1em;
  font-weight: 400;
  transition: background-color 0.01s ease-in-out;
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
  margin-top: 20px;
  margin-bottom: 5px;
  background-color: #4566ea;
  color: rgba(224, 229, 249, 1);
  border-radius: 10px;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-size: 1em;
  font-weight: 400;
  transition: background-color 0.01s ease-in-out;
  &:hover {
    background-color: #a52222ff; // Color on hover
    scale: 1.01;
  }
`;
//---------------------------------------------------------------------------------------

const AugProgressSection = styled.div`
  width: 60%;
  background-color: transparent;
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
  padding-top: 5px;
  padding-right: 5px;
  padding-left: 5px;
  padding-bottom: 0px;
  align-self: center;
  display: flex;
  flex-direction: row;
`;
// background-color: #f0f2f5ff;
// box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.2);
const AugUpperSectionLeft = styled.div`
  width: 55%;
  height: 65%;
  margin-top: 115px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
`;
const AugUpperLeftHeader = styled.h4`
  font-size: 1.1em;
  color: #4566ea;
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.1);
  background-color: #dadef0ff;
  font-style: italic;
  font-weight: 600;
  font-family: "roboto", sans-serif;
  align-self: center;
  margin-top: 10px;
  justify-content: right;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 10px;
`;

const AugProgressChart = styled(Progress)`
  margin-top: 40px;
  align-self: center;
`;
//background-color: #f0f2f5ff; S
//box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.2);
const AugUpperSectionRight = styled.div`
  width: 40%;
  height: 70%;
  margin-left: 5px;
  margin-top: 115px;
  border-radius: 35px;
  display: flex;
  flex-direction: column;
`;
const AugUpperRightHeader = styled.h4`
  font-size: 1.1em;
  color: #4566ea;
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.1);
  background-color: #dadef0ff;
  font-style: italic;
  font-weight: 600;
  font-family: "roboto", sans-serif;
  align-self: center;
  margin-top: 10px;
  justify-content: right;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 10px;
`;
const StatusIndicatorBarRunning = styled.div`
  width: 90%;
  height: 70px;
  border-radius: 30px;
  background-color: #f0f2f5ff; // Green color
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  align-self: center;
  display: flex;
  flex-direction: row;
`;
const StatusIndicatorBarRunningDot = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #75f97d; // Green color
  margin-left: 40px;
  align-self: center;
`;
const StatusIndicatorBarRunningText = styled.p`
  font-size: 1.1em;
  color: #909bc9ff;
  margin-left: 20px;
  font-family: "Inter", sans-serif;
  align-self: center;
`;
const StatusIndicatorBarStopped = styled.div`
  width: 90%;
  height: 70px;
  border-radius: 30px;
  background-color: #f0f2f5ff; // Green color
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  align-self: center;
  display: flex;
  flex-direction: row;
`;
const StatusIndicatorBarStoppedDot = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ff3333ff; // Green color
  margin-left: 40px;
  align-self: center;
`;
const StatusIndicatorBarStoppedText = styled.p`
  font-size: 1.1em;
  color: #909bc9ff;
  margin-left: 20px;
  font-family: "Inter", sans-serif;
  align-self: center;
`;

const AugLowerSection = styled.div`
  width: 100%;
  height: 40%;
  background-color: transparent;
  padding: 5px;
  align-self: center;
  display: flex;
  flex-direction: row;
`;

const AugLowerSectionLeft = styled.div`
  width: 55%;
  height: 100%;
  background-color: transparent;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const StatusTimerBaseline = styled.div`
  width: 90%;
  height: 80px;
  border-radius: 45px;
  background-color: #f0f2f5ff; // Green color
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.1);
  margin-top: 25px;
  align-self: center;
  display: flex;
  flex-direction: row;
`;
const TimeLabel = styled.p`
  font-size: 1em;
  color: #7f7f7fff;
  background-color: #dadef0ff;
  font-style: italic;
  margin-left: 30px;
  font-weight: 500;
  font-family: "roboto", sans-serif;
  align-self: center;
  justify-content: right;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 10px;
`;
const TimerR = styled(Hourglass)`
  width: 30px;
  height: 30px;
  color: #8c8d91ff;
  margin-left: 40px;
  align-self: center;
`;

const TimeInSec = styled.p`
  font-size: 2em;
  color: #222222ff;
  margin-left: 20px;
  font-weight: 300;
  font-family: "roboto", sans-serif;
  align-self: center;
  justify-content: right;
`;
const TimeUnits = styled.p`
  font-size: 1.2em;
  color: #4566ea;
  font-style: italic;
  margin-left: 10px;
  font-weight: 500;
  font-family: "roboto", sans-serif;
  align-self: center;
  justify-content: right;
`;
const StatusRamBaseline = styled.div`
  width: 90%;
  height: 80px;
  border-radius: 45px;
  background-color: #f0f2f5ff; // Green color
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  align-self: center;
  display: flex;
  flex-direction: row;
`;

const RamLabel = styled.p`
  font-size: 1em;
  color: #7f7f7fff;
  background-color: #dadef0ff;
  font-style: italic;
  margin-left: 30px;
  font-weight: 500;
  font-family: "roboto", sans-serif;
  align-self: center;
  justify-content: right;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 10px;
`;
const RamR = styled(CpuIcon)`
  width: 30px;
  height: 30px;
  color: #8c8d91ff;
  margin-left: 40px;
  align-self: center;
`;

const RamInMB = styled.p`
  font-size: 2em;
  color: #222222ff;
  margin-left: 20px;
  font-weight: 300;
  font-family: "roboto", sans-serif;
  align-self: center;
  justify-content: right;
`;
const RamUnits = styled.p`
  font-size: 1.2em;
  color: #4566ea;
  font-style: italic;
  margin-left: 10px;
  font-weight: 500;
  font-family: "roboto", sans-serif;
  align-self: center;
  justify-content: right;
`;
const AugLowerSectionRight = styled.div`
  width: 45%;
  height: 78%;
  background-color: transparent;
  margin-left: 5px;
  margin-top: 25px;
  border-radius: 45px;
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImageCountHeading = styled.p`
  font-size: 1.1em;
  color: #4566ea;
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.1);
  background-color: #dadef0ff;
  font-style: italic;
  font-weight: 600;
  font-family: "roboto", sans-serif;
  align-self: center;
  margin-top: 10px;
  justify-content: right;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 10px;
`;
const ImageCount = styled.p`
  font-size: 4.5em;
  margin-top: 15px;
  margin-bottom: 0px;
  color: #4566ea;
  font-weight: 100;
  font-family: "roboto", sans-serif;
  align-self: center;
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
//

const Enhanced: React.FunctionComponent = () => {
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
                Dinov2 + Faiss Augmentation Setup
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
              <InputLabel>Lower Threshold (Th1) between 0 and 99</InputLabel>
              <InputField
                type="number"
                name="INITIAL_TH1"
                value={formData.INITIAL_TH1 || ""}
                onChange={handleChange}
              ></InputField>
              <InputLabel>Upper Threshold (Th2) between 0 and 99</InputLabel>
              <InputField
                type="number"
                name="INITIAL_TH2"
                value={formData.INITIAL_TH2 || ""}
                onChange={handleChange}
              ></InputField>
              <InputLabel>% Target</InputLabel>
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
                  <AugUpperLeftHeader>Augmentation Progress</AugUpperLeftHeader>
                  <AugProgressChart type="circle" percent={80} size={180} />
                </AugUpperSectionLeft>
                <AugUpperSectionRight>
                  <AugUpperRightHeader>Status</AugUpperRightHeader>
                  <StatusIndicatorBarRunning>
                    <StatusIndicatorBarRunningDot />
                    <StatusIndicatorBarRunningText>
                      Running ...
                    </StatusIndicatorBarRunningText>
                  </StatusIndicatorBarRunning>
                  <StatusIndicatorBarStopped>
                    <StatusIndicatorBarStoppedDot />
                    <StatusIndicatorBarStoppedText>
                      Stopped ...
                    </StatusIndicatorBarStoppedText>
                  </StatusIndicatorBarStopped>
                </AugUpperSectionRight>
              </AugUpperSection>
              <AugLowerSection>
                <AugLowerSectionLeft>
                  <StatusTimerBaseline>
                    <TimeLabel>Time Elapsed</TimeLabel>
                    <TimerR />
                    <TimeInSec>3500.06</TimeInSec>
                    <TimeUnits>sec</TimeUnits>
                  </StatusTimerBaseline>
                  <StatusRamBaseline>
                    <RamLabel>RAM Usage</RamLabel>
                    <RamR />
                    <RamInMB>3500.06</RamInMB>
                    <RamUnits>mb</RamUnits>
                  </StatusRamBaseline>
                </AugLowerSectionLeft>
                <AugLowerSectionRight>
                  <ImageCountHeading>New Images Generated</ImageCountHeading>
                  <ImageCount>3500</ImageCount>
                  <Stack spacing={3} direction="row" alignItems="center">
                    <CircularProgress size="1rem" />
                  </Stack>
                </AugLowerSectionRight>
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
export default Enhanced;
