import json

from django.test import Client


class QlClient(Client):
    """Custom test client with support to graphql queries"""

    def query(  # noqa
        self,
        query,
        op_name=None,
        input_data=None,
        variables=None,
        graphql_url="/graphql/",
        **headers,
    ):
        """
        Args:
            query (string)    - GraphQL query to run
            op_name (string)  - If the query is a mutation or named query, you must
                                supply the op_name.  For annon queries ("{ ... }"),
                                should be None (default).
            input_data (dict) - If provided, the $input variable in GraphQL will be set
                                to this value. If both ``input_data`` and ``variables``,
                                are provided, the ``input`` field in the ``variables``
                                dict will be overwritten with this value.
            variables (dict)  - If provided, the "variables" field in GraphQL will be
                                set to this value.
            headers (dict)    - If provided, the headers in POST request to graphql_url
                                will be set to this value.

        Returns:
            Response object from client
        """
        body = {"query": query}
        if op_name:
            body["operation_name"] = op_name
        if variables:
            body["variables"] = variables
        if input_data:
            if variables in body:
                body["variables"]["input"] = input_data
            else:
                body["variables"] = {"input": input_data}
        return self.post(
            graphql_url, json.dumps(body), content_type="application/json", **headers,
        )
