import json
import random

# Define the range of register numbers
start_reg_no = 111420104053
end_reg_no = 111420104106

# Define the list of subjects
subjects = ["MG8591", "CS8792", "CS8791", "OME752", "CS8082", "CS8711", "IT8761", "SB8034"]

# Define the grade distribution
grades = ["O", "A+", "A", "B", "B+", "U"]

# Define the percentage of O grades for specific subjects
o_percentage = {"SB8034": 0.95, "CS8711": 0.80, "IT8761": 0.90}

# Define the reduced percentage of O grades for remaining subjects
reduced_o_percentage = 0.10

# Define the percentage of U grade
u_percentage = 0.01

# Generate grades for each register number
data = {}
for reg_no in range(start_reg_no, end_reg_no + 1):
    grades_dict = {}
    for subject in subjects:
        if subject in o_percentage and random.random() < o_percentage[subject]:
            grade = "O"
        elif random.random() < reduced_o_percentage:
            grade = "O"
        elif random.random() < u_percentage:
            grade = "U"
        else:
            grade = random.choice(grades[1:])  # Exclude "O" from other subjects
        grades_dict[subject] = grade
    data[str(reg_no)] = grades_dict

# Write data to JSON file
with open("grades.json", "w") as f:
    json.dump(data, f, indent=4)

print("JSON file generated successfully!")
