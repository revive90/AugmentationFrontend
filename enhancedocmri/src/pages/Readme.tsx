import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "../index.css";
import { Link } from "react-router-dom";
import Enhanced from "./Enhanced";
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

const ManualContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-top: 10px;
  padding-bottom: 10px;
  background: #eaf0f7;
`;

const ManualCard = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  padding: 28px;
`;

const ManualH1 = styled.h1`
  font-size: 1.6rem;
  color: #2b3a67;
  margin: 0 0 8px 0;
`;

const ManualSub = styled.p`
  color: #6c7aa0;
  margin: 0 0 20px 0;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e6ebf5;
  margin: 18px 0 24px;
`;

const Section = styled.section`
  & + & {
    margin-top: 22px;
  }
`;

const H2 = styled.h2`
  font-size: 1.1rem;
  color: #4566ea;
  background: #dadef0ff;
  display: inline-block;
  padding: 6px 10px;
  border-radius: 10px;
  margin: 0 0 12px 0;
`;

const P = styled.p`
  color: #485472;
  line-height: 1.55;
  margin: 0 0 10px 0;
`;

const List = styled.ul`
  margin: 8px 0 0 18px;
  color: #485472;
  list-style: none;
  li {
    margin-bottom: 6px;
  }
`;

const Kbd = styled.kbd`
  background: #f2f4fa;
  border: 1px solid #e0e6f5;
  border-bottom-width: 2px;
  border-radius: 6px;
  padding: 0 6px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.95em;
`;

