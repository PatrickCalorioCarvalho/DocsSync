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

  async function uploadImage(image: File) {
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await fetch("http://localhost:8000/assets/upload", {
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
