"""
app.py

Creates flask server. Exposes endpoints for retrieving
items (movies); adding ratings, survey results, and
preferences; and retrieving mturk code.

See `README.md` for deployment instructions.

Notes
-----
* Parameters are passed in as query parameters for GET requests,
  JSON-encoded in the body for all other request types.
* If no "Returns" in the docstring specified, assume a generic
  flask response.

Database Schema
----------------
See `models.py` for specification of types.


+--------------------+---------+-------------------------------+
|     attribute      |   type  |          description          |
+====================+=========+===============================+
| user_id            |  string |  id of the user (primary key) |
| ratings            |  list   |  user ratings for items       |
| pred_preferences   |  list   |  predicted preferences        |
| actual_preferences |  list   |  actual preferences           |
| events             |  list   |  user interactions            |
| survey             |  list   |  survey results               |
+--------------------+---------+-------------------------------+

"""

# todo add authorizer...which checks if called by user?
# todo root route...?2

import os
import logging
from typing import List

import boto3
import requests
from botocore.exceptions import ClientError
from dotenv import load_dotenv
from flask import Flask, request, abort, make_response
from flask import got_request_exception
from flask_restful import Resource, Api
from flask_cors import CORS

import models
#  todo remove these?
# from models import Item
# from models import Event
from models import Route
from utils import add_user_attr
from utils import to_json

load_dotenv()

# aws resources
client = boto3.resource('dynamodb')
table = client.Table(os.environ['AWS_USERS_TABLE_NAME'])
items_db = client.Table(os.environ['AWS_ITEMS_TABLE_NAME'])
# compute endpoint
compute_url = "http://127.0.0.1:6000/preferences"


class Items(Resource):

    @staticmethod
    def get(page: int = None,
            num_items: int = None):
        """
        Gets items by page. Starts at page
        one.

        Parameters
        -----------
        page : int
        num_items : int

        Returns
        --------
        items : [Item]

        """

        args = request.args
        page = int(args['page'])
        num_items = int(args['num_items'])

        items = items_db.scan(Limit=page * num_items)["Items"]

        return items[-num_items:], 200


class Preferences(Resource):

    @staticmethod
    def put(actual_preferences:
    List[models.Preference] = None):
        """
        Adds a user's *actual* preferences.

        Parameters
        -----------
        actual_preferences : [Preference]

        """

        res = request.json
        key = 'actual_preferences'
        new_attr = add_user_attr(
            res['user_id'], key, res[key],
            table)

        return new_attr, 200


class Ratings(Resource):

    @staticmethod
    def put(user_id=None,
            ratings: List[models.Rating] = None):
        """
        Get a user's *predicted* preferences
        from item ratings.

        Parameters
        -----------
        user_id : str
        ratings : [Ratings]

        Returns
        ---------
        preferences : [Preference]

        """

        res = request.json
        user_id = res['user_id']
        ratings = res['ratings']

        add_user_attr(user_id, 'ratings', ratings, table)

        payload = dict(ratings=ratings)
        res = requests.post(compute_url, json=payload)

        try:
            pred_prefs = res.json()['preferences']
            # add_user_attr(user_id, 'pred_preferences', pred_preferences)
            print(pred_prefs)  # todo remove and uncomment abovez
            res = make_response(dict(preferences=pred_prefs), 200)
        except (KeyError, ValueError):
            message = dict(message=f"Trouble connecting to {compute_url}")
            res = make_response(message, 501)

        return res


class Events(Resource):

    @staticmethod
    def put(user_id=None,
            events: List[models.Event] = None):
        """
        Adds a user's interaction events.

        Parameters
        -----------
        user_id : str
        events : [Event]

        """

        res = request.json
        key = 'events'
        new_attr = add_user_attr(
            res['user_id'], key, res[key],
            table)

        return new_attr, 200


class Survey(Resource):

    @staticmethod
    def put(user_id=None,
            survey: models.Survey = None):
        """
        Adds a user's survey results and returns
        mturk code.

        Parameters
        -----------
        user_id : str
        survey : Survey


        Returns
        --------
        mturk_code : str

        """

        res = request.json
        key = 'survey'
        add_user_attr(res['user_id'], key, res[key], table)

        # todo implement mturk
        # todo fix
        code = dict(mturk_code='MASLOV')

        return code, 200


# todo better error logging...?
def database_error():
    return "Database connection failed!", 500


def client_error():
    return "Bad request! Check parameters.", 400

# todo improve this
def log_error(sender, exception, **error):
    print("error-handler", sender, exception, **error)


routes: Route = {
    '/items': Items,
    '/preferences': Preferences,
    '/ratings': Ratings,
    '/events': Events,
    '/survey': Survey
}


def create_app():
    app = Flask(__name__)
    # enable cross-origin requests
    CORS(app)
    api = Api(app, catch_all_404s=True)
    # add routes
    for path, resource in routes.items():
        api.add_resource(resource, path)
    # better json
    api.representation('application/json')(to_json)
    # add error handlers
    app.register_error_handler(ClientError, database_error)
    app.register_error_handler(400, client_error)  # todo...
    # error logging
    got_request_exception.connect(log_error, app)
    return app
