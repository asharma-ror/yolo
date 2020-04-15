from typing import TypeVar

from django.db import models
from django_extensions.db.models import TimeStampedModel


class Destination(models.Model):
    """
      This class manages a destination.
    """

    name = models.CharField(max_length=120)

    def __str__(self):
        return self.name


class Week(models.Model):
    name = models.CharField(max_length=30)

    start = models.DateField()

    end = models.DateField()

    @property
    def get_start_week_number(self):
        return self.start.isocalendar()[1]

    @property
    def get_start_month(self):
        return self.start.month

    @property
    def get_end_week_number(self):
        return self.end.isocalendar()[1]

    @property
    def get_end_month(self):
        return self.end.month

    def __str__(self):
        return f"{self.name}: {self.start}-{self.end}"


class ImportFile(TimeStampedModel):
    file = models.FileField(upload_to="inputs/%Y/%m/%d/")
    name = models.CharField(
        max_length=300, unique=True, help_text="Original File name while importing"
    )
    output_file = models.FileField(upload_to="outputs/%Y/%m/%d/", null=True)

    def __str__(self):
        return f"{self.created}: {self.name}"


class StageDB(models.Model):
    class Meta:
        ordering = ["sheet_name", "row_number"]

    import_file = models.ForeignKey(ImportFile, on_delete=models.CASCADE, null=True)
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE)

    week = models.ForeignKey(Week, on_delete=models.CASCADE)

    # row info
    sheet_name = models.CharField(max_length=150, null=True, db_index=True)
    row_number = models.PositiveIntegerField(null=True, db_index=True)

    date = models.DateField()
    # """extracted from name of the file"""

    e_z = models.IntegerField(
        help_text="E-Z Column D", default=0, verbose_name="Consuntivo : E-Z"
    )
    gar_last_season_consumptive = models.IntegerField(
        help_text="Gar Column E", default=0, verbose_name="Consuntivo : Gar"
    )
    gar_last_season_consumptive_2 = models.IntegerField(
        default=0, verbose_name="Consuntivo : Gar-2"
    )
    tl_last_season_consumptive = models.IntegerField(
        default=0, verbose_name="Consuntivo : TL"
    )
    pax_last_season_consumptive = models.IntegerField(
        default=0, verbose_name="Consuntivo : Pax"
    )
    neos_last_season_consumptive = models.IntegerField(
        default=0, verbose_name="Consuntivo : NEOS"
    )
    perc_occ_consumptive = models.DecimalField(
        decimal_places=3, max_digits=14, verbose_name="Consuntivo : % Occ.", default=0
    )
    perc_e_z = models.DecimalField(
        decimal_places=3, max_digits=14, default=0, verbose_name="Consuntivo : % E-Z"
    )
    tl_perc_last_season = models.DecimalField(
        decimal_places=3, max_digits=14, default=0, verbose_name="Consuntivo : % TL"
    )

    gar_last_season_on_date = models.IntegerField(
        help_text="Gar Column I", default=0, verbose_name="Port-1 : Gar"
    )
    pax_last_season_on_date = models.IntegerField(
        help_text="Pax Column J", default=0, verbose_name="Port-1 : Pax"
    )
    neos_last_season_on_date = models.IntegerField(
        help_text="Neos Column K", default=0, verbose_name="Port-1 : NEOS"
    )
    perc_occ = models.DecimalField(
        decimal_places=3,
        max_digits=14,
        help_text="% occ Column L",
        default=0,
        verbose_name="Port-1 : % Occ.",
    )

    gar_current_season = models.IntegerField(
        help_text="Gar Column M", default=0, verbose_name="Port-2 : Gar"
    )
    pax_current_season = models.IntegerField(
        help_text="Pax Column N", default=0, verbose_name="Port-2 : Pax"
    )
    perc_occ_current_season = models.DecimalField(
        decimal_places=3,
        max_digits=14,
        help_text="% occ Column O",
        default=0,
        verbose_name="Port-2 : % Occ.",
    )

    on_sale_curr_season = models.IntegerField(
        help_text="Port-2 : On-Sale", default=0, verbose_name="Port-2 : On-Sale"
    )
    curr_season_resd = models.IntegerField(
        help_text="Port-2 : Residui", default=0, verbose_name="Port-2 : Residui"
    )
    curr_season_opz = models.IntegerField(
        help_text="Port-2 : Opz", default=0, verbose_name="Port-2 : Opz"
    )
    curr_season_opz_ind = models.IntegerField(
        help_text="Port-2 : Opz. IND", default=0, verbose_name="Port-2 : Opz. IND"
    )
    curr_season_opz_grp = models.IntegerField(
        help_text="Port-2 : Opz. GRP", default=0, verbose_name="Port-2 : Opz. GRP"
    )
    neos_current_season = models.IntegerField(
        help_text="Neos Column P", default=0, verbose_name="Port-2 : NEOS"
    )
    curr_season_sv = models.IntegerField(
        help_text="Port-2 : SV", default=0, verbose_name="Port-2 : SV"
    )
    curr_season_tl = models.IntegerField(
        help_text="Port-2 : TL", default=0, verbose_name="Port-2 : TL"
    )
    curr_season_perc_occ = models.DecimalField(
        decimal_places=3,
        max_digits=14,
        help_text="Port-2 : % Occ",
        default=0,
        verbose_name="Port-2 : % Occ",
    )

    delta_gar = models.IntegerField(
        help_text=" Delta Gar Column Q", default=0, verbose_name="delta : Δ Gar"
    )
    delta_pax = models.IntegerField(
        help_text="Delta Pax Column Q", default=0, verbose_name="delta : Δ Pax"
    )
    delta_gar_perc = models.DecimalField(
        decimal_places=3,
        max_digits=14,
        help_text="delta : Δ% Gar",
        default=0,
        verbose_name="delta : Δ% Gar",
    )
    delta_pax_perc = models.DecimalField(
        decimal_places=3,
        max_digits=14,
        help_text="delta : Δ% Pax",
        default=0,
        verbose_name="delta : Δ% Pax",
    )

    gar_forecast = models.IntegerField(
        verbose_name="budget : Gar", default=0, blank=False, help_text="Gar Column R"
    )
    pax_forecast = models.IntegerField(
        verbose_name="budget : Pax", default=0, blank=False, help_text="Pax Column R"
    )
    neos_forecast = models.IntegerField(
        verbose_name="budget : NEOS", default=0, blank=False, help_text="Neos Column R"
    )
    perc_occ_forecast = models.DecimalField(
        decimal_places=3,
        max_digits=14,
        verbose_name="budget : % Occ.",
        default=0,
        blank=False,
        help_text="% occ Column R",
    )

    curr_year_pax_diff = models.DecimalField(
        decimal_places=3, max_digits=14, verbose_name="budget : Δ Pax", default=0
    )
    curr_year_pax_diff_perc = models.DecimalField(
        decimal_places=3, max_digits=14, verbose_name="budget : Δ% Pax", default=0
    )

    last_season_week_four_of_last_four = models.IntegerField(
        help_text="15/7 column Column S", default=0, verbose_name="estate-1 : 4"
    )
    last_season_week_three_of_last_four = models.IntegerField(
        help_text="8/7 column Column S", default=0, verbose_name="estate-1 : 3"
    )
    last_season_week_two_of_last_four = models.IntegerField(
        help_text="1/7 column Column S", default=0, verbose_name="estate-1 : 2"
    )
    last_season_week_one_of_last_four = models.IntegerField(
        help_text="24/6 column Column S", default=0, verbose_name="estate-1 : 1"
    )

    current_season_week_four_of_last_four = models.IntegerField(
        help_text="14/7 column Column T", default=0, verbose_name="estate-2 : 4"
    )
    current_season_week_three_of_last_four = models.IntegerField(
        help_text="7/7 column Column T", default=0, verbose_name="estate-2 : 3"
    )
    current_season_week_two_of_last_four = models.IntegerField(
        help_text="30/06 column Column T", default=0, verbose_name="estate-2 : 2"
    )
    current_season_week_one_of_last_four = models.IntegerField(
        help_text="23/6 column Column T", default=0, verbose_name="estate-2 : 1"
    )

    last_season_week_four_of_last_four_neos = models.IntegerField(
        help_text="15/7 column Column U", default=0, verbose_name="neos-1 : 4"
    )
    last_season_week_three_of_last_four_neos = models.IntegerField(
        help_text="8/7 column Column U", default=0, verbose_name="neos-1 : 3"
    )
    last_season_week_two_of_last_four_neos = models.IntegerField(
        help_text="1/7 column Column U", default=0, verbose_name="neos-1 : 2"
    )
    last_season_week_one_of_last_four_neos = models.IntegerField(
        help_text="24/6 column Column U", default=0, verbose_name="neos-1 : 1"
    )

    current_season_week_four_of_last_four_neos = models.IntegerField(
        help_text="14/7 column Column V", default=0, verbose_name="neos-2 : 4"
    )
    current_season_week_three_of_last_four_neos = models.IntegerField(
        help_text="7/7 column Column V", default=0, verbose_name="neos-2 : 3"
    )
    current_season_week_two_of_last_four_neos = models.IntegerField(
        help_text="30/06 column Column V", default=0, verbose_name="neos-2 : 2"
    )
    current_season_week_one_of_last_four_neos = models.IntegerField(
        help_text="23/6 column Column V", default=0, verbose_name="neos-2 : 1"
    )

    mix_sales_ind_last_season = models.IntegerField(
        default=0, verbose_name="last-sales : IND"
    )
    mix_sales_ind_last_season_perc = models.DecimalField(
        decimal_places=3, max_digits=14, verbose_name="last-sales : % IND", default=0
    )
    mix_sales_grp_last_season = models.IntegerField(
        default=0, verbose_name="last-sales : GRP"
    )
    mix_sales_grp_last_season_perc = models.DecimalField(
        decimal_places=3, max_digits=14, verbose_name="last-sales : % GRP", default=0
    )

    mix_sales_ind_curr_season = models.IntegerField(
        default=0, verbose_name="curr-sales : IND"
    )
    mix_sales_ind_curr_season_perc = models.DecimalField(
        decimal_places=3, max_digits=14, verbose_name="curr-sales : % IND", default=0
    )
    mix_sales_grp_curr_season = models.IntegerField(
        default=0, verbose_name="curr-sales : GRP"
    )
    mix_sales_grp_curr_season_perc = models.DecimalField(
        decimal_places=3, max_digits=14, verbose_name="curr-sales : % GRP", default=0
    )

    seven_day_return_gar = models.IntegerField(default=0, verbose_name="Port-3 : Gar")
    seven_day_return_pax = models.IntegerField(default=0, verbose_name="Port-3 : Pax")
    seven_day_return_occ_perc = models.DecimalField(
        default=0, verbose_name="Port-3 : % Occ.", decimal_places=3, max_digits=14
    )
    seven_day_return_neos = models.IntegerField(default=0, verbose_name="Port-3 : NEOS")
    seven_day_return_on_sale = models.IntegerField(
        default=0, verbose_name="Port-3 : On-Sale"
    )
    seven_day_return_on_sale_perc = models.DecimalField(
        default=0, verbose_name="Port-3 : % On-Sale", decimal_places=3, max_digits=14
    )
    seven_day_return_opz = models.IntegerField(default=0, verbose_name="Port-3 : Opz")
    seven_day_return_opz_ind = models.IntegerField(
        default=0, verbose_name="Port-3 : Opz. IND"
    )
    seven_day_return_opz_grp = models.IntegerField(
        default=0, verbose_name="Port-3 : Opz. GRP"
    )

    dep_date_return_gar = models.IntegerField(default=0, verbose_name="Port-4 : Gar")
    dep_date_return_pax = models.IntegerField(default=0, verbose_name="Port-4 : Pax")
    dep_date_return_occ_perc = models.DecimalField(
        default=0, verbose_name="Port-4 : % Occ.", decimal_places=3, max_digits=14
    )
    dep_date_return_neos = models.IntegerField(default=0, verbose_name="Port-4 : NEOS")
    dep_date_return_on_sale = models.IntegerField(
        default=0, verbose_name="Port-4 : On-Sale"
    )
    dep_date_return_on_sale_perc = models.DecimalField(
        default=0, verbose_name="Port-4 : % On-Sale", decimal_places=3, max_digits=14
    )
    dep_date_return_opz = models.IntegerField(default=0, verbose_name="Port-4 : Opz")
    dep_date_return_opz_ind = models.IntegerField(
        default=0, verbose_name="Port-4 : Opz. IND"
    )
    dep_date_return_opz_grp = models.IntegerField(
        default=0, verbose_name="Port-4 : Opz. GRP"
    )

    rotation_gar = models.IntegerField(default=0, verbose_name="Port-5 : Gar")
    rotation_pax = models.IntegerField(default=0, verbose_name="Port-5 : Pax")
    rotation_occ_perc = models.DecimalField(
        default=0, verbose_name="Port-5 : % Occ.", decimal_places=3, max_digits=14
    )
    rotation_neos = models.IntegerField(default=0, verbose_name="Port-5 : NEOS")
    rotation_on_sale = models.IntegerField(default=0, verbose_name="Port-5 : On-Sale")
    rotation_on_sale_perc = models.DecimalField(
        default=0, verbose_name="Port-5 : % On-Sale", decimal_places=3, max_digits=14
    )
    rotation_opz = models.IntegerField(default=0, verbose_name="Port-5 : Opz")
    rotation_opz_ind = models.IntegerField(default=0, verbose_name="Port-5 : Opz. IND")
    rotation_opz_grp = models.IntegerField(default=0, verbose_name="Port-5 : Opz. GRP")

    y7_left = models.IntegerField(
        help_text="y7_left Column X", verbose_name="y7 left", default=0
    )

    adj_capacity = models.IntegerField(
        verbose_name="adj.\ncapacity", default=0, help_text="adj capacity Column Y"
    )
    adj_capacity_plus_mins = models.IntegerField(
        verbose_name="adj +/- capacity", default=0
    )
    pickup_4_weeks_perc = models.DecimalField(
        default=0, verbose_name="%Pick-Up 4 weeks", decimal_places=3, max_digits=14
    )
    wt_4_weeks_perc = models.DecimalField(
        default=0, verbose_name="%Weight 4 weeks", decimal_places=3, max_digits=14
    )
    pickup_2_weeks_perc = models.DecimalField(
        default=0, verbose_name="%Pick-Up 2 weeks", decimal_places=3, max_digits=14
    )
    wt_2_weeks_perc = models.DecimalField(
        default=0, verbose_name="%Weight 2 weeks", decimal_places=3, max_digits=14
    )

    avg_pick_up = models.DecimalField(
        decimal_places=3, max_digits=14, verbose_name="Avg. Pick-Up", default=0
    )

    pax_py = models.DecimalField(
        decimal_places=3, max_digits=14, verbose_name="Pax PY", default=0
    )

    pax_CY = models.DecimalField(
        decimal_places=3, max_digits=14, verbose_name="Pax CY", default=0
    )

    plus_or_minus = models.IntegerField(
        verbose_name="+/-", default=0, blank=False, help_text=" +/- Column AC"
    )

    precl_pax = models.DecimalField(
        decimal_places=3, max_digits=14, verbose_name="Precl. Pax", default=0
    )
    delta_perc_Pax_Res_PY = models.DecimalField(
        decimal_places=3, max_digits=14, verbose_name="Δ% Pax Res PY", default=0
    )

    precl_pax_lw = models.DecimalField(
        decimal_places=3, max_digits=14, verbose_name="Precl. Pax LW", default=0
    )
    lf_lw_perc = models.DecimalField(
        decimal_places=3, max_digits=14, verbose_name="%LF LW", default=0
    )
    pax_vs_lw_perc = models.DecimalField(
        decimal_places=3, max_digits=14, verbose_name="Δ Pax vs. LW", default=0
    )

    new_capacity = models.DecimalField(
        decimal_places=3, max_digits=14, verbose_name="new capacity", default=0
    )

    tot_pax_cy = models.DecimalField(
        decimal_places=3, max_digits=14, verbose_name="Tot. Pax CY", default=0
    )

    new_perc_lf = models.DecimalField(
        decimal_places=3, max_digits=14, verbose_name="New %LF", default=0
    )

    diff_pax_vs_forecast = models.DecimalField(
        verbose_name="Δ Pax vs. Forecast", default=0, decimal_places=3, max_digits=14
    )
    price_pax_vs_forecast = models.DecimalField(
        verbose_name="ε Pax vs. Forecast", default=0, decimal_places=3, max_digits=14
    )
    lf_perc = models.DecimalField(
        default=0, verbose_name="%LF Prec", decimal_places=3, max_digits=14
    )

    pax_incr_f_perc = models.DecimalField(
        default=0, verbose_name="Pax Incr. vs. F[%occ]", decimal_places=3, max_digits=14
    )
    seats_incr_f_perc = models.DecimalField(
        default=0,
        verbose_name="Seats Incr. vs. F[%occ]",
        decimal_places=3,
        max_digits=14,
    )
    lb_occ_perc = models.DecimalField(
        default=0, verbose_name="LB %occ.", decimal_places=3, max_digits=14
    )

    flag_neos = models.IntegerField(verbose_name="flag NEOS", default=0)
    pax_neos = models.DecimalField(
        decimal_places=3, max_digits=14, verbose_name="Pax NEOS", default=0
    )

    to_capacity = models.DecimalField(
        decimal_places=3, max_digits=14, verbose_name="TO capacity", default=0
    )
    to_capacity_2 = models.DecimalField(
        decimal_places=3, max_digits=14, verbose_name="TO capacity-2", default=0
    )
    to_perc_lf = models.DecimalField(
        decimal_places=3, max_digits=14, verbose_name="TO %LF", default=0
    )

    to_pax = models.DecimalField(
        decimal_places=3,
        max_digits=14,
        help_text="To Pax column AI",
        verbose_name="TO pax",
        default=0,
    )

    pax_to_perc_forecast = models.DecimalField(
        verbose_name="Pax to %Forecast", decimal_places=3, max_digits=14, default=0
    )

    pax_py_residui = models.DecimalField(
        decimal_places=3,
        max_digits=14,
        help_text="Pax PY Residui column AL",
        verbose_name="Pax PY Residui",
        default=0,
    )

    pax_cy_residui = models.DecimalField(
        decimal_places=3, max_digits=14, verbose_name="Pax CY Residui", default=0
    )

    tot_pax_target = models.DecimalField(
        decimal_places=3, max_digits=14, verbose_name="Tot Pax Target", default=0
    )

    elasticity = models.DecimalField(
        default=0, verbose_name="Elasticità", decimal_places=3, max_digits=14
    )
    pax_incr_diff = models.DecimalField(
        default=0, verbose_name="Δ Pax Incr.", decimal_places=3, max_digits=14
    )
    price_diff = models.DecimalField(
        default=0, verbose_name="Δ prezzo", decimal_places=3, max_digits=14
    )


