#!/bin/bash

# Find all .tsx files in the src directory
find src -name "*.tsx" | while read file; do
  # Check if the file already has an import statement for React
  if ! grep -q "import React" "$file"; then
    echo "Adding React import to $file"
    
    # Create a temporary file
    temp_file=$(mktemp)
    
    # Add the import statement at the top and append the rest of the file
    echo 'import React from "react";' > "$temp_file"
    cat "$file" >> "$temp_file"
    
    # Replace the original file with the temporary file
    mv "$temp_file" "$file"
  else
    echo "React already imported in $file"
  fi
done

echo "Finished adding React imports to .tsx files"

