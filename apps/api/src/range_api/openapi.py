import json
import sys

from range_api.app.factory import create_app

JSON_INDENT = 2


def main() -> None:
    schema = create_app().openapi()
    sys.stdout.write(json.dumps(schema, indent=JSON_INDENT, sort_keys=True) + "\n")


if __name__ == "__main__":
    main()
