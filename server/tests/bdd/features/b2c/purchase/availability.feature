@django_db
Feature: Product Search
  A product is searched by a B2C user

  Scenario Outline: Search package with some places available
    Given a product with <max_places> places for <occupancy_code> occupancy from airport <airport_code>
    And a base price of <room_price> €
    And <tot_reservations> confirmed reservations for that product
    Then I find availability for <tot_rooms> at <room_price> € for room

    Examples:
    | max_places | occupancy_code | airport_code | room_price | tot_reservations | tot_rooms |
    |  10        |  2U30          |  None        |  399       |  0               |  1        |
    |  10        |  2U30          |  None        |  399       |  0               |  10       |
    |  10        |  2U30          |  None        |  399       |  2               |  1        |
    |  10        |  2U30          |  None        |  399       |  2               |  8        |
    |  10        |  2U30          |  None        |  399       |  9               |  1        |
    |  10        |  2U30          |  MXP         |  399       |  0               |  1        |
    |  10        |  2U30          |  MXP         |  399       |  2               |  1        |
    |  10        |  2U30          |  MXP         |  399       |  9               |  1        |


  Scenario Outline: Search package with no places available
    Given a product with <max_places> places for <occupancy_code> occupancy from airport <airport_code>
    And <tot_reservations> confirmed reservations for that product
    Then I don't find availability for <tot_rooms>

    Examples:
    | max_places | occupancy_code | airport_code | tot_reservations | tot_rooms |
    |  10        |  2U30          |  MXP         |  10              |  1        |
    |  0         |  2U30          |  MXP         |  0               |  1        |
    |  10        |  2U30          |  None        |  10              |  1        |
    |  0         |  2U30          |  None        |  0               |  1        |
    |  10        |  2U30          |  MXP         |  9               |  2        |
    |  10        |  2U30          |  MXP         |  8               |  3        |
