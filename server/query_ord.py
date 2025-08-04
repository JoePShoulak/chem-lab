import sys
import os
import gzip
import glob
import gc
import time
import multiprocessing

# Keep this path setup exactly as-is
sys.path.append(os.path.abspath("ord-schema"))
from ord_schema.proto import dataset_pb2


def load_dataset(filepath):
    """Load a .pb.gz file and parse it as a Dataset."""
    with gzip.open(filepath, "rb") as f:
        dataset = dataset_pb2.Dataset()
        dataset.ParseFromString(f.read())
    return dataset


def print_reaction_summary(reaction):
    print("=" * 50)
    print(f"Reaction ID: {reaction.reaction_id or '[No ID]'}")

    print("\nInputs:")
    for key, input_comp in reaction.inputs.items():
        for component in input_comp.components:
            smiles = "[No SMILES]"
            for identifier in component.identifiers:
                if identifier.type == identifier.SMILES and identifier.value:
                    smiles = identifier.value
                    break
            print(f"  - {key}: {smiles}")

    if reaction.outcomes:
        print("\nOutcomes:")
        for i, outcome in enumerate(reaction.outcomes):
            print(f"  Outcome {i + 1}:")
            for product in outcome.products:
                smiles = "[No SMILES]"
                for identifier in product.identifiers:
                    if identifier.type == identifier.SMILES and identifier.value:
                        smiles = identifier.value
                        break

                yield_value = "[No yield]"
                for measurement in product.measurements:
                    if measurement.type == measurement.YIELD and measurement.HasField("percentage"):
                        yield_value = f"{measurement.percentage.value}%"
                        break

                print(f"    Product SMILES: {smiles}")
                print(f"    Yield: {yield_value}")
    else:
        print("\nNo outcomes reported.")

    print("=" * 50)


def reaction_contains_smiles(reaction, target_smiles: str):
    """Check if a reaction contains the exact target SMILES string."""
    target_smiles = target_smiles.strip().lower()

    for input_comp in reaction.inputs.values():
        for component in input_comp.components:
            for identifier in component.identifiers:
                if identifier.type == identifier.SMILES and identifier.value:
                    if identifier.value.strip().lower() == target_smiles:
                        return True

    for outcome in reaction.outcomes:
        for product in outcome.products:
            for identifier in product.identifiers:
                if identifier.type == identifier.SMILES and identifier.value:
                    if identifier.value.strip().lower() == target_smiles:
                        return True

    return False


def process_file(file_path, target_smiles, return_dict):
    try:
        dataset = load_dataset(file_path)
        matches = []
        for idx, reaction in enumerate(dataset.reactions):
            if reaction_contains_smiles(reaction, target_smiles):
                matches.append({
                    "file": file_path,
                    "reaction_index": idx
                })
        return_dict["results"] = matches
    except Exception as e:
        return_dict["error"] = str(e)


if __name__ == "__main__":
    search_smiles = "CCO"  # Change this to your target SMILES
    data_files = glob.glob("ord-data/**/*.pb.gz", recursive=True)
    print(f"[INFO] Found {len(data_files)} .pb.gz files to search.")

    match_results = []
    total_matches = 0

    for i, file_path in enumerate(data_files, 1):
        while True:
            print(f"\r[Searching] [{i}/{len(data_files)}]", end="")
            manager = multiprocessing.Manager()
            return_dict = manager.dict()
            p = multiprocessing.Process(target=process_file, args=(file_path, search_smiles, return_dict))
            p.start()
            p.join(timeout=30)

            if p.exitcode == 0:
                matches = return_dict.get("results", [])
                match_results.extend(matches)
                total_matches += len(matches)
                break
            else:
                print(f"\n[Warning] Crash while processing {file_path}. Retrying in 1 second...")
                time.sleep(1)

        gc.collect()

    print(f"\n[Done] Found {total_matches} matching reactions containing '{search_smiles}'")

    if match_results:
        print(f"\n[Summary] Showing summaries of the first {min(5, len(match_results))} matches:\n")
        for result in match_results[:5]:
            try:
                dataset = load_dataset(result["file"])
                reaction = dataset.reactions[result["reaction_index"]]
                print_reaction_summary(reaction)
                del dataset
                gc.collect()
            except Exception as e:
                print(f"[Warning] Could not reload result for summary: {e}")
