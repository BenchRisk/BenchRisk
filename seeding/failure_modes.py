import csv
import os
import yaml

# Path to your CSV file
CSV_FILE = "data/FailureModeRegistryV0.5.2.csv"
# Output directory for the MDX files
OUTPUT_DIR = "res/failure-modes"

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ID,Stage,Number,Category,Failure Mode,Severity,Example Realization,Reference
with open(CSV_FILE, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:

        number = int(row['ID'].split("#")[1])
        filepath = os.path.join(OUTPUT_DIR, f"{number}.mdx")

        if number == 60:
            exit()

        data = {
            "number": number,
            "dateAdded": "2025-04-01",
            "dateUpdated": "2025-04-01",
            "short": row['Failure Mode'].strip(),
            "example": row['Example Realization'].strip(),
            "severity": float(row['Severity'].strip()),
            "stage": row['Stage'].strip(),
            "dimension": row['Category'].strip(),
            "about": "todo"
        }

        # Write the MDX file
        frontmatter = yaml.dump(data, allow_unicode=True, sort_keys=False)
        with open(filepath, 'w', encoding='utf-8') as mdxfile:
            mdxfile.write("---\n")
            mdxfile.write(f"{frontmatter}")
            mdxfile.write("---\n")
            mdxfile.write("\ntodo")
