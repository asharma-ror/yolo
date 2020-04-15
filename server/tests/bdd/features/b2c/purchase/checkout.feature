@django_db
Feature: Product checkout
  A product is purchased by a B2C customer

  Scenario Outline: Purchase a product
    Given a product with <max_places> places for <occupancy_code> occupancy from airport <airport_code>
    And a base price of <room_price> €
    When the user goes to product checkout
    And the user inserts passengers data
    And the user select to pay <payment_type> with provider <provider_type>
    And the user pays <payment_amount> €
    Then the reservation is completed
    And the user received a confirmation email


    Examples:
    | max_places | occupancy_code | airport_code | room_price | payment_type | provider_type | payment_amount |
    |  1         |  2U30          |  MXP         |  399.0     |  full_amount |  stripe       |  399.0         |
    |  1         |  2U30          |  MXP         |  399.0     |  deposit     |  stripe       |  99.75         |
    |  1         |  2U30          |  MXP         |  399.0     |  full_amount |  pay_pal      |  399.0         |
    |  1         |  2U30          |  MXP         |  399.0     |  deposit     |  pay_pal      |  99.75         |
