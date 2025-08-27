import React from "react";

export default function Footer() {
  return (
    <footer className="app-footer text-center text-muted">
      <small>
        Built for DevOps/AIOps demo • {new Date().getFullYear()}
      </small>
    </footer>
  );
}
