import csv
import os
import yaml

# Path to your CSV file
CSV_FILE = "data/MitigationRegistryV0.5.2.csv"
# Output directory for the MDX files
OUTPUT_DIR = "res/mitigations"

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Risk ID Mitigated,Mitigation Number,Reduction in Likelihood (Percent),Reduction in Severity (Percent),Risk Short Description,Response Measure Description,Notes,Reformatted as a Question
with open(CSV_FILE, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:

        mitigationNumber = int(row['Mitigation Number'])
        mitigatedNumber = int(row['Risk ID Mitigated'].split("#")[1])

        #mitigatedNumber = "modes/" + str(mitigatedNumber) + ".mdx"

        filepath = os.path.join(OUTPUT_DIR, f"{mitigationNumber}.mdx")

        data = {
            "mitigationNumber": mitigationNumber,
            "mitigatedNumber": mitigatedNumber,
            "dateAdded": "2025-04-01",
            "dateUpdated": "2025-04-01",
            "severityReductionPercent": float(row['Reduction in Severity (Percent)'].strip()),
            "likelihoodReductionPercent": float(row['Reduction in Likelihood (Percent)'].strip()),
            "questionStatement": row['Reformatted as a Question'].strip()
        }

        # Write the MDX file
        frontmatter = yaml.dump(data, allow_unicode=True, sort_keys=False)
        with open(filepath, 'w', encoding='utf-8') as mdxfile:
            mdxfile.write("---\n")
            mdxfile.write(f"{frontmatter}")
            mdxfile.write("---\n")
            mdxfile.write("\ntodo")
