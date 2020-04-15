import logging
import sys


class Logger:
    def __init__(self, is_verbose=False):
        # configuring log
        if is_verbose:
            self.__log_level = logging.DEBUG
        else:
            self.__log_level = logging.INFO

        log_format = logging.Formatter("[%(asctime)s] [%(levelname)s] - %(message)s",)
        self.__logger = logging.getLogger(__name__)
        self.__logger.setLevel(self.__log_level)

        # writing to stdout
        handler = logging.StreamHandler(sys.stdout)
        handler.setLevel(self.__log_level)
        handler.setFormatter(log_format)
        self.__logger.addHandler(handler)

    def get_logger(self):
        return self.__logger


__logger_instance = Logger()
app_logger = __logger_instance.get_logger()
