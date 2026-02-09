from transformers import BlipForConditionalGeneration, BlipProcessor
from transformers import M2M100ForConditionalGeneration, M2M100Tokenizer
from pathlib import Path
import torch
from PIL import Image

BASE_PATH = Path(__file__).resolve().parent.parent / "data"
MODEL_PATH = BASE_PATH / "model"

def load_caption_model(model_name="Salesforce/blip-image-captioning-base"):
    print(f"Carregando modelo de caption: {model_name}")
    caption_model = BlipForConditionalGeneration.from_pretrained(model_name, cache_dir=MODEL_PATH)
    processor = BlipProcessor.from_pretrained(model_name, cache_dir=MODEL_PATH)
    device = torch.device("cpu")
    caption_model.to(device)
    return caption_model, processor, device


def load_translation_model(model_name="facebook/m2m100_418M"):
    print(f"Carregando modelo de tradução: {model_name}")
    translation_model = M2M100ForConditionalGeneration.from_pretrained(model_name, cache_dir=MODEL_PATH)
    translation_tokenizer = M2M100Tokenizer.from_pretrained(model_name, cache_dir=MODEL_PATH)
    return translation_model, translation_tokenizer
def describe_image_ptbr(image_path: str, caption_model, processor, device, translation_model, translation_tokenizer):
    from PIL import Image
    image = Image.open(image_path).convert("RGB")

    inputs = processor(images=image, return_tensors="pt").to(device)
    output_ids = caption_model.generate(**inputs, max_length=64, num_beams=4)
    caption_en = processor.decode(output_ids[0], skip_special_tokens=True)

    translation_tokenizer.src_lang = "en"
    encoded = translation_tokenizer(caption_en, return_tensors="pt")
    generated_tokens = translation_model.generate(
        **encoded,
        forced_bos_token_id=translation_tokenizer.get_lang_id("pt")
    )
    caption_pt = translation_tokenizer.decode(generated_tokens[0], skip_special_tokens=True)

    return caption_pt
