from pydantic.dataclasses import dataclass
from typing import Literal, Dict, List
from typing import Dict, Type
from flask_restful import Resource

Route = Dict[str, Type[Resource]]

# todo add docs for all
# todo remove z.py, validate.py


Survey = Dict[str, Literal[1,2,3,4,5,6,7]]


# todo remove...?
class Request:
    user_id: str


# todo make not strict...
# todo fix
# @dataclass(extra='allow')
class Item:
    """
    Represents a generic item.
    """
    item_id: str
    title: str
    genre: str



@dataclass
class Rating:
    """
    User's rating for an item. `rating` should be a number
    between 1 and 5 (both inclusive).
    """
    item_id: str
    rating: Literal[1,2,3,4,5]


@dataclass
class Preference:
    """
    Represents a predicted or actual preference. `categories`
    is a list of classes that an item belongs to.
    """
    item_id: str
    categories: List[Literal["CONTROVERSIAL", ""]] # todo more


@dataclass
class Event:
    """
    Represents an interaction with an item.
    """
    item_id: str
    event_type: Literal["hover", "click"]
    duration: int
    enter_time: int
    exit_time: int



