def extract_numbers(text: str) -> str:
    """Extract only numbers alone from input.

    >>> extract_numbers("€ 953")
    '953'
    """

    return "".join(filter(str.isdigit, text))
