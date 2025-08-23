import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "../index.css";
import { Link } from "react-router-dom";
import Enhanced from "./Enhanced";
import Readme from "./Readme";
import { Hourglass, CpuIcon } from "lucide-react";
import { Progress } from "antd";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import SimpleImageSlider from "react-simple-image-slider";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/100.css";

const MainPage = styled.div`
  font-family: "Poppins", sans-serif;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  background-color: #eaf0f7;
`;
//  background-color: #eaf0f7;

//  background-color: #4723da;

const SideNavMenu = styled.div`
  min-width: 250px;
  width: 20%;
  background-color: #4566ea;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8px;
  border-radius: 5px;
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.3);
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
    transform: scale(1.06);
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

const InputsProgressContainer = styled.div`
  width: 100%;
  height: 55%;
  background-color: #eaf0f7;
  margin-top: 5px;
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
    background-color: #107944ff;
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
    background-color: #a52222ff;
    scale: 1.01;
  }
`;

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
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.05);
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
  margin-top: 9px;
  margin-bottom: 20px;
  align-self: center;
`;
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
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.05);
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
  height: 40px;
  border-radius: 5px;
  background-color: #f0f2f5ff;
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.07);
  margin-top: 30px;
  align-self: center;
  display: flex;
  flex-direction: row;
`;
const StatusIndicatorBarRunningDot = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #75f97d;
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
  height: 40px;
  border-radius: 5px;
  background-color: #f0f2f5ff;
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.07);
  margin-top: 20px;
  align-self: center;
  display: flex;
  flex-direction: row;
`;
const StatusIndicatorBarStoppedDot = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ff3333ff;
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
  height: 60px;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.05);
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
  margin-left: 15px;
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
  height: 60px;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.05);
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
  margin-left: 15px;
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
  height: 140px;
  background-color: #ffffff;
  margin-left: 5px;
  margin-top: 25px;
  border-radius: 5px;
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ImageCountHeading = styled.p`
  font-size: 1.1em;
  color: #4566ea;
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.05);
  background-color: #dadef0ff;
  font-style: italic;
  font-weight: 600;
  font-family: "roboto", sans-serif;
  align-self: center;
  margin-top: 5px;
  justify-content: right;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 10px;
`;
const ImageCount = styled.p`
  font-size: 2.7em;
  margin-top: 5px;
  margin-bottom: 0px;
  color: #4566ea;
  font-weight: 600;
  font-family: "roboto", sans-serif;
  align-self: center;
`;

// --------------------------   TERMINAL  -------------------------------
const AugTerminalSection = styled.div`
  width: 100%;
  height: 45%;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.1);
  justify-content: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const TerminalText = styled.textarea`
  width: 80%;
  height: 80%;
  color: #6a86f5ff;
  font-family: "Cascadia Mono", Courier, monospace;
  font-size: 1.2em;
  background-color: transparent;
  margin-left: 40px;
  border: none;
  outline: none;
  resize: none;
  scrollbar-width: 0px;
  scrollbar-color: transparent transparent;
`;
//  color: #75f97d;

const ImagesPreviewContainer = styled.div`
  width: 315px;
  height: 97%;
  background-color: #000000ff;
  border-radius: 10px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 7px;
`;
const Images = styled(SimpleImageSlider)`
  border-radius: 8px;
  object-fit: contain;
`;
const SummaryLinkContainer = styled.div`
  background-color: #000000ff;
  margin-left: 8px;
