"use client";

import { useState } from "react";
import { useActivityStore } from "@/lib/useActivityStore";

export default function TestResetButton() {
  const resetWeeklyProgress = useActivityStore(
    (state) => state.resetWeeklyProgress
  );
  const activities = useActivityStore((state) => state.activities);
  const weeklyHistory = useActivityStore((state) => state.weeklyHistory);
  const [lastReset, setLastReset] = useState<string | null>(null);
  const [showDebugInfo, setShowDebugInfo] = useState(false);

  const handleTestReset = () => {
    console.log("État avant reset:", activities);
    console.log("Historique avant reset:", weeklyHistory);

    resetWeeklyProgress();

    console.log("État après reset:", useActivityStore.getState().activities);
    console.log(
      "Historique après reset:",
      useActivityStore.getState().weeklyHistory
    );

    setLastReset(new Date().toLocaleTimeString());
  };

  return (
    <div
      className="test-reset-panel"
      style={{
        margin: "20px 0",
        padding: "15px",
        border: "1px dashed #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <button
        onClick={handleTestReset}
        style={{
          padding: "8px 16px",
          backgroundColor: "#6366f1",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Tester la réinitialisation hebdomadaire
      </button>

      {lastReset && (
        <p style={{ margin: "10px 0 0", fontSize: "14px" }}>
          Dernier test effectué à {lastReset}
        </p>
      )}

      <button
        onClick={() => setShowDebugInfo(!showDebugInfo)}
        style={{
          padding: "6px 12px",
          backgroundColor: "transparent",
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginTop: "10px",
          cursor: "pointer",
        }}
      >
        {showDebugInfo ? "Masquer les détails" : "Afficher les détails"}
      </button>

      {showDebugInfo && (
        <div style={{ marginTop: "10px" }}>
          <h4 style={{ fontSize: "16px", marginBottom: "8px" }}>État actuel</h4>
          <div style={{ fontSize: "14px" }}>
            <p>Nombre d&apos;activités: {activities.length}</p>
            <p>Entrées d&apos;historique: {weeklyHistory.length}</p>
            {weeklyHistory.length > 0 && (
              <div>
                <p>Dernière entrée d&apos;historique:</p>
                <pre
                  style={{
                    background: "#eee",
                    padding: "8px",
                    fontSize: "12px",
                    overflow: "auto",
                    maxHeight: "200px",
                    borderRadius: "4px",
                  }}
                >
                  {JSON.stringify(
                    weeklyHistory[weeklyHistory.length - 1],
                    null,
                    2
                  )}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
