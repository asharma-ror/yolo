import datetime
import itertools
from typing import List

from common.hotel.hotel_data import (
    HotelRoomOccupancy,
    HotelRoomsOccupancy,
    HotelSearchCombination,
)
from dateutil.relativedelta import *


def get_hotels_list():
    return [
        {
            "destination": {"id": "PUGLIA"},
            "hotels": [
                # {"id": "007MM001009H", "name": "MARE' RESORT & SPA"},
                # {"id": "008MM002143H", "name": "NATURALIS BIO RESORT"},
                # {"id": "006MM001569H", "name": "LE DUNE SUITE HOTEL"},
                # {"id": "005MM000176R", "name": "APPARTAMENTI CARLINO TOURIST"},
                # {"id": "003MM000034H", "name": "G.H.MASSERIA SANTA LUCIA"},
                # {"id": "004MM000036H", "name": "HOTEL DEL LEVANTE"},
                # {"id": "001MM000153H", "name": "MASSERIA TORRE COCCARO"},
                {"id": "007NC004134R", "name": "NICOLAUS CLUB LA GIURLITA-RESIDENCE"},
                {"id": "008NC004347H", "name": "NICOLAUS CLUB OASI VIESTE"},
                {"id": "001NC000014H", "name": "NICOLAUS CLUB ARABA FENICE VILLAGE"},
                {"id": "006NC004039H", "name": "NICOLAUS CLUB LA GIURLITA"},
                {"id": "020NC000033H", "name": "NICOLAUS CLUB OSTUNI ROSA MARINA"},
                {"id": "005NC001851H", "name": "NICOLAUS CLUB ALIMINI SMILE - HOTEL"},
                {"id": "003NC000723H", "name": "NICOLAUS CLUB MEDITUR VILLAGE"},
                {
                    "id": "004NC001633R",
                    "name": "NICOLAUS CLUB ALIMINI SMILE - RESIDENCE",
                },
                {"id": "002NC000026H", "name": "NICOLAUS CLUB PRIME IL GABBIANO"},
                # {"id": "009MM000006H", "name": "RAVEZZO BEACH HOTEL"},
                # {"id": "014MM001018H", "name": "ORCHIDEA BLU HOTEL"},
                # {"id": "015MM001777R", "name": "CAMPOVERDE VILLAGE - RESIDENCE"},
                # {"id": "016MM002084H", "name": "THE VILLAGE"},
                # {"id": "013MM000192H", "name": "CAMPOVERDE VILLAGE - APPARTHOTEL"},
                # {"id": "010MM000045H", "name": "MARITALIA HOTEL CLUB VILLAGE"},
                # {"id": "011MM000046H", "name": "HOTEL CALA DEL TURCO"},
                {"id": "034MM002236H", "name": "VOI ALIMINI RESORT"},
                # {"id": "035MM003349H", "name": "VIVOSA APULIA RESORT"},
                # {"id": "033MM001652H", "name": "CANNE BIANCHE LIFESTYLE HOTEL"},
                # {"id": "032MM001651R", "name": "PARCO DEI PRINCIPI LA RESIDENZA"},
                # {"id": "031MM001650H", "name": "PARCO DEI PRINCIPI APARTHOTEL"},
                # {"id": "041MM002143H", "name": "NATURALIS BIO RESORT"},
                # {"id": "030MM001649H", "name": "MASSERIA FONTANELLE"},
                # {"id": "043MM004331H", "name": "SUITE LE DUNE"},
                # {"id": "040MM001009H", "name": "MARE' RESORT & SPA"},
                # {"id": "039MM000115H", "name": "RELAIS MASSERIA VILLA CENCI"},
                # {"id": "038MM004330H", "name": "HOTEL GUSMAY"},
                # {"id": "037MM003993H", "name": "BLANK HOTEL"},
                # {"id": "023MM000138H", "name": "IL PALMENTO"},
                # {"id": "019MM000019H", "name": "PARCO DEI PRINCIPI RESORT & SPA"},
                # {"id": "018MM000007H", "name": "ESPERIA PALACE HOTEL"},
                # {"id": "017MM000003H", "name": "ROBINSON CLUB APULIA"},
                # {"id": "012MM000153H", "name": "MASSERIA TORRE COCCARO"},
                # {"id": "021MM000034H", "name": "G.H.MASSERIA SANTA LUCIA"},
                # {"id": "022MM000036H", "name": "HOTEL DEL LEVANTE"},
                # {"id": "027MM001455H", "name": "TICHO'S LIDO HOTEL"},
                # {"id": "026MM000730H", "name": "TORRE GUACETO RESORT"},
                # {"id": "025MM000658H", "name": "PIZZOMUNNO VIESTE PALACE HOTEL"},
                # {"id": "024MM000176R", "name": "APPARTAMENTI CARLINO TOURIST"},
                # {"id": "028MM001569H", "name": "LE DUNE SUITE HOTEL"}
            ],
        },
        {
            "destination": {"id": "SARDEGNA"},
            "hotels": [
                {"id": "001NC000093H", "name": "NICOLAUS CLUB TORRE MORESCA"},
                {"id": "003NC004346H", "name": "NICOLAUS CLUB PRIME OROSEI BEACH"},
                {"id": "010NC004054H", "name": "NICOLAUS CLUB CALA DELLA TORRE"},
                # {"id": "004MM002624H", "name": "CLUB HOTEL MARINA BEACH"},
                # {"id": "014MM000162H", "name": "FORTE VILLAGE - BOUGANVILLE"},
                # {"id": "016MM000164H", "name": "FORTE VILLAGE - CASTELLO"},
                # {"id": "017MM000165H", "name": "FORTE VILLAGE - LE PALME"},
                # {"id": "012MM004322H", "name": "CLUB HOTEL CORMORANO"},
                # {"id": "015MM000163H", "name": "FORTE VILLAGE - IL BORGO"},
                # {"id": "009MM003391H", "name": "CLUB HOTEL & RESIDENCE GLI ONTANI-H"},
                # {"id": "005MM000712R", "name": "IL BORGO DI PUNTA MARANA RESIDENCE"},
                # {"id": "006MM002588H", "name": "UAPPALA HOTEL LE ROSE"},
                # {"id": "007MM002677H", "name": "BUNGALOW CLUB VILLAGE"},
                # {"id": "008MM003390R", "name": "CLUB HOTEL & RESIDENCE GLI ONTANI-R"},
                # {"id": "011MM004321H", "name": "LI SUARI CLUB VILLAGE"}
            ],
        },
        {
            "destination": {"id": "SICILIA"},
            "hotels": [
                {"id": "001NC000071H", "name": "NICOLAUS CLUB FONTANE BIANCHE"},
                {"id": "003NC002560H", "name": "NICOLAUS CLUB PARADISE BEACH"},
                {"id": "002NC002060H", "name": "NICOLAUS CLUB BORGO RIO FAVARA"},
                # {"id": "009MM004341H", "name": "FALCONARA RESORT"},
                # {"id": "010MM004391H", "name": "UAPPALA HOTEL CLUB BAIA DEI MULINI"},
                # {"id": "008MM004100H", "name": "GH AVALON SIKANI"},
                # {"id": "005MM000078H", "name": "ACACIA RESORT"},
                {"id": "004MM000073H", "name": "VOI ARENELLA RESORT"},
                # {"id": "006MM000853H", "name": "DELFINO BEACH HOTEL"},
                # {"id": "007MM003426H", "name": "COSTA VERDE HOTEL CLUB"}
            ],
        },
        {
            "destination": {"id": "CALABRIA"},
            "hotels": [
                {"id": "013NC003404H", "name": "NICOLAUS CLUB BAGAMOYO RESORT"},
                {"id": "002NC003368H", "name": "NICOLAUS CLUB SALICE RESORT"},
                {"id": "010MM002532H", "name": "VOI FLORIANA RESORT"},
                # {"id": "003MM000559H", "name": "NICOTERA BEACH VILLAGE"},
                # {"id": "015MM003440H", "name": "BV KALAFIORITA RESORT"},
                # {"id": "014MM003415H", "name": "SANTA CATERINA VILLAGE - VILLAGE"},
                # {"id": "016MM003466H", "name": "SANTA CATERINA VILLAGE - RESORT"},
                # {"id": "017MM003716H", "name": "VASCELLERO CLUB RESORT"},
                # {"id": "020MM004377H", "name": "FALKENSTEINER CLUB GARDEN CALABRIA"},
                # {"id": "018MM004061H", "name": "TUI MAGIC LIFE CALABRIA"},
                # {"id": "012MM003350R", "name": "SALICE RESORT - MOBILHOME"},
                # {"id": "007MM000063H", "name": "VILLAGGIO L'OASI"},
                # {"id": "006MM000060R", "name": "MINERVA CLUB-TIP. MARLUSA (RSD)"},
                # {"id": "008MM001654H", "name": "NAUSICAA VILLAGE"},
                # {"id": "009MM002176H", "name": "BV BORGO DEL PRINCIPE"},
                # {"id": "011MM002580H", "name": "CORTE DEI GRECI RESORT & SPA"},
                {"id": "004MM000058H", "name": "MINERVA CLUB-TIP. MINERVA"},
                {"id": "005MM000059H", "name": "MINERVA CLUB-TIP. MARLUSA, MAREGOLF"},
            ],
        },
        {
            "destination": {"id": "TOSCANA"},
            "hotels": [
                {"id": "001NC003892H", "name": "NICOLAUS CLUB GARDEN TOSCANA RESORT"},
                {"id": "004MM003681R", "name": "VILLAGGIO TURISTICO LA CECINELLA"},
                {"id": "002MM003417H", "name": "UAPPALA HOTEL LACONA"},
                {"id": "003MM003441H", "name": "UAPPALA TOSCANA CHARME RESORT"},
            ],
        },
        {
            "destination": {"id": "RODI"},
            "hotels": [
                {"id": "001NC003629H", "name": "NICOLAUS CLUB BLUE SEA BEACH RESORT"},
            ],
        },
        {
            "destination": {"id": "SHARM EL SHEIK"},
            "hotels": [
                {"id": "001NX004057H", "name": "NICOLAUS CLUB CORAL SEA WATER WORLD"},
                {"id": "003MX004250H", "name": "ORIENTAL RIVOLI HOTEL & SPA"},
            ],
        },
        {
            "destination": {"id": "MARSA ALAM"},
            "hotels": [
                {"id": "002MX004079H", "name": "RADISSON BLU RESORT EL QUESIR"},
                {"id": "003MX004240H", "name": "JOLIE BEACH MARSA ALAM"},
            ],
        },
    ]


def get_search_dates():
    start_date = datetime.datetime(2020, 4, 4)
    weeks = 30
    return list(
        map(lambda i: start_date + relativedelta(days=+(7 * i)), range(0, weeks))
    )


def get_search_combinations(
    destinations_list: List[str],
) -> List[HotelSearchCombination]:
    start_date = datetime.date.today()
    start_date.replace(day=1)
    weeks = 52
    dates = list(
        map(lambda i: start_date + relativedelta(days=+(7 * i)), range(0, weeks),),
    )

    combination_parameters = {
        "destinations": list(
            map(
                lambda destination: {"id": destination, "name": destination,},
                destinations_list,
            ),
        ),
        "dates": dates,
        "occupancies": [HotelRoomsOccupancy([HotelRoomOccupancy(adults=2)]),],
    }

    combinations = list(
        itertools.product(
            combination_parameters["destinations"],
            combination_parameters["dates"],
            combination_parameters["occupancies"],
        ),
    )

    return list(
        map(
            lambda x: HotelSearchCombination(
                destination=x[0], date_from=x[1], duration=7, occupancy=x[2],
            ),
            combinations,
        ),
    )
