import os
import sys
import json
import glob

# Add local ord-schema path
script_dir = os.path.dirname(os.path.abspath(__file__))
ord_schema_path = os.path.join(script_dir, "ord-schema")
sys.path.insert(0, ord_schema_path)

try:
    from ord_schema import message_helpers
    from ord_schema.proto import dataset_pb2
except Exception as e:
    print(json.dumps({"error": f"ord-schema import failed: {e}"}))
    sys.exit(1)

def get_identifier_value(identifier):
    """Safely access the actual value from the identifier's oneof field."""
    try:
        field = identifier.WhichOneof("identifier")
        if not field:
            return None
        return getattr(identifier, field)
    except Exception:
        return None

def search_reactions(dataset_root, query):
    results = []
    query = query.lower()

    pattern = os.path.join(dataset_root, "**", "*.pb.gz")
    for filename in glob.iglob(pattern, recursive=True):
        try:
            dataset = message_helpers.load_message(filename, dataset_pb2.Dataset)
        except Exception:
            continue

        for reaction in dataset.reactions:
            match_found = False
            for input_name, input_compound in reaction.inputs.items():
                for component in input_compound.components:
                    for identifier in component.identifiers:
                        value = get_identifier_value(identifier)
                        if value and query in value.lower():
                            results.append({
                                "reaction_id": reaction.reaction_id,
                                "matched_identifier": value,
                                "source_file": os.path.basename(filename)
                            })
                            match_found = True
                            break
                    if match_found:
                        break
                if match_found:
                    break

    return results

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(json.dumps({"error": "Usage: query_ord.py <ord-data-path> <compound>"}))
        sys.exit(1)

    dataset_root = sys.argv[1]
    compound = sys.argv[2]
    try:
        results = search_reactions(dataset_root, compound)
        print(json.dumps(results, indent=2))
    except MemoryError:
        print(json.dumps({"error": "MemoryError: Too much data. Try narrowing your query."}))