class Country(TimeStampedModel):
    class Meta:
        verbose_name = "LookupNazioni"

    code = models.CharField(verbose_name="cod_nazione_destinazione", max_length=100)
    name = models.CharField(verbose_name="Nome Paese", max_length=300)

    def __str__(self):
        return self.code


class Zone(TimeStampedModel):
    class Meta:
        verbose_name = "Zona"

    code = models.CharField(verbose_name="Cod zona dest", max_length=100)
    name = models.CharField(verbose_name="Nome Zona", max_length=300)

    def __str__(self):
        return self.code


T = TypeVar("T", bound="NewFromModelBase")


class NewFromModelBase(TimeStampedModel):
    class Meta:
        abstract = True

    @classmethod
    def new_from(cls, **data):
        return cls(**data)


class ProdOffer(NewFromModelBase):
    prod_id = models.CharField(max_length=300, verbose_name="id_prod")
    catalog_id = models.CharField(max_length=300, verbose_name="catalog_id")
    catalog_id22 = models.CharField(max_length=300, verbose_name="catalog_id22")
    commission_percent = models.CharField(
        max_length=300, verbose_name="commission_percent"
    )
    departure_date = models.DateTimeField(verbose_name="departure_date")
    departure_flight_airport = models.CharField(
        max_length=300, verbose_name="departure_flight_airport2"
    )
    departure_flight_available_seats = models.CharField(
        max_length=300, verbose_name="departure_flight_available_seats"
    )
    departure_flight_code = models.CharField(
        max_length=300, verbose_name="departure_flight_code"
    )
    departure_flight_company = models.CharField(
        max_length=300, verbose_name="departure_flight_company"
    )
    hotel_category = models.CharField(max_length=300, verbose_name="hotel_category")
    hotel_checking_date = models.DateTimeField(verbose_name="hotel_checking_date")
    hotel_checkout_date = models.DateTimeField(verbose_name="hotel_checkout_date")
    hotel_code = models.CharField(max_length=300, verbose_name="hotel_code")
    hotel_name = models.CharField(max_length=300, verbose_name="hotel_name")

    offer_type = models.CharField(max_length=300, verbose_name="offer_type")
    return_date = models.DateTimeField(verbose_name="return_date")
    return_flight_airport = models.CharField(
        max_length=300, verbose_name="return_flight_airport"
    )
    return_flight_available_seats = models.IntegerField(
        verbose_name="return_flight_available_seats"
    )
    return_flight_code = models.CharField(
        max_length=300, verbose_name="return_flight_code"
    )
    return_flight_company = models.CharField(
        max_length=300, verbose_name="return_flight_company"
    )
    room_code = models.CharField(max_length=300, verbose_name="room_code")
    total_price = models.CharField(max_length=300, verbose_name="total_price")
    tot_adult = models.CharField(max_length=300, verbose_name="tot_adult")
    tot_children = models.CharField(max_length=300, verbose_name="tot_children")
    tot_infants = models.CharField(max_length=300, verbose_name="tot_infants")
    oftype = models.CharField(max_length=300, verbose_name="type")


