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

def main():
    """Main function to process files"""
    if len(sys.argv) < 2:
        print("Usage: python add_speaker.py <mdx_files...>")
        print("Example: python add_speaker.py *.mdx")
        print("Example: python add_speaker.py file1.mdx file2.mdx")
        sys.exit(1)
    
    mdx_patterns = sys.argv[1:]
    speaker_slug = "ethan-carter-edwards"
    
    # Expand glob patterns and process files
    mdx_files = []
    for pattern in mdx_patterns:
        matched_files = glob.glob(pattern)
        if matched_files:
            mdx_files.extend(matched_files)
        else:
            # If no glob match, treat as literal filename
            mdx_files.append(pattern)
    
    if not mdx_files:
        print("No MDX files found")
        sys.exit(1)
    
    # Process each file
    updated_count = 0
    for mdx_file in mdx_files:
        if add_speaker_to_mdx(mdx_file, speaker_slug):
            updated_count += 1
    
    print(f"\nSummary: Updated {updated_count} of {len(mdx_files)} files")

if __name__ == "__main__":
    main()
