from common.hotel.hotel_data import HotelSearchCombination


class AlpitourUrlBuilder:
    __url_template = "https://www.alpitour.it/hotel/{}?where={}&startDate={}&duration={}&FoundFilled=Region&type=hotel&idSupplier=&numRooms=1&adultsRoom1={}&childrenRoom1=0&ageChild1Room1=&ageChild2Room1=&adults={}&children=0&ageOne=&ageTwo=&codHotel=&keyd=&codAzie=&codCard=&env-template=internal_search_active"

    def get_hotels_search_url(self, combination: HotelSearchCombination):
        return self.__url_template.format(
            combination.destination["path"],
            combination.destination["id"],
            combination.date_from.strftime("%d/%m/%Y"),
            combination.duration,
            combination.occupancy.rooms[0].adults,
            combination.occupancy.rooms[0].adults,
        )