// --------------------------   COMPONENT  -------------------------------
const Readme: React.FunctionComponent = () => {
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
                User Manual
              </Link>
            </MenuItem>
            <ReloadButton onClick={() => window.location.reload()}>
              Reload All
            </ReloadButton>
          </ul>
        </SideNavMenu>
        <MainContentPane>
          <ManualContainer>
            <ManualCard>
              <ManualH1>OCMRI Augmentation Tool — User Manual</ManualH1>
              <ManualSub>
                Run and monitor dataset augmentation with either the{" "}
                <strong>Baseline (MSE)</strong> method or the{" "}
                <strong>Enhanced (DINOv2 + Faiss)</strong> method. This page
                explains inputs, controls, live metrics, and outputs.
              </ManualSub>

              <Divider />

              <Section>
                <H2>1) Navigation</H2>
                <List>
                  <li>Use the left menu to switch pages:</li>
                  <li>
                    <strong>Baseline Method</strong> — Original MSE-based OCMRI
                    augmentation.
                  </li>
                  <li>
                    <strong>Enhanced Method</strong> — Proposed DINOv2 + Faiss
                    augmentation pipeline.
                  </li>
                  <li>
                    <strong>User Manual</strong> — This help guide.
                  </li>
                </List>
              </Section>

              <Section>
                <H2>2) Baseline Method — Inputs</H2>
                <List>
                  <li>
                    <strong>Input Data Directory</strong> — Root folder of your
                    training images, grouped by class (one folder per class).
                  </li>
                  <li>
                    <strong>Main Output Directory</strong> — Where augmented
                    images will be written (class folders are created
                    automatically).
                  </li>
                  <li>
                    <strong>Lower Threshold (TH1)</strong> — MSE lower bound
                    used in pairing/fusion.
                  </li>
                  <li>
                    <strong>Upper Threshold (TH2)</strong> — MSE upper bound;
                    controls how similar pairs can be.
                  </li>
                  <li>
                    <strong>% Tolerance</strong> — Acceptable difference from
                    target image counts when tuning thresholds.
                  </li>
                </List>
              </Section>

              <Section>
                <H2>3) Enhanced Method — Inputs</H2>
                <List>
                  <li>
                    <strong>Input Data Directory</strong> — Root folder of your
                    training images, grouped by class.
                  </li>
                  <li>
                    <strong>Main Output Directory</strong> — Destination for
                    generated images (class folders created automatically).
                  </li>
                  <li>
                    <strong>Upper Threshold (0–1)</strong> — Max cosine
                    similarity cutoff for valid pairs.
                  </li>
                  <li>
                    <strong>Lower Threshold / Min Quality (0–1)</strong> —
                    Minimum similarity quality for pairs.
                  </li>
                  <li>
                    <strong>% Target of Data Augmentation</strong> — Controls
                    how many images to generate relative to originals.
                  </li>
                </List>
              </Section>

              <Section>
                <H2>4) Running an Augmentation</H2>
                <List>
                  <li>Enter all required fields on the chosen method page.</li>
                  <li>
                    Click <strong>START</strong> to begin. The backend starts
                    immediately and streams logs.
                  </li>
                  <li>
                    To reset the UI at any time, click{" "}
                    <strong>Reload All</strong> in the side menu or press{" "}
                    <Kbd>Ctrl</Kbd> + <Kbd>R</Kbd>.
                  </li>
                </List>
              </Section>

              <Section>
                <H2>5) Live Status &amp; Metrics</H2>
                <List>
                  <li>
                    <strong>Progress Ring</strong> — Overall completion
                    percentage.
                  </li>
                  <li>
                    <strong>Status</strong> — Shows the active phase (e.g.,
                    “Indexing”, “Augmenting”) or idle.
                  </li>
                  <li>
                    <strong>Timer</strong> — Live elapsed time while running;
                    freezes at final time on completion.
                  </li>
                  <li>
                    <strong>RAM Usage</strong> — Current RSS memory from the
                    backend; peak usage is written to the summary file.
                  </li>
                  <li>
                    <strong>New Images Generated</strong> — Increments as fusion
                    completes; shows a global total (Enhanced) or per-phase
                    (Baseline).
                  </li>
                  <li>
                    <strong>Terminal Output</strong> — Full backend logs
                    (including structured <code>[[EVT]]</code> events).
                  </li>
                  <li>
                    <strong>Preview Panel</strong> — Rotating sample of
                    generated images once available.
                  </li>
                  <li>
                    <strong>Summary Link</strong> — Click to open the run
                    summary (time, memory, counts), saved under{" "}
                    <code>augmentation_results</code>.
                  </li>
                </List>
              </Section>

              <Section>
                <H2>6) Expected Outputs</H2>
                <List>
                  <li>
                    <strong>Augmented Images</strong> — Written to the chosen
                    output directory under class subfolders.
                  </li>
                  <li>
                    <strong>Summary File</strong> — Text file with total images
                    generated, peak memory usage, and total execution time.
                  </li>
                  <li>
                    <strong>Optional Previews</strong> — A small, round-robin
                    selection is displayed in the UI after the run.
                  </li>
                </List>
              </Section>

              <Section>
                <H2>7) Tips &amp; Troubleshooting</H2>
                <List>
                  <li>
                    <strong>Directory Access</strong> — Use folders you have
                    write permissions for (avoid protected system paths).
                  </li>
                  <li>
                    <strong>Threshold Ranges</strong> — For Enhanced, keep
                    values in <code>[0.00, 1.00]</code>; for Baseline, use
                    sensible MSE ranges per your dataset.
                  </li>
                  <li>
                    <strong>Streaming</strong> — If logs stop, check the
                    terminal where the backend is running for Python errors.
                  </li>
                  <li>
                    <strong>Performance</strong> — Enhanced method is faster but
                    uses more RAM; ensure enough memory for large datasets.
                  </li>
                </List>
              </Section>

              <Divider />

              <P style={{ fontSize: "0.95rem", color: "#6c7aa0" }}>
                Verify your backend is running (
                <code>uvicorn server:app --reload</code>), double-check paths,
                and review the streamed logs for clues.
              </P>
            </ManualCard>
          </ManualContainer>
        </MainContentPane>
      </MainPage>
    </>
  );
};

export default Readme;
