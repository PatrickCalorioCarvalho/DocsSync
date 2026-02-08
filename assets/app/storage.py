from pathlib import Path

BASE_PATH = Path(__file__).resolve().parent.parent / "data"
IMAGES_PATH = BASE_PATH / "images"

IMAGES_PATH.mkdir(parents=True, exist_ok=True)

def save_image(image_bytes: bytes, image_id: str) -> Path:
    path = IMAGES_PATH / f"{image_id}.png"
    print(f"Salvando imagem em: {path}")
    with open(path, "wb") as f:
        f.write(image_bytes)
    return path

def get_image_path(image_id: str) -> Path:
    return IMAGES_PATH / f"{image_id}.png"
