import csv
import os
import yaml

# Path to your CSV file
CSV_FILE_DIRECTORY = "data/scores/"
# Output directory for the MDX files
OUTPUT_DIR = "res/scores"

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

# return all files as a list
score_files = []
for file in os.listdir(CSV_FILE_DIRECTORY):
     # check the files which are end with specific extension
    if file.endswith(".csv"):
        # print path name of selected files
       score_files.append(file)

def is_non_empty(value):
    """Check if the value is not empty."""
    return value.strip() != ""

for score_file in score_files:
    name = score_file.split(".")[-2].split(" ")[-1]
    print(name)
    with open(CSV_FILE_DIRECTORY + score_file, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        adoptedMitigations = []
        absentMitigations = []
        for row in reader:
            rowMitigations = set(map(int, filter(is_non_empty, row['Adopted Mitigation(s)'].strip().split(","))))
            rowAbsentMitigations = set(map(int, row['Available Mitigations'].strip().split(",")))
            adoptedMitigations += list(rowMitigations)
            absentMitigations += list(rowAbsentMitigations.difference(rowMitigations))

        filepath = os.path.join(OUTPUT_DIR, f"{name}.mdx")

        #adoptedMitigations = list(map(lambda x: "mitigations/" + str(x) + ".mdx", adoptedMitigations))
        #absentMitigations = list(map(lambda x: "mitigations/" + str(x) + ".mdx", absentMitigations))
        data = {
            "name": name,
            "adoptedMitigations": adoptedMitigations,
            "absentMitigations": absentMitigations,
            "benchmarkDescription": "todo",
            "dateScored": "2025-04-01",
            "reference": "todo",
        }

        # Write the MDX file
        frontmatter = yaml.dump(data, allow_unicode=True, sort_keys=False)
        with open(filepath, 'w', encoding='utf-8') as mdxfile:
            mdxfile.write("---\n")
            mdxfile.write(f"{frontmatter}")
            mdxfile.write("---\n")
            mdxfile.write("\ntodo")
