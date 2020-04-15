import pytest
from gql_query_builder import GqlQuery
from graphql_relay import to_global_id

from server.apps.b2business.schema.query import CompanyNode
from server.apps.companies.models import Company, CompanyUser

CNT = 3


@pytest.fixture
def create_company(mixer):
    def _factory(user):
        companies = mixer.cycle(CNT).blend(Company)
        for company in companies:
            mixer.blend(CompanyUser, company=company, user=user)
        return companies

    return _factory


@pytest.fixture
def b2b_companies(b2b_user, create_company):
    return create_company(b2b_user)


@pytest.fixture
def admin_companies(admin_user, create_company):
    return create_company(admin_user)


QRY_ALL_COMPANIES = """
query  {
  allCompanies {
    edges {
      node {
        id,
        name
      }
    }
  }
}
    """


def test_lists_companies_filtered(b2b_client, mixer, b2b_companies, admin_companies):
    # 3 of admin_user and 3 of b2b_user
    assert Company.objects.filter().count() == len(b2b_companies) + len(admin_companies)
    # execute list query
    resp = b2b_client.query(QRY_ALL_COMPANIES)
    data = resp.json()["data"]

    # check only 3 that belongs to the user is returned
    assert len(data["allCompanies"]["edges"]) == len(b2b_companies)


def test_lists_companies_all(admin_client, mixer, b2b_companies, admin_companies):
    # 3 of admin_user and 3 of b2b_user
    assert Company.objects.filter().count() == len(b2b_companies) + len(admin_companies)
    # execute list query
    resp = admin_client.query(QRY_ALL_COMPANIES)
    data = resp.json()["data"]
    # check only 3 that belongs to the user is returned
    assert len(data["allCompanies"]["edges"]) == len(b2b_companies) + len(
        admin_companies
    )


def test_login_required_for_b2b_queries(client):
    resp = client.query(QRY_ALL_COMPANIES)
    errors = resp.json()["errors"]
    assert "You do not have permission to perform this action" in errors[0]["message"]


def test_company_query(b2b_client, b2b_companies):
    company = b2b_companies[0]
    glob_id = to_global_id(CompanyNode._meta.name, company.pk)
    query = (
        GqlQuery()
        .query("company", input={"id": f'"{glob_id}"'})
        .fields(["id", "name"])
        .operation()
        .generate()
    )
    resp = b2b_client.query(query)
    data = resp.json()["data"]

    # check only 3 that belongs to the user is returned
    assert data["company"]["name"] == company.name
