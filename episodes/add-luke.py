import re
import sys
import glob

def add_speaker_to_mdx(file_path, speaker_slug):
    """Add a speaker to the MDX file's front matter"""
    try:
        with open(file_path, 'r') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found")
        return False
    
    # Find the front matter
    match = re.search(r'^---\n(.*?\n)---', content, re.DOTALL)
    if not match:
        print(f"Warning: No front matter found in {file_path}")
        return False
    
    front_matter = match.group(1)
    
    # Check if speakers section exists
    speakers_match = re.search(r'speakers:\s*\n((?:- .+\n?)+)', front_matter)
    
    if speakers_match:
        # Speakers section exists - check if speaker already present
        speakers_text = speakers_match.group(1)
        if f"- {speaker_slug}" in speakers_text:
            print(f"Skipped (already has speaker): {file_path}")
            return False
        
        # Add new speaker to existing list
        new_speakers = speakers_text.rstrip() + f"\n- {speaker_slug}\n"
        new_front_matter = front_matter.replace(speakers_text, new_speakers)
    else:
        # No speakers section - add it before the closing ---
        new_front_matter = front_matter.rstrip() + f"\nspeakers:\n- {speaker_slug}\n"
    
    # Replace the front matter in the content
    new_content = content.replace(f"---\n{front_matter}---", f"---\n{new_front_matter}---")
    
    # Write back to file
    try:
        with open(file_path, 'w') as f:
            f.write(new_content)
        print(f"Updated: {file_path}")
        return True
    except Exception as e:
        print(f"Error writing to {file_path}: {e}")
        return False

def extract_episode_number(filename):
    """Extract episode number from filename"""
    match = re.match(r'(\d+)', filename)
    if match:
        return int(match.group(1))
    return None

def main():
    """Main function to process files 1-72"""
    speaker_slug = "jeffrey-luke-watson"
    
    # Find all MDX files
    all_mdx_files = glob.glob("*.mdx")
    
    if not all_mdx_files:
        print("No MDX files found in current directory")
        sys.exit(1)
    
    # Filter files 1-72
    files_to_update = []
    for file in all_mdx_files:
        episode_num = extract_episode_number(file)
        if episode_num is not None and 1 <= episode_num <= 72:
            files_to_update.append(file)
    
    if not files_to_update:
        print("No files numbered 1-72 found")
        sys.exit(1)
    
    # Sort files by episode number
    files_to_update.sort(key=lambda f: extract_episode_number(f))
    
    print(f"Found {len(files_to_update)} files numbered 1-72")
    print(f"Adding speaker: {speaker_slug}\n")
    
    # Process each file
    updated_count = 0
    for mdx_file in files_to_update:
        if add_speaker_to_mdx(mdx_file, speaker_slug):
            updated_count += 1
    
    print(f"\nSummary: Updated {updated_count} of {len(files_to_update)} files")

if __name__ == "__main__":
    main()
