#!/usr/bin/env bash

set -e

shopt -s nullglob

for file in *.mdx; do
  filename_slug="${file%.mdx}"

  # Extract slug from frontmatter
  frontmatter_slug=$(sed -n '/^---$/,/^---$/p' "$file" \
    | grep -E '^slug:' \
    | head -n 1 \
    | sed 's/^slug:[[:space:]]*//')

  if [[ -z "$frontmatter_slug" ]]; then
    echo "❌ $file: missing slug"
    continue
  fi

  if [[ "$frontmatter_slug" != "$filename_slug" ]]; then
    echo "❌ $file: slug mismatch (slug=\"$frontmatter_slug\", filename=\"$filename_slug\")"
  else
    echo "✅ $file"
  fi
done
