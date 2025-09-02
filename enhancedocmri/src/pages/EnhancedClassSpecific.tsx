import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "../index.css";
import { Link } from "react-router-dom";
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

/* ---------- Shell ---------- */
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

/* ---------- Top half ---------- */
const InputsProgressContainer = styled.div`
  width: 100%;
  height: 55%;
  background-color: #eaf0f7;
  margin-top: 5px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const InputsSection = styled.div`
  width: 40%;
  background-color: transparent;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding-bottom: 8px;
`;
const InputsSectionHeader = styled.h3`
  font-size: 1.2em;
  color: #4566ea;
  background-color: #dadef0ff;
  padding: 16px 10px;
  width: 93%;
  border-radius: 10px;
  margin: 10px auto 16px auto;
  box-shadow: 0px 3px 13px 0px rgba(89, 89, 89, 0.1);
`;
const FieldBlock = styled.div`
  width: 93%;
  margin: 0 auto 10px auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const InputLabel = styled.p`
  font-size: 0.95em;
  font-weight: 500;
  color: #7f7f7fff;
  font-family: "Inter", sans-serif;
  margin: 0 0 2px 2px;
  margin-left: 40px;
  margin-bottom: 10px;
`;
const InputField = styled.input`
  width: 93%;
  height: 36px;
  outline: none;
  border: none;
  font-size: 1em;
  margin-left: 25px;
  margin-bottom: 10px;
  border-radius: 10px;
  color: #7f7f7fff;
  background: #fff;
  box-shadow: 0px 3px 13px 0px rgba(89, 89, 89, 0.1);
`;

const ButtonPrimary = styled.button`
  background-color: #4566ea;
  color: #e0e5f9;
  border: none;
  border-radius: 10px;
  height: 38px;
  padding: 0 14px;
  font-size: 0.95em;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  &:hover {
    background-color: #107944ff;
  }
`;
const ButtonGhost = styled(ButtonPrimary)`
  background-color: #4566ea;
  &:hover {
    background-color: #3453cf;
  }
`;

const Row = styled.div`
  width: 93%;
  margin: 8px auto 0 auto;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProceedButton = styled(ButtonPrimary)`
  width: 93%;
  margin: 12px auto 0 auto;
`;
const StopButton = styled(ButtonGhost)`
  width: 93%;
  margin: 10px auto 0 auto;
`;

const AugProgressSection = styled.div`
  width: 60%;
  background-color: transparent;
  margin-left: 2px;
  display: flex;
  flex-direction: column;
  padding: 6px 6px 2px 6px;
  border-radius: 15px;
`;
const AugUpperSection = styled.div`
  width: 100%;
  height: 60%;
  display: grid;
  grid-template-columns: 48% 52%;
  gap: 10px;
`;
const AugUpperSectionLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const AugUpperLeftHeader = styled.h4`
  font-size: 1.05em;
  color: #4566ea;
  background-color: #dadef0ff;
  font-style: italic;
  font-weight: 600;
  font-family: "roboto", sans-serif;
  margin: 6px auto 8px auto;
  padding: 5px 14px;
  border-radius: 10px;
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.05);
`;
const AugProgressChart = styled(Progress)`
  margin-top: 6px;
`;
const AugUpperSectionRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const StatCard = styled.div`
  width: 88%;
  min-height: 110px;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.05);
  margin: 6px 0 8px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 10px;
`;
const AugUpperRightHeader = styled(AugUpperLeftHeader)`
  align-self: flex-start;
`;
const StatusIndicatorBar = styled.div`
  width: 88%;
  height: 40px;
  border-radius: 8px;
  background-color: #f0f2f5ff;
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.07);
  margin: 8px 0 0 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 18px;
  gap: 12px;
`;
const Dot = styled.div<{ color: string }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${(p) => p.color};
`;
const StatusText = styled.p`
  font-size: 1.05em;
  color: #909bc9ff;
  font-family: "Inter", sans-serif;
`;

