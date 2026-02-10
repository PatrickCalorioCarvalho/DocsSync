import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";

type UploadResponse = {
  url: string;
  markdown: string;
};

export default function AssetsUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<UploadResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [baseUrl, setBaseUrl] = useState<string>("");
  const [generateOcr, setGenerateOcr] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin || "");
    }
  }, []);

  async function uploadImage(image: File) {
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", image);
    if (baseUrl) formData.append("base_url", baseUrl);
    formData.append("generate_ocr", generateOcr ? "true" : "false");

    try {
      const res = await fetch("/api/assets/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Erro ao enviar imagem");
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      uploadImage(e.target.files[0]);
    }
  }

  useEffect(() => {
    function handlePaste(e: ClipboardEvent) {
      if (!e.clipboardData) return;

      const item = Array.from(e.clipboardData.items).find(
        (i) => i.type.startsWith("image/")
      );

      if (item) {
        const pastedFile = item.getAsFile();
        if (pastedFile) {
          uploadImage(pastedFile);
        }
      }
    }

    window.addEventListener("paste", handlePaste);
        return () => window.removeEventListener("paste", handlePaste);
    }, []);

    return (
    <Layout title="Upload de Assets" description="Upload de imagens para documentação">
        <main className="asset-upload-container">
        <h1>📤 Upload de Imagem</h1>
        <p className="subtitle">
            Selecione uma imagem ou cole com <strong>Ctrl + V</strong>
        </p>

        {/* OCR selector moved above upload box */}
        <div style={{display:'flex',justifyContent:'center',marginBottom:12}}>
          <div style={{display:'inline-flex',border:'1px solid #d0d7de',borderRadius:24,overflow:'hidden'}} role="tablist" aria-label="OCR selector">
            <button
              type="button"
              onClick={() => setGenerateOcr(true)}
              aria-pressed={generateOcr}
              style={{
                padding: '8px 14px',
                border: 'none',
                background: generateOcr ? '#0b63ff' : 'transparent',
                color: generateOcr ? '#fff' : '#111',
                cursor: 'pointer'
              }}
            >
              OCR: Ativado
            </button>
            <button
              type="button"
              onClick={() => setGenerateOcr(false)}
              aria-pressed={!generateOcr}
              style={{
                padding: '8px 14px',
                border: 'none',
                background: !generateOcr ? '#0b63ff' : 'transparent',
                color: !generateOcr ? '#fff' : '#111',
                cursor: 'pointer'
              }}
            >
              OCR: Desativado
            </button>
          </div>
        </div>

        <label className="upload-box">
            <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            hidden
            />
            <div className="upload-content">
            <span className="upload-icon">🖼️</span>
            <span className="upload-text">Clique para selecionar uma imagem</span>
            <span className="upload-hint">ou cole da área de transferência</span>
            </div>
        </label>

        {loading && <p className="loading">⏳ Processando imagem…</p>}
        {error && <p className="error">{error}</p>}

        {result && (
            <div className="result-box">
                <div className="markdown-header">
                <h2>📄 Markdown gerado</h2>
                <button
                    className="copy-button"
                    onClick={() => navigator.clipboard.writeText(result.markdown)}
                >
                    📋 Copiar
                </button>
                </div>

                <pre className="markdown-preview">
                <code>{result.markdown}</code>
                </pre>
            </div>
        )}
        </main>
    </Layout>
    );
}
