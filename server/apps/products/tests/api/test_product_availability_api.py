import json

from graphene_django.utils.testing import GraphQLTestCase
from mixer.backend.django import mixer

from server.apps.products.models import ProductAvailability
from server.schema import schema


class ProductsAvailabilityApiTestCase(GraphQLTestCase):
    GRAPHQL_SCHEMA = schema

    @classmethod
    def setUpTestData(cls):
        mixer.blend(
            ProductAvailability,
            product_id="product_a",
            nights=7,
            tot_adults=2,
            quantity_available=1,
            allotments_id=["allotment-id-1"],
        )
        mixer.blend(
            ProductAvailability,
            product_id="product_a",
            nights=7,
            tot_adults=3,
            quantity_available=0,
            allotments_id=["allotment-id-2"],
        )

    def test_missing_product_is_unavailable(self):
        response = self._run_availability_query("missing_product", 2)
        content = json.loads(response.content)

        self.assertResponseNoErrors(response)
        self.assertTrue(
            len(content["data"]["allProductAvailabilities"]["edges"]) == 0  # noqa
        )

    def test_product_a_is_available_with_two_adults(self):
        response = self._run_availability_query("product_a", 2)
        content = json.loads(response.content)

        self.assertResponseNoErrors(response)
        self.assertTrue(len(content["data"]["allProductAvailabilities"]["edges"]) == 1)

    def test_product1_is_not_available_with_two_adults(self):
        response = self._run_availability_query("product_a", 3)
        content = json.loads(response.content)

        self.assertResponseNoErrors(response)
        self.assertTrue(
            len(content["data"]["allProductAvailabilities"]["edges"]) == 0  # noqa
        )

    def _run_availability_query(self, product_id, tot_adults):
        return self.query(
            """
            query allProductAvailabilities($productId: String!, $totAdults: Int!){
                allProductAvailabilities(productId: $productId, totAdults: $totAdults) {
                    edges {
                        node {
                            id
                            productId
                            totAdults
                            startDateFrom
                            startDateTo
                            nights
                            price
                        }
                    }
                }
            }
            """,
            op_name="allProductAvailabilities",
            variables={"productId": product_id, "totAdults": tot_adults},
        )