const TableWrap = styled.div`
  width: 100%;
  height: 40%;
  overflow: auto;
  padding: 6px;
  border-radius: 10px;
`;
const ClassTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
  font-family: "Inter", sans-serif;
  color: #444;
  th {
    text-align: left;
    color: #4566ea;
    padding: 6px 10px;
    font-weight: 600;
  }
  td {
    padding: 8px 10px;
    background: #fff;
  }
  tbody tr {
    box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.05);
  }
  tbody tr td:first-child {
    border-radius: 10px 0 0 10px;
  }
  tbody tr td:last-child {
    border-radius: 0 10px 10px 0;
  }
`;

/* ---------- Bottom half ---------- */
const AugTerminalSection = styled.div`
  width: 100%;
  height: 45%;
  margin: 10px 0 10px 0;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 1fr 315px;
  gap: 10px;
  align-items: stretch;
`;
const TerminalText = styled.textarea`
  width: 80%;
  height: 80%;
  color: #6a86f5ff;
  font-family: "Cascadia Mono", Courier, monospace;
  font-size: 1.1em;
  background-color: transparent;
  border: none;
  outline: none;
  resize: none;
  padding: 60px;
`;
const ImagesPreviewContainer = styled.div`
  height: 97%;
  background-color: #000;
  border-radius: 10px;
  margin: 6px 8px 6px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Images = styled(SimpleImageSlider)`
  border-radius: 8px;
  object-fit: contain;
`;

const ImageCountHeading = styled.p`
  font-size: 1.1em;
  color: #4566ea;
  background-color: #dadef0ff;
  font-style: italic;
  font-weight: 600;
  font-family: "roboto", sans-serif;
  margin: 5px auto 0 auto;
  padding: 5px 20px;
  border-radius: 10px;
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.05);
`;
const ImageCount = styled.p`
  font-size: 2.7em;
  margin-top: 6px;
  margin-bottom: 0;
  color: #4566ea;
  font-weight: 600;
  font-family: "roboto", sans-serif;
  text-align: center;
`;
// --- Left-side stat tiles (under buttons)
const StatTile = styled.div`
  width: 93%;
  height: 60px;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.05);
  margin: 10px auto 0 auto;
  display: flex;
  align-items: center;
  padding: 0 14px;
  gap: 12px;
`;

const Pill = styled.span`
  font-size: 0.95em;
  color: #7f7f7f;
  background-color: #dadef0ff;
  font-style: italic;
  font-weight: 500;
  font-family: "roboto", sans-serif;
  padding: 4px 12px;
  border-radius: 10px;
`;

const StatValue = styled.span`
  font-size: 2em;
  color: #222222ff;
  font-weight: 300;
  font-family: "roboto", sans-serif;
  margin-left: 6px;
`;

const StatUnits = styled.span`
  font-size: 1.1em;
  color: #4566ea;
  font-style: italic;
  font-weight: 500;
  margin-left: 8px;
`;

/* ---------- Types ---------- */
type ClassRow = {
  name: string;
  imageCount: number;
  target: number;
  available?: number;
  shortfall?: number;
};

