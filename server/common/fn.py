from typing import Any

NO_ATTR = object()  # to mark that the object doesn't have that attribute


def _attr_getter(obj: Any, attr: str) -> Any:
    if hasattr(obj, attr):
        val = getattr(obj, attr, None)
    else:
        return NO_ATTR
    if callable(val):
        val = val()
    return val


def getter(obj, *attrs: str):
    """
        Django style attribute getter. `|` will pass any one of the available field.
    >>> getter("num", "upper", "lower", "upper")
    'NUM'
    >>> getter("num", "no_field|upper", "lower", "upper")
    'NUM'
    >>> getter("num", "upper|no_field", "lower", "upper")
    'NUM'
    >>> getter("num", "no_exist|no_") or 0
    0
    >>> getter("num", "no_exist") or 0
    0
    """

    val = obj
    for att in attrs:
        or_attrs = att.split("|")
        new_val = NO_ATTR
        for oa in or_attrs:
            new_val = _attr_getter(val, oa)
            if new_val is not NO_ATTR:
                break
        val = None if new_val is NO_ATTR else new_val
    return val
