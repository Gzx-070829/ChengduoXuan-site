"use client";

const ISSUE_URL = "https://github.com/Gzx-070829/ChengduoXuan-site/issues/new";

export default function FeedbackPage() {
  const handleGiveFeedback = () => {
    const currentUrl = window.location.href;
    const params = new URLSearchParams({
      title: "Website feedback",
      body: `### Feedback\n\nPlease share your suggestions below.\n\n---\nSource page: ${currentUrl}`,
    });

    window.location.href = `${ISSUE_URL}?${params.toString()}`;
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Feedback</h1>
      <p>欢迎告诉我你对网站的优化建议，我会认真阅读并持续改进。</p>

      <button
        type="button"
        onClick={handleGiveFeedback}
        style={{
          marginTop: 24,
          padding: "10px 16px",
          borderRadius: 8,
          border: "1px solid #ddd",
          background: "#fff",
          cursor: "pointer",
          fontSize: 16,
        }}
      >
        Give Feedback
      </button>
    </main>
  );
}