class SalesUpdate(NewFromModelBase):
    n_booking = models.CharField(max_length=300, verbose_name="n_prenotazione")
    booking_date = models.DateTimeField(
        max_length=300, verbose_name="data_prenotazione"
    )
    departure_date = models.DateTimeField(
        null=True, blank=True, verbose_name="data_partenza"
    )
    reservation_status = models.CharField(
        max_length=300, verbose_name="stato_prenotazione"
    )
    stay_duration = models.DurationField(verbose_name="durata_soggiorno")
    traveler_type = models.CharField(max_length=300, verbose_name="tipo_viaggiatore")
    total_booking = models.DecimalField(
        decimal_places=3, max_digits=20, default=0, verbose_name="totale_prenotazione"
    )
    code_catalog = models.CharField(max_length=300, verbose_name="codice_catalogo")

    n_adults = models.IntegerField(default=0, verbose_name="n_adulti")
    n_children = models.IntegerField(default=0, verbose_name="n_bambini")
    n_infant = models.IntegerField(default=0, verbose_name="n_infant")

    dest_country = models.ForeignKey(
        Country, verbose_name="nazione_destinazione", on_delete=models.CASCADE
    )
    dest_zone = models.ForeignKey(
        Zone, verbose_name="Zona di Destinazione", on_delete=models.CASCADE
    )

    cod_IATA_aer_part = models.CharField(
        max_length=300, verbose_name="cod_IATA_aer_part"
    )
    cod_IATA_aer_arr = models.CharField(max_length=300, verbose_name="cod_IATA_aer_arr")

    product_description = models.CharField(
        max_length=300, verbose_name="descr_prodotto"
    )
    cod_room = models.CharField(max_length=300, verbose_name="cod_room")

    meal_plan = models.CharField(max_length=300, verbose_name="mealplan")
    id_prod = models.CharField(max_length=300, verbose_name="id_prod")
    id_flight = models.CharField(max_length=300, verbose_name="id_volo_and")

    @classmethod
    def new_from(cls, **data):
        dest_country = data.pop("dest_country", None)
        if dest_country:
            data["dest_country"], _ = Country.objects.get_or_create(  # noqa
                code=dest_country
            )

        dest_zone = data.pop("dest_zone", None)
        if dest_zone:
            data["dest_zone"], _ = Zone.objects.get_or_create(code=dest_zone)  # noqa

        return cls(**data)
