import sys
import os
import gzip
import glob
import gc
import json

# Add path to ORD schema definitions
sys.path.append(os.path.abspath("ord-schema"))
from ord_schema.proto import dataset_pb2


def load_dataset(filepath):
    """Load a .pb.gz file and parse it as a Dataset."""
    with gzip.open(filepath, "rb") as f:
        dataset = dataset_pb2.Dataset()
        dataset.ParseFromString(f.read())
    return dataset


def reaction_contains_smiles(reaction, target_smiles: str):
    """Check if a reaction contains the target SMILES string."""
    target_smiles = target_smiles.strip().lower()

    for input_comp in reaction.inputs.values():
        for component in input_comp.components:
            for identifier in component.identifiers:
                if identifier.type == identifier.SMILES and identifier.value:
                    if target_smiles in identifier.value.lower():
                        return True

    for outcome in reaction.outcomes:
        for product in outcome.products:
            for identifier in product.identifiers:
                if identifier.type == identifier.SMILES and identifier.value:
                    if target_smiles in identifier.value.lower():
                        return True

    return False


if __name__ == "__main__":
    search_smiles = "CCO"  # Change this to your target SMILES
    data_files = glob.glob("ord-data/**/*.pb.gz", recursive=True)
    print(f"🔍 Found {len(data_files)} .pb.gz files to search.")

    match_results = []  # List of dicts: {file, reaction_id}
    total_reactions_checked = 0
    total_matches = 0

    for i, file_path in enumerate(data_files, 1):
        print(f"\r🔎 [{i}/{len(data_files)}] Searching...", end="")
        try:
            dataset = load_dataset(file_path)
            for reaction in dataset.reactions:
                total_reactions_checked += 1
                if reaction_contains_smiles(reaction, search_smiles):
                    match_results.append({
                        "file": file_path,
                        "reaction_id": reaction.reaction_id or "[No ID]"
                    })
                    total_matches += 1
            del dataset
            gc.collect()
        except Exception as e:
            print(f"\n⚠️ Skipping {file_path}: {e}")

    print(f"\n✅ Done. Found {total_matches} matching reactions containing '{search_smiles}'")

    # # Save to a JSON file
    # output_file = "matching_reactions.json"
    # with open(output_file, "w") as f:
    #     json.dump(match_results, f, indent=2)

    # print(f"📝 Saved match info to {output_file}")
