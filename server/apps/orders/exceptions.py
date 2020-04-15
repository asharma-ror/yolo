class AllotmentsNotFoundError(Exception):
    """todo: add doc """


class InvalidServiceConfigurationError(Exception):
    """todo: add doc"""


class RoomNotAvailableError(Exception):
    """todo: add doc"""


class InvalidRoomsCombinationError(Exception):
    """todo: add doc"""


class AncillaryServiceNotFoundError(Exception):
    """todo: add doc"""


class QuotationServiceAlreadyAdded(Exception):
    """todo: add doc"""


class QuotationServiceNotFoundError(Exception):
    """todo: add doc"""


class QuotationServiceNotRemovableError(Exception):
    """todo: add doc"""


class OccupancyNotMatchingError(Exception):
    """todo: add doc"""


class PassengerAgeValidationError(Exception):
    """ The passenger birthday provided by the user is not valid """


class MissingPassengersDataError(Exception):
    """todo: add doc"""


class InvalidPassengerDataError(Exception):
    """todo: add doc"""


class MissingCustomerDataError(Exception):
    """todo: add doc"""


class InvalidCustomerDataError(Exception):
    """todo: add doc"""


class InvalidQuotationStatusError(Exception):
    """todo: add doc"""


class InvalidPaymentAmountError(Exception):
    """todo: add doc"""


class InconsistentAvailabilityStateError(Exception):
    """todo: add doc"""


class InvalidPaymentGatewayError(Exception):
    """todo: add doc"""


class InvalidPaymentAttemptStateError(Exception):
    """todo: add doc"""


class PaymentInitializationError(Exception):
    """todo: add doc"""


class PaymentTransactionError(Exception):
    """todo: add doc"""


class PaymentTransactionDeclined(Exception):
    """todo: add doc"""


class MissingRequiredParameter(Exception):
    """todo: add doc"""


class PaymentNotFoundError(Exception):
    """todo: add doc"""


class ConfirmationEmailAlreadySentError(Exception):
    """todo: add doc"""


class DiscountTicketNotFoundError(Exception):
    """ The discount ticket inserted by the user does not exists """


class DiscountTicketAlreadyUsedError(Exception):
    """ The discount ticket has already been used """


class DiscountTicketAlreadyAddedError(Exception):
    """ A discount ticket has already been added to current quotation """
