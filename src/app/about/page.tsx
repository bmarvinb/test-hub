"use client";

export default function AboutPage() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/contact", {
      method: "POST",
    });
    const response = await res.json();
    console.log("res", response);
  };

  return (
    <div>
      <h1>About page</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
