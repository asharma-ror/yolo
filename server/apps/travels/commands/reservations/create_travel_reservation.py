from server.apps.orders.models import QuotationRoom, Reservation
from server.apps.travels.models import (
    TravelReservation,
    TravelReservationRoom,
    TravelStatus,
)


def create_travel_reservation(reservation: Reservation) -> TravelReservation:
    travel_reservation = TravelReservation.objects.create(
        reservation_id=reservation.reservation_id,
        reservation_date=reservation.created.date(),
        product_id=reservation.quotation.product_id,
        start_date_from=reservation.quotation.start_date_from,
        start_date_to=reservation.quotation.start_date_to,
        departure_option_type=reservation.quotation.departure_option_type,
        departure_option_value=reservation.quotation.departure_option_value,
        status=TravelStatus.UNASSIGNED,
    )
    [  # noqa
        _create_travel_reservation_room(travel_reservation, room)
        for room in reservation.quotation.get_rooms()
    ]
    return travel_reservation


def _create_travel_reservation_room(
    travel_reservation: TravelReservation, quotation_room: QuotationRoom
) -> TravelReservationRoom:
    return TravelReservationRoom.objects.create(
        reservation=travel_reservation,
        tot_adults=quotation_room.tot_adults,
        occupancy_code=quotation_room.occupancy_code,
    )
