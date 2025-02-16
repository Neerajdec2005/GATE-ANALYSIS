import Feedback from "./components/Feedback";

function App() {
  return (
    <>
      <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-3 mb-4 rounded">
  <a href="https://gate-analysis.vercel.app/" className="text-decoration-none"><span className="navbar-brand fw-bold">Exam Tracker</span></a>
  <div className="d-flex gap-3"> <br />
    <a href="#" className="text-dark text-decoration-none">Explore</a>
    <a href="https://gate-analyze.vercel.app/" className="text-dark text-decoration-none">Analysis</a>
    <a href="#" className="text-dark text-decoration-none">Feedback</a>
  </div>
</nav>
        <Feedback />
      </div>
    </>
  );
}

export default App;
