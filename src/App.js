import "./tokens.css";
import { useState } from "react";
import VibeSelect from "./VibeSelect";
import Upload from "./Upload";
import PoseStudio from "./PoseStudio";
import YourBoard from "./YourBoard";
import {
  createProject,
  uploadPhotos,
  analyzePhotos,
  getPoses,
  composeBoard,
} from "./api";

function App() {
  const [screen, setScreen] = useState("vibe");

  // data the app remembers between screens
  const [vibe, setVibe] = useState("");
  const [group, setGroup] = useState("");
  const [projectId, setProjectId] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [analysis, setAnalysis] = useState([]);
  const [poses, setPoses] = useState([]);
  const [slides, setSlides] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // run any backend call with loading + error handling
  async function run(fn) {
    setError("");
    setLoading(true);
    try {
      await fn();
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // Screen 1: user picked vibe + group and clicked Continue
  function handleVibeContinue() {
    if (!vibe || !group) {
      setError("Pick a vibe and who you're shooting with first.");
      return;
    }
    run(async () => {
      const project = await createProject(vibe, group);
      setProjectId(project._id);
      setScreen("upload");
    });
  }

  // Screen 2: user chose photos and clicked Next. files = array of File objects
  function handleUploadNext(files) {
    if (!files || files.length === 0) {
      setError("Choose at least one photo.");
      return;
    }
    run(async () => {
      const up = await uploadPhotos(projectId, files);
      setPhotos(up.assets);

      // analysis is a bonus; don't block the flow if it fails
      try {
        const a = await analyzePhotos(projectId);
        setAnalysis(a.analysis);
      } catch (e) {
        console.warn("Analyze failed:", e.message);
      }

      const p = await getPoses(vibe, group);
      setPoses(p.poses);
      setScreen("pose");
    });
  }

  // Screen 3: user clicked "Make my board"
  function handleMakeBoard() {
    run(async () => {
      const board = await composeBoard(projectId);
      setSlides(board.slides);
      setScreen("board");
    });
  }

  function handleStartOver() {
    setVibe("");
    setGroup("");
    setProjectId(null);
    setPhotos([]);
    setAnalysis([]);
    setPoses([]);
    setSlides([]);
    setError("");
    setScreen("vibe");
  }

  // nav buttons: only allow screens whose data exists
  function go(target) {
    setError("");
    if (target === "upload" && !projectId) return setError("Choose your vibe first.");
    if (target === "pose" && poses.length === 0) return setError("Upload photos first.");
    if (target === "board" && slides.length === 0) return setError("Generate your board first.");
    setScreen(target);
  }

  return (
    <div>
      <nav>
        <h2>VYBE ●</h2>
        <button onClick={() => go("vibe")}>Vibe</button>
        <button onClick={() => go("upload")}>Upload</button>
        <button onClick={() => go("pose")}>Pose Studio</button>
        <button onClick={() => go("board")}>Your Board</button>
      </nav>

      {error && <p role="alert">{error}</p>}
      {loading && <p>Working on it… the first request can take up to a minute while the server wakes up.</p>}

      {screen === "vibe" && (
        <VibeSelect
          vibe={vibe}
          group={group}
          setVibe={setVibe}
          setGroup={setGroup}
          onContinue={handleVibeContinue}
          loading={loading}
        />
      )}
      {screen === "upload" && (
        <Upload photos={photos} onNext={handleUploadNext} loading={loading} />
      )}
      {screen === "pose" && (
        <PoseStudio
          poses={poses}
          analysis={analysis}
          onMakeBoard={handleMakeBoard}
          loading={loading}
        />
      )}
      {screen === "board" && (
        <YourBoard slides={slides} onStartOver={handleStartOver} loading={loading} />
      )}
    </div>
  );
}

export default App;