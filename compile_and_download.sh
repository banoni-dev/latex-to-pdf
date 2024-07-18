#!/bin/bash

FILENAME="sample.tex"  # Replace with your actual LaTeX file name
OUTPUT_DIR="/home/ahmed/my_stuff/projects/latex-to-pdf/output"
SERVER_URL="http://localhost:3000"  # Replace with your server URL

# Ensure output directory exists and has write permissions
mkdir -p "$OUTPUT_DIR"
chmod -R u+w "$OUTPUT_DIR"

# Upload file and retrieve PDF output
RESPONSE=$(curl -s -F "file=@$FILENAME" "$SERVER_URL/compile")
PDF_FILE=$(echo "$RESPONSE" | grep -oP '(?<=filename=").+?(?=")')

if [ -n "$PDF_FILE" ]; then
    # Download the PDF file using the actual filename
    curl -o "$OUTPUT_DIR/$PDF_FILE" "$SERVER_URL/uploads/$PDF_FILE"

    # Optionally, clean up temporary files
    rm -f "$OUTPUT_DIR"/*.aux "$OUTPUT_DIR"/*.log "$OUTPUT_DIR"/*.out

    echo "PDF downloaded to $OUTPUT_DIR/$PDF_FILE"
else
    echo "Error: Could not retrieve PDF filename from server response."
fi
