"use client";

const ISSUE_URL = "https://github.com/Gzx-070829/ChengduoXuan-site/issues/new";

export default function FeedbackPage() {
  const handleGiveFeedback = () => {
    const currentUrl = window.location.href;
    const params = new URLSearchParams({
      title: "Website feedback",
      body: `### Feedback

Please share your suggestions below.

---
Source page: ${currentUrl}`,
    });

    window.location.href = `${ISSUE_URL}?${params.toString()}`;
  };

  return (
    <main style={{ padding: 40 }}>
      <h1 style={{ marginBottom: 12 }}>Feedback</h1>
      <p style={{ color: "var(--muted-foreground)", lineHeight: 1.7, maxWidth: 760 }}>
        欢迎告诉我你对网站的优化建议，我会认真阅读并持续改进。
      </p>

      <button
        type="button"
        onClick={handleGiveFeedback}
        style={{
          marginTop: 24,
          padding: "10px 16px",
          borderRadius: 8,
          border: "1px solid var(--button-border)",
          background: "var(--button-background)",
          color: "var(--button-foreground)",
          cursor: "pointer",
          fontSize: 16,
          transition: "background-color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--button-hover-background)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "var(--button-background)";
        }}
      >
        Give Feedback
      </button>
    </main>
  );
}
