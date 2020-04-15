import json

from graphene_django.utils.testing import GraphQLTestCase
from mixer.backend.django import mixer

from server.apps.products.models import Product
from server.schema import schema


class ProductsAvailabilityApiTestCase(GraphQLTestCase):
    GRAPHQL_SCHEMA = schema

    @classmethod
    def setUpTestData(cls):
        mixer.blend(
            Product, product_id="product_a",
        )

    def test_product_query(self):
        response = self._run_query("product_a")
        content = json.loads(response.content)

        self.assertResponseNoErrors(response)
        assert content["data"]["product"] is not None
        assert content["data"]["product"]["productId"] == "product_a"

    def test_product_query_case_insensitive(self):
        response = self._run_query("PRODUCT_A")
        content = json.loads(response.content)

        self.assertResponseNoErrors(response)
        assert content["data"]["product"] is not None
        assert content["data"]["product"]["productId"] == "product_a"

    def _run_query(self, product_id):
        return self.query(
            """
            query product($productId: String!){
                product(productId: $productId) {
                    id
                    name
                    productId
                    alias
                }
            }
            """,
            op_name="product",
            variables={"productId": product_id},
        )
