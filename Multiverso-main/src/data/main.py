import json
import os

from Universe import *
from Multiverse import *

if __name__ == "__main__":
    numOfUniverses = 15

    multiverse = Multiverse()
    multiverse.create(numOfUniverses)
    data = multiverse.build()

    filePath = "src/data/multiverseData.json"

    if os.path.exists(filePath):
        os.remove(filePath)

    with open(filePath, "w") as file:
        json.dump(data, file, indent=4)