/* ---------- Component ---------- */
const EnhancedClassSpecific: React.FunctionComponent = () => {
  // terminal + autoscroll
  const terminalRef = useRef<HTMLTextAreaElement>(null);
  const [terminalOutput, setTerminalOutput] = useState<string>("");

  // live metrics
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [phase, setPhase] = useState<"idle" | "index" | "augment">("idle");
  const [ramMb, setRamMb] = useState<number>(0);
  const [imagesGenerated, setImagesGenerated] = useState<number | null>(null);

  // run state + previews
  const [isRunning, setIsRunning] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [summaryLink, setSummaryLink] = useState<string>("");

  // timer (live + final)
  const [elapsedLive, setElapsedLive] = useState<number>(0);
  const [finalElapsedSec, setFinalElapsedSec] = useState<number | null>(null);

  // class rows
  const [classes, setClasses] = useState<ClassRow[]>([]);

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

  // -------- form (no thresholds) ----------
  interface FormParams {
    ROOT_DATASET_DIR: string;
    AUGMENTED_OUTPUT_DIR: string;
  }
  const [formData, setFormData] = useState<FormParams>({
    ROOT_DATASET_DIR: "",
    AUGMENTED_OUTPUT_DIR: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as keyof FormParams]: value }));
  };

  // -------- scan classes ----------
  const scanClasses = async () => {
    if (!formData.ROOT_DATASET_DIR) return;
    const url = new URL("http://127.0.0.1:8000/datasets/scan-classes");
    url.searchParams.set("root", String(formData.ROOT_DATASET_DIR));
    const res = await fetch(url.toString());
    const data = await res.json();
    const rows: ClassRow[] =
      (data?.classes || []).map((c: any) => ({
        name: c.name,
        imageCount: Number(c.image_count || 0),
        target: 0,
      })) || [];
    setClasses(rows);
  };

  const equalizeToLargest = () => {
    const maxSize = classes.reduce((m, r) => Math.max(m, r.imageCount), 0);
    setClasses((rows) => rows.map((r) => ({ ...r, target: maxSize })));
  };
  const clampToAvailable = () => {
    setClasses((rows) =>
      rows.map((r) =>
        r.available != null
          ? { ...r, target: Math.min(r.target, r.available) }
          : r
      )
    );
  };

  // -------- run (stream) ----------
  const startStreamingRun = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetMap: Record<string, number> = {};
    classes.forEach((r) => {
      if (r.target > 0) targetMap[r.name] = r.target;
    });

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
      AUGMENTED_OUTPUT_DIR: String(formData.AUGMENTED_OUTPUT_DIR),
      CLASS_TARGETS_JSON: JSON.stringify(targetMap),
    };

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/augment/enhanced/class-specific/stream",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
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
            const jsonStr = line.slice(7).trim();
            try {
              const evt = JSON.parse(jsonStr);
              if (evt.type === "start") setPhase("index");
              if (
                evt.type === "overall_progress" &&
                typeof evt.percent === "number"
              ) {
                const clamped = Math.max(0, Math.min(100, evt.percent));
                setProgressPercent(clamped);
                if (evt.phase === "index" || evt.phase === "augment")
                  setPhase(evt.phase);
              }
              if (evt.type === "heartbeat" && typeof evt.rss_mb === "number")
                setRamMb(evt.rss_mb);
              if (
                evt.type === "generated" &&
                typeof evt.total_generated === "number"
              )
                setImagesGenerated(evt.total_generated);
              if (evt.type === "done") {
                setProgressPercent(100);
                if (typeof evt.elapsed_seconds === "number")
                  setFinalElapsedSec(evt.elapsed_seconds);
                setPhase("idle");
              }
            } catch {}
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
                if (typeof parsed.total_generated === "number")
                  setImagesGenerated(parsed.total_generated);
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

  // -------- table helpers --------
  const setRowTarget = (name: string, val: number) => {
    setClasses((rows) =>
      rows.map((r) =>
        r.name === name
          ? { ...r, target: Math.max(0, Math.floor(val || 0)) }
          : r
      )
    );
  };

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
          <InputsProgressContainer>
            {/* LEFT: Controls */}
            <InputsSection>
              <InputsSectionHeader>Class-Specific Targets</InputsSectionHeader>

              <InputLabel>Input Data Directory</InputLabel>
              <InputField
                type="text"
                name="ROOT_DATASET_DIR"
                value={formData.ROOT_DATASET_DIR || ""}
                onChange={handleChange}
              />

              <InputLabel>Main Output Directory</InputLabel>
              <InputField
                type="text"
                name="AUGMENTED_OUTPUT_DIR"
                value={formData.AUGMENTED_OUTPUT_DIR || ""}
                onChange={handleChange}
              />

              <Row>
                <ButtonPrimary
                  type="button"
                  onClick={scanClasses}
                  disabled={isRunning}
                  style={{ flex: 1 }}
                >
                  Scan Classes
                </ButtonPrimary>
              </Row>

              <Row>
                <ButtonGhost
                  type="button"
                  onClick={equalizeToLargest}
                  disabled={isRunning || classes.length === 0}
                  style={{ flex: 1 }}
                >
                  Equalize to Largest
                </ButtonGhost>
              </Row>

              <ProceedButton
                type="submit"
                onClick={startStreamingRun}
                disabled={isRunning || classes.length === 0}
              >
                {isRunning ? "RUNNING..." : "START"}
              </ProceedButton>
              <StopButton disabled>STOP</StopButton>
              {/* Time elapsed */}
              <StatTile>
                <Hourglass
                  style={{ width: 22, height: 22, color: "#8c8d91ff" }}
                />
                <Pill>Time Elapsed</Pill>
                <StatValue>
                  {isRunning
                    ? elapsedLive.toFixed(0)
                    : (finalElapsedSec ?? 0).toFixed(0)}
                </StatValue>
                <StatUnits>sec</StatUnits>
              </StatTile>

              {/* RAM usage */}
              <StatTile>
                <CpuIcon
                  style={{ width: 22, height: 22, color: "#8c8d91ff" }}
                />
                <Pill>RAM Usage</Pill>
                <StatValue>{ramMb ? ramMb.toFixed(1) : "—"}</StatValue>
                <StatUnits>mb</StatUnits>
              </StatTile>
            </InputsSection>

            {/* RIGHT: Progress + Status + Table */}
            <AugProgressSection>
              <AugUpperSection>
                <AugUpperSectionLeft>
                  <AugUpperLeftHeader>Augmentation Progress</AugUpperLeftHeader>
                  <AugProgressChart
                    type="circle"
                    percent={Math.round(progressPercent)}
                    size={120}
                  />
                </AugUpperSectionLeft>

                <AugUpperSectionRight>
                  {/* counter FIRST */}
                  <StatCard>
                    <ImageCountHeading
                      style={{ boxShadow: "none", background: "#eaf0f7" }}
                    >
                      New Images Generated
                    </ImageCountHeading>
                    <ImageCount style={{ marginTop: 4 }}>
                      {imagesGenerated ?? "—"}
                    </ImageCount>
                    {isRunning && (
                      <Stack
                        spacing={2}
                        direction="row"
                        alignItems="center"
                        style={{ marginTop: 6 }}
                      >
                        <CircularProgress size="1rem" />
                      </Stack>
                    )}
                  </StatCard>

                  {/* status SECOND */}
                  <AugUpperRightHeader>Status</AugUpperRightHeader>
                  <StatusIndicatorBar>
                    <Dot color="#75f97d" />
                    <StatusText>
                      {isRunning
                        ? phase === "index"
                          ? "Indexing ..."
                          : phase === "augment"
                          ? "Augmenting ..."
                          : "Running ..."
                        : "Idle"}
                    </StatusText>
                  </StatusIndicatorBar>
                  <StatusIndicatorBar>
                    <Dot color="#ff3333" />
                    <StatusText>
                      {isRunning ? "Will stop when done ..." : "Stopped ..."}
                    </StatusText>
                  </StatusIndicatorBar>
                </AugUpperSectionRight>
              </AugUpperSection>

              <TableWrap>
                <ClassTable>
                  <thead>
                    <tr>
                      <th>Class</th>
                      <th># Images</th>
                      <th>Target (count)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ padding: 10, color: "#888" }}>
                          Click “Scan Classes” to load class names and counts.
                        </td>
                      </tr>
                    ) : (
                      classes.map((r) => (
                        <tr key={r.name}>
                          <td>{r.name}</td>
                          <td>{r.imageCount}</td>
                          <td>
                            <input
                              type="number"
                              value={r.target}
                              onChange={(e) =>
                                setRowTarget(r.name, Number(e.target.value))
                              }
                              style={{
                                width: 120,
                                height: 32,
                                borderRadius: 8,
                                border: "none",
                                paddingLeft: 10,
                                boxShadow:
                                  "0px 3px 13px 0px rgba(89, 89, 89, 0.1)",
                              }}
                            />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </ClassTable>
              </TableWrap>
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

export default EnhancedClassSpecific;
