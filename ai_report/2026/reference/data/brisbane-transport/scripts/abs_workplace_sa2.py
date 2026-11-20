"""Extract 2021 Census employed persons by workplace SA2 in Greater Brisbane."""

import csv
import io
import json
from pathlib import Path
from zipfile import ZipFile


def main():
    root = Path(__file__).resolve().parents[1]
    raw = root / "raw" / "abs"
    geography = json.loads((raw / "sa2_3gbri_2021.json").read_text(encoding="utf-8"))
    if geography.get("exceededTransferLimit"):
        raise ValueError("ABS geography query returned an incomplete result")

    names = {
        feature["attributes"]["sa2_code_2021"]: feature["attributes"]["sa2_name_2021"]
        for feature in geography["features"]
    }
    member = (
        "2021 Census WPP Statistical Area 2 for QLD/"
        "2021Census_W01B_QLD_POW_SA2.csv"
    )
    with ZipFile(raw / "2021_WPP_SA2_for_QLD_short-header.zip") as archive:
        with archive.open(member) as data:
            rows = csv.DictReader(io.TextIOWrapper(data, encoding="utf-8-sig"))
            counts = {
                row["POW_SA2_CODE_2021"]: int(row["P_Tot_Tot"])
                for row in rows
            }

    ranked = sorted(names, key=lambda code: (-counts[code], code))
    output = root / "derived" / "employment_workplace_sa2_2021.csv"
    with output.open("w", encoding="utf-8", newline="") as data:
        writer = csv.writer(data)
        writer.writerow(["sa2_code_2021", "sa2_name_2021", "employed_persons"])
        writer.writerows((code, names[code], counts[code]) for code in ranked)


if __name__ == "__main__":
    main()
