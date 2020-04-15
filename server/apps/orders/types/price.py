from decimal import Decimal
from typing import Union


class Price:
    def __init__(
        self,
        total_amount: Union[Decimal, int, float],
        discount_amount: Union[Decimal, int, float],
    ) -> None:
        self._total_amount = float(total_amount)
        self._discount_amount = float(discount_amount)

    def get_total_amount(self) -> float:
        return self._total_amount

    def get_discount_amount(self) -> float:
        return self._discount_amount

    def __add__(self, other: "Price") -> "Price":
        return Price(
            total_amount=self.get_total_amount() + other.get_total_amount(),
            discount_amount=self.get_discount_amount() + other.get_discount_amount(),
        )

    @classmethod
    def zero(cls) -> "Price":
        return cls(0, 0)
