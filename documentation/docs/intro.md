---
sidebar_position: 1
---

# Quick Start

``` mermaid
flowchart LR
    CLI[DocsSync CLI] -->|Upload / Sync| ASSETS[Assets Service - FastAPI]
    ASSETS -->|Processamento AI| MODELS[Modelos AI<br/>BLIP / OCR]
    ASSETS -->|Armazena / Lê| DATA[(Volume /data)]
    CLI -->|Atualiza Docs| DOCS[Docusaurus]
    DOCS -->|Consome Assets| ASSETS
```