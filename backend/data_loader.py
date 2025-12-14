import pandas as pd

URL = "https://raw.githubusercontent.com/owid/co2-data/master/owid-co2-data.csv"

SECTOR_COLUMNS = {
    "Coal": "coal_co2",
    "Oil": "oil_co2",
    "Gas": "gas_co2",
    "Cement": "cement_co2",
    "Flaring": "flaring_co2",
    "Other Industry": "other_industry_co2",
}

def load_emissions(year: int | None = None, sector: str | None = None):
    df = pd.read_csv(URL)

    # Use global aggregate
    df = df[df["country"] == "World"]

    if year:
        df = df[df["year"] == year]

    records = []

    for label, column in SECTOR_COLUMNS.items():
        if column not in df.columns:
            continue

        value = df[column].sum()
        if pd.isna(value) or value == 0:
            continue

        records.append({
            "sector": label,
            "emissions": round(value, 2)  # already in MtCO₂
        })

    if sector and sector != "All":
        records = [r for r in records if r["sector"] == sector]

    return records
