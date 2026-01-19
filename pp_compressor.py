from PIL import Image
import io

def compress_profile_image(input_path, output_path):
    img = Image.open(input_path)

    # Convert to RGB (important for PNGs)
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")

    # Resize
    img.thumbnail((300, 300))

    # Save compressed
    img.save(
        output_path,
        format="WEBP",   # or "JPEG"
        quality=75,
        optimize=True
    )

# Example usage
#compress_profile_image("original.png", "profile.webp")
