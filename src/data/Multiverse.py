import json
from Universe import *
from random import *
from time import *


class Multiverse:
    def __init__(self):  # k es la cantidad de universos en el multiverso
        self.links = []  # Matriz k*k que representa universos enlazados
        self.universes = []  # Arreglo con los objetos de tipo universo

    @property
    def size(self):
        return len(self.universes)

    def make_links(self):
        self.links = [[0 for j in range(len(self.universes))]
                      for i in range(len(self.universes))]
        for i in range(len(self.universes)):
            for j in range(len(self.universes)):
                k = randint(0, 1)
                if k == 1 and self.universes[i].links != 6 and self.universes[j].links != 6 and i != j:
                    self.links[i][j] = k
                    self.universes[i].links += 1
                    self.universes[j].links += 1

    def create(self, k):
        reps = []
        while len(self.universes) < k:
            v1 = randint(1, k)
            v2 = randint(1, k)
            if [v1, v2] not in reps:
                reps.append([v1, v2])
                self.universes.append(Universe(v1, v2))
        self.make_links()

    def show_universes(self):
        for i in self.universes:
            print(i)

    def show_links(self):
        for i in self.links:
            print(i)

    def build(self):
        data = {}

        for i in self.universes:
            data[i.name] = {'image': i.hex,
                            'energyBarrier': i.energy, 'numLinks': i.links}

        links = [j for j in self.links]

        return {'data': data, 'links': links}
