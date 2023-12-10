from enum import IntEnum


class TypeEnums(IntEnum):
    TITLE_MAX_LENGTH = 64
    DESCRIPTION_MAX_LENGTH = 2048


class TeamEnums(IntEnum):
    TITLE_MAX_LENGTH = 64
    DESCRIPTION_MAX_LENGTH = 2048


class ParticipantEnums(IntEnum):
    FULL_NAME_MAX_LENGTH = 64
    DESCRIPTION_MAX_LENGTH = 2048


class TournamentEnums(IntEnum):
    TITLE_MAX_LENGTH = 64
    DESCRIPTION_MAX_LENGTH = 2048


class MatchEnums(IntEnum):
    POINTS_DEFAULT_VALUE = 0
