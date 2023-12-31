from enum import IntEnum

class CountryEnums(IntEnum):
    NAME_MAX_LENGTH = 64
    COUNTRY_CODE_MAX_LENGTH = 5

class CityEnums(IntEnum):
    NAME_MAX_LENGTH = 64
    COUNTRY_CODE_MAX_LENGTH = 5


class TypeEnums(IntEnum):
    TITLE_MAX_LENGTH = 64
    DESCRIPTION_MAX_LENGTH = 2048


class TeamEnums(IntEnum):
    TITLE_MAX_LENGTH = 64
    DESCRIPTION_MAX_LENGTH = 2048
    CITY_MAX_LENGTH = 64
    BAN_DATES_MAX_LENGTH = 64


class ParticipantEnums(IntEnum):
    FULL_NAME_MAX_LENGTH = 64
    DESCRIPTION_MAX_LENGTH = 2048


class TournamentEnums(IntEnum):
    TITLE_MAX_LENGTH = 64
    DESCRIPTION_MAX_LENGTH = 2048


class MatchEnums(IntEnum):
    POINTS_DEFAULT_VALUE = 0
