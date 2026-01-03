import re
import sys
import glob

def parse_front_matter(mdx_content):
    """Extract front matter from MDX file"""
    match = re.search(r'^---\n(.*?)\n---', mdx_content, re.DOTALL)
    if not match:
        return {}
    
    front_matter = {}
    content = match.group(1)
    
    # Parse speakers array
    speakers_match = re.search(r'speakers:\s*\n((?:- .+\n?)+)', content)
    if speakers_match:
        speakers_text = speakers_match.group(1)
        speakers = re.findall(r'- (.+)', speakers_text)
        front_matter['speakers'] = speakers
    
    return front_matter

def parse_speakers_file(speakers_content):
    """Parse the speakers mapping file and reverse it (slug -> name)"""
    slug_to_name = {}
    for line in speakers_content.strip().split('\n'):
        match = re.match(r"'(.+?)':'(.+?)'", line)
        if match:
            name, slug = match.groups()
            slug_to_name[slug] = name  # Reverse: slug is key, name is value
    return slug_to_name

def lookup_speakers(mdx_file, slug_to_name_map):
    """Lookup speakers for a single MDX file"""
    try:
        with open(mdx_file, 'r') as f:
            mdx_content = f.read()
    except FileNotFoundError:
        print(f"Error: File '{mdx_file}' not found")
        return
    
    # Parse content
    front_matter = parse_front_matter(mdx_content)
    
    # Print results
    if 'speakers' in front_matter:
        print(f"\n{mdx_file}:")
        for speaker_slug in front_matter['speakers']:
            if speaker_slug in slug_to_name_map:
                print(f"  {speaker_slug} → {slug_to_name_map[speaker_slug]}")
            else:
                print(f"  {speaker_slug} → NOT FOUND in speakers file")
    else:
        print(f"\n{mdx_file}: No speakers found")

def main():
    """Main function to process files"""
    if len(sys.argv) < 3:
        print("Usage: python speaker_lookup.py <speakers_file> <mdx_files...>")
        print("Example: python speaker_lookup.py speakers.txt *.mdx")
        print("Example: python speaker_lookup.py speakers.txt file1.mdx file2.mdx")
        sys.exit(1)
    
    speakers_file = sys.argv[1]
    mdx_patterns = sys.argv[2:]
    
    # Read and parse speakers file
    try:
        with open(speakers_file, 'r') as f:
            speakers_content = f.read()
    except FileNotFoundError:
        print(f"Error: Speakers file '{speakers_file}' not found")
        sys.exit(1)
    
    speakers_map = parse_speakers_file(speakers_content)
    
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
    for mdx_file in mdx_files:
        lookup_speakers(mdx_file, speakers_map)

# Example usage
if __name__ == "__main__":
    main()
