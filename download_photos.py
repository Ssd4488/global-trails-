import os
import requests
from PIL import Image
from io import BytesIO

# --- CONFIGURATION ---
ACCESS_KEY = '3Ksv1KdhiuagmtUgQaEEkkDpLm4knPV_QEiEprydeaw' # Paste your key here
SAVE_DIR = './public/images/destinations'
IMAGE_WIDTH = 1200 # Professional width for web

# List of your destinations
destinations = [
    "Spiti Valley Landscapes",
    "Lakshadweep Islands",
    "Khajuraho Temples",
    "Sikkim Himalayas",
    "Sundarbans Mangrove",
    "Amritsar Golden Temple",
    "Ooty Nilgiri Hills",
    "Tuscany Vineyards",
    "Abu Dhabi Grand Mosque",
    "Kyoto Cherry Blossoms",
    "Reykjavik Northern Lights",
    "Petra Jordan",
    "Galapagos Wildlife",
    "Hawaii Volcanoes",
    "Amsterdam Canals"
]

# Ensure directory exists
if not os.path.exists(SAVE_DIR):
    os.makedirs(SAVE_DIR)

def download_and_process(query):
    print(f"Searching for: {query}...")
    
    # 1. Search Unsplash API
    url = f"https://api.unsplash.com/search/photos?query={query}&client_id={ACCESS_KEY}&orientation=landscape"
    response = requests.get(url).json()
    
    if not response['results']:
        print(f"X No photos found for {query}")
        return

    img_url = response['results'][0]['urls']['regular']
    img_data = requests.get(img_url).content
    
    # 2. Process and Resize with Pillow
    img = Image.open(BytesIO(img_data))
    
    # Calculate aspect ratio
    w_percent = (IMAGE_WIDTH / float(img.size[0]))
    h_size = int((float(img.size[1]) * float(w_percent)))
    
    img = img.resize((IMAGE_WIDTH, h_size), Image.Resampling.LANCZOS)
    
    # 3. Save and Rename
    filename = query.lower().replace(" ", "-") + ".jpg"
    save_path = os.path.join(SAVE_DIR, filename)
    
    img.save(save_path, "JPEG", quality=85) # Optimized quality
    print(f"✓ Saved to {save_path}")

# Run for all
for dest in destinations:
    download_and_process(dest)

print("\nAll 15 photos downloaded and optimized for GlobeTrails!")