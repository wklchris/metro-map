import os
import pandas as pd
import json

ENCODING = 'utf-8'
process_dir = "process"
output_dir = os.path.join("docs", "data")
process_project = "shmetro"

# Load CSV
csv_station = os.path.join(process_dir, process_project + '-stations.csv')
df_station = pd.read_csv(csv_station, encoding=ENCODING)

# Remove NAN in CSV rows. Use station string as JSON keys.
station_dict = dict()
for _, row in df_station.iterrows():
    v_dict = row.dropna().to_dict()
    k = v_dict.pop('name')
    station_dict[k] = v_dict

# Save to JSON file. Output to the docs/ folder.
json_station = os.path.join(output_dir, process_project + '-stations.json')
with open(json_station, 'w', encoding=ENCODING) as f:
    json.dump(station_dict, f, ensure_ascii=False)
