from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from uuid import uuid4

from app.storage import save_image, get_image_path
from app.model import describe_image_ptbr, load_caption_model, load_translation_model

app = FastAPI(title="DocsSync Assets")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

caption_model = None
processor = None
device = None
translation_model = None
translation_tokenizer = None

@app.on_event("startup")
async def startup_event():
    global caption_model, processor, device
    global translation_model, translation_tokenizer

    try:
        caption_model, processor, device = load_caption_model()
        translation_model, translation_tokenizer = load_translation_model()
        print("✅ Modelos carregados com sucesso!")
    except Exception as e:
        print(f"❌ Erro ao carregar modelos: {e}")
        import sys
        sys.exit(1)

@app.post("/assets/upload")
async def upload_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Arquivo não é imagem")

    image_id = uuid4().hex
    image_bytes = await file.read()
    image_path = save_image(image_bytes, image_id)

    ocr_text = describe_image_ptbr(
        str(image_path),
        caption_model, processor, device,
        translation_model, translation_tokenizer
    )

    image_url = f"http://localhost:8000/assets/images/{image_id}.png"

    markdown = f"![{image_id}]({image_url})<!-- {ocr_text} -->"

    return {
        "url": image_url,
        "markdown": markdown
    }

@app.get("/assets/images/{image_id}.png")
def get_image(image_id: str):
    path = get_image_path(image_id)
    if not path.exists():
        raise HTTPException(status_code=404, detail="Imagem não encontrada")
    return FileResponse(path)
