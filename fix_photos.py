import os
import requests
import time

# Dictionary mapping the EXACT filename -> New search terms
updates = {
    # 1. The Photos You Want to Change
    "royal-rajasthan-heritage": "rajasthan,palace",
    "varanasi-ganges": "varanasi,india",
    "kashmir-valley": "kashmir,snow",
    "santorini-greece": "santorini,white",
    "cape-town-sa": "capetown,mountain",
    "london-uk": "london,city",
    "amritsar-golden-temple": "amritsar,temple",
    "ooty-nilgiri-hills": "ooty,hills",
    "lakshadweep-islands": "lakshadweep,ocean",

    # 2. The Broken Pages
    "darjeeling-tea-gardens": "darjeeling,tea",
    "wayanad-spice-trails": "wayanad,forest",
    "pondicherry-french-quarter": "pondicherry,architecture",
    "sundarbans-mangrove": "mangrove,forest",
    "reykjavik-northern-lights": "iceland,aurora",
    "petra-jordan": "petra,jordan",
    "galapagos-wildlife": "galapagos,turtle",
    "hawaii-volcanoes": "hawaii,volcano",
    "amsterdam-canals": "amsterdam,canal"
}

folder_path = "public/images/destinations"
os.makedirs(folder_path, exist_ok=True)

print("Starting photo update using LoremFlickr API...")

# Disguise our Python script as a normal Google Chrome browser
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

for filename, search_term in updates.items():
    print(f"Fetching new photo for: {filename}.jpg")
    
    # Using LoremFlickr API
    url = f"https://loremflickr.com/1920/1080/{search_term}/all"
    
    try:
        response = requests.get(url, headers=headers, timeout=15)
        
        if response.status_code == 200:
            filepath = os.path.join(folder_path, f"{filename}.jpg")
            with open(filepath, "wb") as f:
                f.write(response.content)
            print(f"  -> Success! Replaced {filename}.jpg")
        else:
            print(f"  -> Failed: Status code {response.status_code}")
            
    except Exception as e:
        print(f"  -> Error downloading {filename}: {e}")
        
    time.sleep(1)

print("\nUpdate complete! Restart your Next.js server.")