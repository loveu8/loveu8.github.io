"""Method of travel to work, 2016 and 2021 Census, for the 11 LGAs used in chapter 1.

Source: ABS General Community Profile DataPacks, LGA for QLD (2016 table G59, 2021 table G62),
saved in raw/abs/. Counts are employed persons aged 15+ on Census day, by place of usual residence.

Groups (person counts, "_P" columns):
- travelled: total minus worked at home, did not go to work, and not stated.
- car: one method only, car as driver or car as passenger.
- car_driver: one method only, car as driver.
- public_transport: one method train, bus, ferry or tram/light rail, plus every two-method
  combination that includes train or bus, plus three methods with train or bus.
  Two-method combinations of ferry and tram without train or bus sit in "other two methods"
  and are left out (small).
Shares are given against people who travelled to work, and against all employed.
"""

import csv
import io
from pathlib import Path
from zipfile import ZipFile

LGAS = {
    "31000": "Brisbane",
    "33430": "Gold Coast",
    "35010": "Moreton Bay",
    "34590": "Logan",
    "33960": "Ipswich",
    "36720": "Sunshine Coast",
    "36250": "Redland",
    "35740": "Noosa",
    "36510": "Scenic Rim",
    "34580": "Lockyer Valley",
    "36580": "Somerset",
}

TABLES = {
    2016: ("2016_GCP_LGA_for_QLD_short-header.zip",
           "2016 Census GCP Local Government Areas for QLD/2016Census_G59_QLD_LGA.csv",
           "LGA_CODE_2016", "One_met_Tram_incl_lt_rail_P", "Three_meth_Trn_two_othr_met_P"),
    2021: ("2021_GCP_LGA_for_QLD_short-header.zip",
           "2021 Census GCP Local Government Areas for QLD/2021Census_G62_QLD_LGA.csv",
           "LGA_CODE_2021", "One_met_Tram_or_lt_rail_P", "Three_meth_Tr_2_oth_meth_P"),
}


def groups(row, tram, three_train):
    n = lambda key: int(row[key])
    total = n("Tot_P")
    not_travelled = n("Worked_home_P") + n("Did_not_go_to_work_P") + n("Method_travel_to_work_ns_P")
    pt = (n("One_method_Train_P") + n("One_method_Bus_P") + n("One_method_Ferry_P") + n(tram)
          + n("Two_methods_Train_Tot_P") + n("Two_methods_Bus_Tot_P")
          + n(three_train) + n("Three_met_Bs_2_ot_met_ex_tr_P"))
    return {
        "employed": total,
        "worked_home": n("Worked_home_P"),
        "travelled": total - not_travelled,
        "car": n("One_method_Car_as_driver_P") + n("One_method_Car_as_passenger_P"),
        "car_driver": n("One_method_Car_as_driver_P"),
        "public_transport": pt,
    }


def main():
    root = Path(__file__).resolve().parents[1]
    out_rows = []
    for year, (zip_name, member, code_col, tram, three_train) in TABLES.items():
        with ZipFile(root / "raw" / "abs" / zip_name) as archive:
            rows = csv.DictReader(io.TextIOWrapper(archive.open(member), encoding="utf-8-sig"))
            found = {}
            for row in rows:
                code = row[code_col].removeprefix("LGA")
                if code in LGAS:
                    found[code] = groups(row, tram, three_train)
        missing = set(LGAS) - set(found)
        if missing:
            raise ValueError(f"{year}: LGA codes not found: {sorted(missing)}")
        total = {k: sum(g[k] for g in found.values()) for k in next(iter(found.values()))}
        for code, name, g in [(c, LGAS[c], found[c]) for c in LGAS] + [("", "合計（11 個地方政府）", total)]:
            out_rows.append([
                year, code, name, g["employed"], g["worked_home"], g["travelled"], g["car"], g["car_driver"],
                g["public_transport"],
                round(100 * g["car"] / g["travelled"], 1),
                round(100 * g["public_transport"] / g["travelled"], 1),
                round(100 * g["car"] / g["employed"], 1),
                round(100 * g["public_transport"] / g["employed"], 1),
                round(100 * g["worked_home"] / g["employed"], 1),
            ])
    output = root / "derived" / "travel_to_work_lga_2016_2021.csv"
    with output.open("w", encoding="utf-8", newline="") as data:
        writer = csv.writer(data)
        writer.writerow(["census_year", "lga_code", "lga_name", "employed", "worked_home", "travelled",
                         "car_only", "car_driver_only", "public_transport",
                         "car_pct_of_travelled", "pt_pct_of_travelled",
                         "car_pct_of_employed", "pt_pct_of_employed", "worked_home_pct_of_employed"])
        writer.writerows(out_rows)
    for r in out_rows:
        if r[1] in ("", "31000"):
            print(r)


if __name__ == "__main__":
    main()
