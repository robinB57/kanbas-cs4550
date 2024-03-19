import ModuleList from "../Modules/List";

export default function Home() {
  return (
    <div className="d-flex">
      <div className="flex-fill">
        <h2>Home</h2>
        <ModuleList />
      </div>
      <div style={{ width: "250px" }}>
        <h2>Status</h2>
      </div>
    </div>
  );
}
