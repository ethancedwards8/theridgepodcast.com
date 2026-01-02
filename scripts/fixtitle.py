import re
import sys

def format_frontmatter_title(content):
    """
    Converts multi-line frontmatter titles to single line format.
    """
    # Pattern to match the title field including continuation lines
    pattern = r"(title:\s*['\"]?)([^'\"]*(?:\\\s*[^'\"]*)*?)(['\"]?)\n"
    
    def replace_title(match):
        prefix = match.group(1)
        title_content = match.group(2)
        suffix = match.group(3)
        
        # Remove backslashes and extra whitespace
        clean_title = re.sub(r'\\\s+', ' ', title_content)
        clean_title = ' '.join(clean_title.split())
        
        return f'{prefix}{clean_title}{suffix}\n'
    
    return re.sub(pattern, replace_title, content, flags=re.MULTILINE)

# Process a file in place
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python script.py <file.md>")
        sys.exit(1)
    
    filename = sys.argv[1]
    
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        formatted = format_frontmatter_title(content)
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(formatted)
        
        print(f"Successfully formatted {filename}")
    except FileNotFoundError:
        print(f"Error: File '{filename}' not found")
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
