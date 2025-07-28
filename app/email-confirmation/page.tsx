'use client'

import React, { useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


function isMobileBrowser() {
  if (typeof window === "undefined") return false;
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
    navigator.userAgent
  );
}

export default function EmailConfirmation() {
  const [status, setStatus] = useState("loading");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileBrowser());
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setStatus("error");
      return;
    }

    console.log("Confirming email with token:", token);

    fetch(`${apiUrl}/auth/confirm-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        console.log("Email confirmation response:", res);
        if (res.ok) {
          setStatus("success");
        } else {
          const data = await res.json();
          setStatus(data.error === "EXPIRED" ? "expired" : "error");
        }
      })
      .catch(() => setStatus("error"));
  }, []);

  const appDeepLink = "nemory://";

  return (
    <div className="email-confirmation">
      {status === "loading" && <p>Підтверджуємо email...</p>}
      {status === "success" && (
        <div>
          <h2>Пошта успішно підтверджена!</h2>
          <p>Тепер ви можете користуватись всіма можливостями сервісу.</p>
          {isMobile && (
            <button
              onClick={() => {
                window.location.href = appDeepLink;
              }}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: "8px",
                background: "#0070f3",
                color: "#fff",
                border: "none",
              }}
            >
              Відкрити застосунок
            </button>
          )}
        </div>
      )}
      {status === "expired" && (
        <div>
          <h2>Термін дії посилання вичерпано</h2>
          <p>Спробуйте надіслати запит на підтвердження ще раз.</p>
        </div>
      )}
      {status === "error" && (
        <div>
          <h2>Помилка підтвердження email</h2>
          <p>Посилання некоректне або вже використане.</p>
        </div>
      )}
    </div>
  );
}