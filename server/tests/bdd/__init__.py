from pathlib import PurePath

FEATURES_DIR = PurePath(__file__).parent.joinpath("features")


def get_feature(*path) -> str:
    return str(FEATURES_DIR.joinpath(*path))
