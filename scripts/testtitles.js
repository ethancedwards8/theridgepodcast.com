#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Converts a string to a slug (lowercase, hyphens, no special chars)
 * @param {string} str - String to slugify
 * @returns {string} - Slugified string
 */
function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_]+/g, '-')   // Replace spaces and underscores with hyphens
    .replace(/-+/g, '-')       // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '');  // Remove leading/trailing hyphens
}

/**
 * Extracts the title from YAML frontmatter
 * @param {string} content - File content
 * @returns {string|null} - Title or null if not found
 */
function extractTitle(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  
  if (!match) return null;
  
  const frontmatter = match[1];
  // Match quoted strings (single or double quotes) or unquoted values
  const titleMatch = frontmatter.match(/^title:\s*(?:['"]([^'"]+)['"]|([^\n]+))$/m);
  
  if (!titleMatch) return null;
  
  // Return either the quoted capture group or the unquoted one
  const title = (titleMatch[1] || titleMatch[2]).trim();
  return title;
}

/**
 * Validates a single MDX file
 * @param {string} filePath - Path to the MDX file
 * @returns {object} - Validation result
 */
function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath, '.mdx');
  const title = extractTitle(content);
  
  if (title === null) {
    return {
      valid: false,
      filePath,
      fileName,
      title: null,
      slugifiedTitle: null,
      message: 'No title found in frontmatter'
    };
  }
  
  const slugifiedTitle = slugify(title);
  const matches = slugifiedTitle === fileName;
  
  return {
    valid: matches,
    filePath,
    fileName,
    title,
    slugifiedTitle,
    message: matches ? 'Match' : `Mismatch: title="${title}" (slugified: "${slugifiedTitle}"), filename="${fileName}"`
  };
}

/**
 * Recursively finds all MDX files in a directory
 * @param {string} dir - Directory path
 * @returns {string[]} - Array of file paths
 */
function findMdxFiles(dir) {
  let results = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      results = results.concat(findMdxFiles(fullPath));
    } else if (item.endsWith('.mdx')) {
      results.push(fullPath);
    }
  }
  
  return results;
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('Usage: node validate-frontmatter.js <directory|file>');
    console.error('Example: node validate-frontmatter.js ./content');
    process.exit(1);
  }
  
  const target = args[0];
  let files = [];
  
  if (!fs.existsSync(target)) {
    console.error(`Error: "${target}" does not exist`);
    process.exit(1);
  }
  
  const stat = fs.statSync(target);
  
  if (stat.isDirectory()) {
    files = findMdxFiles(target);
  } else if (target.endsWith('.mdx')) {
    files = [target];
  } else {
    console.error('Error: Target must be a directory or an .mdx file');
    process.exit(1);
  }
  
  if (files.length === 0) {
    console.log('No MDX files found');
    return;
  }
  
  console.log(`Validating ${files.length} file(s)...\n`);
  
  const results = files.map(validateFile);
  const invalid = results.filter(r => !r.valid);
  
  // Print results
  if (invalid.length === 0) {
    console.log('✓ All files valid!');
  } else {
    console.log(`✗ Found ${invalid.length} issue(s):\n`);
    invalid.forEach(r => {
      console.log(`  ${r.filePath}`);
      console.log(`    ${r.message}\n`);
    });
  }
  
  // Exit with error code if any invalid
  process.exit(invalid.length > 0 ? 1 : 0);
}

main();
