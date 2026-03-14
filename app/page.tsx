import Card from "./components/Card";

export default function Home() {
  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "48px", marginBottom: "12px" }}>chengduoXuan</h1>

      <p style={{ fontSize: "20px", color: "#444", marginBottom: "8px" }}>
        AI · BCI · Programming · Literature · Daily
      </p>

      <p style={{ fontSize: "18px", color: "#666", marginBottom: "32px" }}>
        A personal space for learning, projects, thoughts, and expression.
      </p>

      <section>
        <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>Columns</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          <Card
            title="AI"
            description="机器学习、深度学习、算法理解与学习笔记"
            link="/ai"
          />

          <Card
            title="BCI"
            description="脑机接口、神经工程、脑信号研究"
            link="/bci"
          />

          <Card
            title="Programming"
            description="Python、Linux、C++、JavaScript"
            link="/programming"
          />

          <Card
            title="Literature"
            description="读书、写作与文学思考"
            link="/literature"
          />

          <Card
            title="Daily"
            description="生活记录、随想与分享"
            link="/daily"
          />

          <Card
            title="Projects"
            description="Arduino、AI、小项目"
            link="/projects"
          />
        </div>
      </section>
    </main>
  );
}

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "16px",
  padding: "20px",
  backgroundColor: "#fafafa",
};