`;

// --------------------------   COMPONENT  -------------------------------
const Baseline: React.FunctionComponent = () => {
  const terminalRef = useRef<HTMLTextAreaElement>(null);
  const [terminalOutput, setTerminalOutput] = useState<string>("");

  // live metrics
  const [progressPercent, setProgressPercent] = useState<number>(0); // now uses overall_progress
  const [phase, setPhase] = useState<"idle" | "compare" | "fuse">("idle");
  const [ramMb, setRamMb] = useState<number>(0);
  const [imagesGenerated, setImagesGenerated] = useState<number>(0);

  // run state + previews
  const [isRunning, setIsRunning] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [summaryLink, setSummaryLink] = useState<string>("");

  // timer (live + final)
  const [elapsedLive, setElapsedLive] = useState<number>(0);
  const [finalElapsedSec, setFinalElapsedSec] = useState<number | null>(null);

  useEffect(() => {
    if (!isRunning) return;
    setElapsedLive(0);
    const t = setInterval(() => setElapsedLive((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [isRunning]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  interface AugmentationParams {
    ROOT_DATASET_DIR: string;
    MAIN_OUTPUT_DIR: string;
    INITIAL_TH1: number | "";
    INITIAL_TH2: number | "";
    ACCEPTABLE_DIFFERENCE_PERCENTAGE: number | "";
  }

  const [formData, setFormData] = useState<AugmentationParams>({
    ROOT_DATASET_DIR: "",
    MAIN_OUTPUT_DIR: "",
    INITIAL_TH1: "",
    INITIAL_TH2: "",
    ACCEPTABLE_DIFFERENCE_PERCENTAGE: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as keyof AugmentationParams]:
        type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const startStreamingRun = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsRunning(true);
    setTerminalOutput("");
    setPreviewImages([]);
    setSummaryLink("");
    setPhase("idle");
    setRamMb(0);
    setImagesGenerated(0);
    setFinalElapsedSec(null);
    setProgressPercent(0);

    const payload = {
      ROOT_DATASET_DIR: String(formData.ROOT_DATASET_DIR),
      MAIN_OUTPUT_DIR: String(formData.MAIN_OUTPUT_DIR),
      INITIAL_TH1: Number(formData.INITIAL_TH1),
      INITIAL_TH2: Number(formData.INITIAL_TH2),
      ACCEPTABLE_DIFFERENCE_PERCENTAGE: Number(
        formData.ACCEPTABLE_DIFFERENCE_PERCENTAGE
      ),
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/augment/baseline/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.body) {
        setTerminalOutput("No stream body received.");
        setIsRunning(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        setTerminalOutput((prev) => prev + chunk);

        buffer += chunk;
        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          const line = buffer.slice(0, idx).trimEnd();
          buffer = buffer.slice(idx + 1);

          if (line.startsWith("[[EVT]]")) {
            const payload = line.slice(7).trim();
            try {
              const evt = JSON.parse(payload);

              if (evt.type === "start") {
                setPhase("compare");
              }

              // NEW: overall progress drives the ring
              if (
                evt.type === "overall_progress" &&
                typeof evt.percent === "number"
              ) {
                const clamped = Math.max(0, Math.min(100, evt.percent));
                setProgressPercent(clamped);
              }

              // still keep status, RAM, images
              if (
                (evt.type === "compare_progress" ||
                  evt.type === "fuse_progress") &&
                evt.phase
              ) {
                if (evt.phase === "compare" || evt.phase === "fuse")
                  setPhase(evt.phase);
              }

              if (evt.type === "heartbeat") {
                if (typeof evt.rss_mb === "number") setRamMb(evt.rss_mb);
              }

              if (evt.type === "generated") {
                if (typeof evt.generated_so_far === "number") {
                  setImagesGenerated(evt.generated_so_far);
                }
              }

              if (evt.type === "done") {
                setProgressPercent(100);
                if (typeof evt.elapsed_seconds === "number") {
                  setFinalElapsedSec(evt.elapsed_seconds);
                }
                setPhase("idle");
              }
            } catch {
              // ignore malformed
            }
            continue;
          }

          if (line.startsWith("[[__DONE__]]")) {
            const tail = line.slice("[[__DONE__]]".length).trim();
            try {
              const parsed = JSON.parse(tail);
              if (parsed?.done) {
                if (Array.isArray(parsed.samples))
                  setPreviewImages(parsed.samples);
                if (parsed.summary_url) setSummaryLink(parsed.summary_url);
              }
            } catch {}
            continue;
          }
        }
      }
    } catch (err: any) {
      setTerminalOutput(
        (prev) => prev + `\nStream error: ${err?.message || String(err)}`
      );
    } finally {
      setIsRunning(false);
      setPhase("idle");
      setFinalElapsedSec((prev) => (prev == null ? elapsedLive : prev));
      setProgressPercent((p) => (p === 0 ? 100 : p));
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
            <NavSubMenuHeader>ABOUT</NavSubMenuHeader>
            <MenuItem>
              <Link
                to="/Readme"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Readme
              </Link>
            </MenuItem>
            <ReloadButton onClick={() => window.location.reload()}>
              Reload All
            </ReloadButton>
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
              />

              <InputLabel>Output Folder Path</InputLabel>
              <InputField
                type="text"
                name="MAIN_OUTPUT_DIR"
                value={formData.MAIN_OUTPUT_DIR || ""}
                onChange={handleChange}
              />

              <InputLabel>Lower Threshold (Th1)</InputLabel>
              <InputField
                type="number"
                name="INITIAL_TH1"
                value={formData.INITIAL_TH1}
                onChange={handleChange}
              />

              <InputLabel>Upper Threshold (Th2)</InputLabel>
              <InputField
                type="number"
                name="INITIAL_TH2"
                value={formData.INITIAL_TH2}
                onChange={handleChange}
              />

              <InputLabel>% Tolerance</InputLabel>
              <InputField
                type="number"
                name="ACCEPTABLE_DIFFERENCE_PERCENTAGE"
                value={formData.ACCEPTABLE_DIFFERENCE_PERCENTAGE}
                onChange={handleChange}
              />

              <ProceedButton
                type="submit"
                onClick={startStreamingRun}
                disabled={isRunning}
              >
                {isRunning ? "RUNNING..." : "START"}
              </ProceedButton>

              <StopButton>STOP</StopButton>
            </InputsSection>

            <AugProgressSection>
              <AugUpperSection>
                <AugUpperSectionLeft>
                  <AugUpperLeftHeader>Augmentation Progress</AugUpperLeftHeader>
                  <AugProgressChart
                    type="circle"
                    percent={Math.round(progressPercent)}
                    size={160}
                  />
                </AugUpperSectionLeft>
                <AugUpperSectionRight>
                  <AugUpperRightHeader>Status</AugUpperRightHeader>
                  <StatusIndicatorBarRunning>
                    <StatusIndicatorBarRunningDot />
                    <StatusIndicatorBarRunningText>
                      {isRunning
                        ? phase === "compare"
                          ? "Comparing ..."
                          : phase === "fuse"
                          ? "Fusing ..."
                          : "Running ..."
                        : "Idle"}
                    </StatusIndicatorBarRunningText>
                  </StatusIndicatorBarRunning>
                  <StatusIndicatorBarStopped>
                    <StatusIndicatorBarStoppedDot />
                    <StatusIndicatorBarStoppedText>
                      {isRunning ? "Will stop when done ..." : "Stopped ..."}
                    </StatusIndicatorBarStoppedText>
                  </StatusIndicatorBarStopped>
                </AugUpperSectionRight>
              </AugUpperSection>

              <AugLowerSection>
                <AugLowerSectionLeft>
                  <StatusTimerBaseline>
                    <Hourglass
                      style={{ alignSelf: "center", marginLeft: "20px" }}
                    />
                    <TimeLabel>Time Elapsed</TimeLabel>

                    <TimeInSec>
                      {isRunning
                        ? elapsedLive.toFixed(0)
                        : (finalElapsedSec ?? 0).toFixed(0)}
                    </TimeInSec>
                    <TimeUnits>sec</TimeUnits>
                  </StatusTimerBaseline>
                  <StatusRamBaseline>
                    <CpuIcon
                      style={{ alignSelf: "center", marginLeft: "25px" }}
                    />
                    <RamLabel>RAM Usage</RamLabel>

                    <RamInMB>{ramMb ? ramMb.toFixed(1) : "—"}</RamInMB>
                    <RamUnits>mb</RamUnits>
                  </StatusRamBaseline>
                </AugLowerSectionLeft>

                <AugLowerSectionRight>
                  <ImageCountHeading>New Images Generated</ImageCountHeading>
                  <ImageCount>{imagesGenerated || "—"}</ImageCount>
                  <Stack spacing={3} direction="row" alignItems="center">
                    {isRunning && <CircularProgress size="1rem" />}
                  </Stack>
                </AugLowerSectionRight>
              </AugLowerSection>
            </AugProgressSection>
          </InputsProgressContainer>

          <AugTerminalSection>
            <TerminalText
              ref={terminalRef}
              value={terminalOutput}
              readOnly
              placeholder="Terminal Output"
            />

            <ImagesPreviewContainer>
              {previewImages.length > 0 ? (
                <Images
                  width={"250px"}
                  height={"280px"}
                  images={previewImages.map((src) => ({
                    url: `http://127.0.0.1:8000${src}`,
                  }))}
                  showBullets
                  showNavs
                  autoPlay={false}
                  style={{ borderRadius: 8 }}
                />
              ) : (
                <p style={{ color: "grey", textAlign: "center" }}>
                  No images yet
                </p>
              )}
              {summaryLink && (
                <a
                  href={`http://127.0.0.1:8000${summaryLink}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "#4566ea",
                    marginTop: 10,
                    textDecoration: "none",
                    fontStyle: "oblique",
                    fontWeight: "bold",
                  }}
                >
                  Augmentation summary
                </a>
              )}
            </ImagesPreviewContainer>
          </AugTerminalSection>
        </MainContentPane>
      </MainPage>
    </>
  );
};

export default Baseline;
