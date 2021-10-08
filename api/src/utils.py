"""
utils.py
"""

import simplejson as json
from flask import make_response


def add_user_attr(user_id, key, value, table):
    """
    Wrapper for `table.update_item`. Adds attribute
    `key` with value `value` for user specified by
    `user_id` into the `users` table.
    """

    res = table.update_item(**{
        'Key': dict(user_id=user_id),
        'UpdateExpression': f'set {key}=:r',
        'ExpressionAttributeValues': {':r': value},
        'ReturnValues': "UPDATED_NEW"
    })

    return res["Attributes"]


def to_json(data, code, headers):
    """
    Better JSON output formatting.
    """
    return make_response(json.dumps(data), code, headers)
