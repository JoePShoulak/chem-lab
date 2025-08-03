import os
import sys
import json
import glob

try:
    from ord_schema import message_helpers
    from ord_schema.proto import dataset_pb2
except Exception as e:
    print(json.dumps({"error": f"ord-schema import failed: {e}"}))
    sys.exit(0)

def search_reactions(dataset_root, query):
    results = []
    for filename in glob.glob(os.path.join(dataset_root, '**', '*.pb.gz'), recursive=True):
        try:
            dataset = message_helpers.load_message(filename, dataset_pb2.Dataset)
        except Exception:
            continue
        for reaction in dataset.reactions:
            for inp in reaction.inputs.values():
                for comp in inp.components:
                    for identifier in comp.identifiers:
                        value = getattr(identifier, identifier.WhichOneof('identifier'), '').lower()
                        if query.lower() in value:
                            results.append(reaction.reaction_id)
                            break
    return results

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print(json.dumps({"error": "usage: query_ord.py <ord-data-path> <chemical>"}))
        sys.exit(0)
    dataset_root, chemical = sys.argv[1], sys.argv[2]
    matches = search_reactions(dataset_root, chemical)
    print(json.dumps(matches))
