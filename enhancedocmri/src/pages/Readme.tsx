import React from "react";
import styled from "styled-components";
import "../index.css";
import { Link } from "react-router-dom";
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
    transform: scale(1.02);
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
    transform: scale(1.02);
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
            <NavSubMenuHeader>Baseline</NavSubMenuHeader>

            <MenuItem>
              <Link
                to="/Baseline"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Original OCMRI
              </Link>
            </MenuItem>
            <NavSubMenuHeader>Enhanced OCMRI</NavSubMenuHeader>
            <MenuItem>
              <Link
                to="/Enhanced-Threshold-Based"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Threshold Based
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to="/Enhanced-Target-Percentage"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Target % Based
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to="/Enhanced-Class-Specific"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Class Specific
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
                <strong>Enhanced (DINOv2 + FAISS)</strong> modes. This page
                explains inputs, controls, live metrics, and outputs for
                Threshold-Based, Target-Percentage, and Class-Specific runs.
              </ManualSub>

              <Divider />

              <Section>
                <H2>1) Navigation</H2>
                <List>
                  <li>Use the left menu to switch pages:</li>
                  <li>
                    <strong>Baseline Method</strong> — Original MSE-driven
                    augmentation.
                  </li>
                  <li>
                    <strong>Enhanced — Threshold Based</strong> — Generate
                    fusions whose DINOv2 similarity falls within a specified
                    band.
                  </li>
                  <li>
                    <strong>Enhanced — Target % Based</strong> — Grow each class
                    by a global percentage target (e.g. +300%).
                  </li>
                  <li>
                    <strong>Enhanced — Class Specific</strong> — Set exact
                    target counts per class (scan classes, edit targets, run).
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
                    <strong>Input Data Directory</strong> — Root folder of
                    training images organized in subfolders by class.
                  </li>
                  <li>
                    <strong>Main Output Directory</strong> — Destination for
                    generated images (class subfolders will be created).
                  </li>
                  <li>
                    <strong>TH1 / TH2 (MSE)</strong> — Lower/upper MSE bounds
                    used to pair images.
                  </li>
                  <li>
                    <strong>% Tolerance</strong> — Acceptable deviation when the
                    baseline script tunes thresholds toward the target.
                  </li>
                </List>
              </Section>

              <Section>
                <H2>3) Enhanced — Threshold Based</H2>
                <List>
                  <li>
                    <strong>Input Data Directory</strong> — Root folder grouped
                    by class.
                  </li>
                  <li>
                    <strong>Main Output Directory</strong> — Where fusions are
                    saved (per-class).
                  </li>
                  <li>
                    <strong>Lower Threshold (0–1)</strong> — Minimum cosine
                    similarity for valid pairs.
                  </li>
                  <li>
                    <strong>Upper Threshold (0–1)</strong> — Maximum cosine
                    similarity for valid pairs.
                  </li>
                  <li>
                    Use when you want strict control over pair similarity
                    quality.
                  </li>
                </List>
              </Section>

              <Section>
                <H2>4) Enhanced — Target % Based</H2>
                <List>
                  <li>
                    <strong>Input Data Directory</strong> — Root folder grouped
                    by class.
                  </li>
                  <li>
                    <strong>Main Output Directory</strong> — Destination for
                    generated images.
                  </li>
                  <li>
                    <strong>Target %</strong> — How many images to generate
                    relative to each class’s original count (e.g., 300 = grow to
                    300% of original).
                  </li>
                  <li>
                    No per-class editing here; the percentage applies to all
                    classes uniformly.
                  </li>
                </List>
              </Section>

              <Section>
                <H2>5) Enhanced — Class Specific</H2>
                <List>
                  <li>
                    <strong>Input Data Directory</strong> — Root folder grouped
                    by class.
                  </li>
                  <li>
                    <strong>Main Output Directory</strong> — Destination for
                    generated images.
                  </li>
                  <li>
                    <strong>Scan Classes</strong> — Reads class folders and
                    their image counts from the input directory.
                  </li>
                  <li>
                    <strong>Edit Targets</strong> — Set exact target counts per
                    class in the table.
                  </li>
                  <li>
                    <strong>Equalize to Largest</strong> — Convenience button to
                    make all targets equal to the largest existing class.
                  </li>
                </List>
              </Section>

              <Section>
                <H2>6) Running an Augmentation</H2>
                <List>
                  <li>
                    Enter the required fields for the chosen page/mode, then
                    click <strong>START</strong>.
                  </li>
                  <li>
                    The backend streams logs live to the terminal panel and the
                    UI updates progress, RAM, and generated counts.
                  </li>
                  <li>
                    Click <strong>Reload All</strong> (left menu) or press{" "}
                    <Kbd>Ctrl</Kbd> + <Kbd>R</Kbd> to reset the UI.
                  </li>
                </List>
              </Section>

              <Section>
                <H2>7) Live Status &amp; Metrics</H2>
                <List>
                  <li>
                    <strong>Progress Ring</strong> — Overall completion.
                  </li>
                  <li>
                    <strong>Status</strong> — Active phase: “Indexing” (feature
                    extraction / FAISS) or “Augmenting”.
                  </li>
                  <li>
                    <strong>Timer</strong> — Live elapsed time; freezes on
                    completion.
                  </li>
                  <li>
                    <strong>RAM Usage</strong> — Live RSS (MB) from the backend;
                    peak memory is recorded in the summary.
                  </li>
                  <li>
                    <strong>New Images Generated</strong> — Live counter of
                    fused images created during the run.
                  </li>
                  <li>
                    <strong>Terminal Output</strong> — Streams backend logs
                    including structured events like <code>[[EVT]]</code>{" "}
                    (progress, heartbeat, generated, done).
                  </li>
                  <li>
                    <strong>Preview Panel</strong> — Shows a rotating sample of
                    generated images when available.
                  </li>
                  <li>
                    <strong>Summary Link</strong> — Opens the saved summary file
                    under <code>augmentation_results</code>.
                  </li>
                </List>
              </Section>

              <Section>
                <H2>8) Expected Outputs</H2>
                <List>
                  <li>
                    <strong>Augmented Images</strong> — Written to the chosen
                    output dir in per-class subfolders.
                  </li>
                  <li>
                    <strong>Run Summary (.txt)</strong> — Includes timings, peak
                    memory, final totals, and per-class details (varies by
                    mode).
                  </li>
                  <li>
                    <strong>FAISS Indexes</strong> — Created internally for the
                    Enhanced modes to accelerate similarity lookups.
                  </li>
                </List>
              </Section>

              <Section>
                <H2>9) Tips &amp; Troubleshooting</H2>
                <List>
                  <li>
                    <strong>Backend Running</strong> — Start with{" "}
                    <code>uvicorn server:app --reload</code>. If a page shows no
                    logs, check server console for errors.
                  </li>
                  <li>
                    <strong>Paths</strong> — Use directories you can read/write.
                    Avoid protected system folders.
                  </li>
                  <li>
                    <strong>Restart Helps</strong> — If a new endpoint (e.g.,
                    “Scan Classes”) 404s after code changes, restart the server.
                  </li>
                  <li>
                    <strong>Large Datasets</strong> — Enhanced modes are faster
                    but can be memory-intensive. Ensure enough RAM and disk
                    space.
                  </li>
                  <li>
                    <strong>Class-Specific Planning</strong> — Use “Plan
                    Targets” to visualize availability/shortfall before
                    running—then “Clamp to Available” if needed.
                  </li>
                </List>
              </Section>

              <Divider />

              <P style={{ fontSize: "0.95rem", color: "#6c7aa0" }}>
                If something isn't working right, verify your paths, restart the
                backend, and inspect the streamed logs for any Python errors or
                bad arguments.
              </P>
            </ManualCard>
          </ManualContainer>
        </MainContentPane>
      </MainPage>
    </>
  );
};

export default Readme;
