# todo rename
# todo docstring
# todo validate incoming data
# todo support multiple tests with arrays

import sys

sys.path.append('../src')

import logging
from pathlib import Path
import json
import requests
from dataclasses import dataclass

from app import routes

from models import Item
from models import Rating
from models import Preference
from models import Event
from models import Survey

validators = {
    '/items': Item,
    '/ratings': Rating,
    '/preferences': Preference,
    '/events': Event,
    '/survey': Survey
}


@dataclass
class HTTPTest:
    """
    Simple wrapper around `request`.
    """
    route: str
    method: str
    data: dict

    def run(self, host):
        res = requests.request(
            method=self.method,
            url=host.strip('/') + '/' + self.route.strip('/'),
            **{'params' if self.method == 'GET'
               else 'json': self.data})
        return res


# todo get object from response
# todo implement validation

@dataclass
class Loader:
    """
    Loads test data for a given route and method.
    """
    root = "./payloads"
    ext = "json"

    def load(self, route, method):
        route_path = Path(self.root) / Path(route).name
        file_name = f"{method.lower()}.{self.ext}"
        test_path = route_path / file_name
        data = json.loads(test_path.read_text())
        return data



def run_tests():
    loader = Loader()
    host = "http://localhost:5000"
    for route, resource, in routes.items():
        for method in resource.__dict__['methods']:
            try:
                payload = loader.load(route, method)
            except FileNotFoundError:
                continue

            # todo fix later
            if route == '/ratings':
                test = HTTPTest(route, method, payload)
                print(test.run(host).text)


run_tests()
