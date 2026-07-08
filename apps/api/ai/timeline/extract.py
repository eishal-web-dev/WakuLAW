"""Timeline extraction: find dated events in legal text.

Rule-based (free, deterministic): sentences containing a recognizable date
become events, parsed with dateutil. Bare years are ignored — too noisy.
"""

import re
from dataclasses import dataclass

from dateutil import parser as dateparser

from ai.preprocessing.sentences import split_sentences

_MONTHS = (
    r"(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|"
    r"Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)"
)

_DATE_PATTERNS = [
    re.compile(r"\b\d{1,2}[./-]\d{1,2}[./-]\d{4}\b"),                       # 12.07.2024
    re.compile(rf"\b\d{{1,2}}(?:st|nd|rd|th)?\s+{_MONTHS}\s+\d{{4}}\b", re.I),  # 14th March 2019
    re.compile(rf"\b{_MONTHS}\s+\d{{1,2}},?\s+\d{{4}}\b", re.I),            # March 14, 2019
]


@dataclass
class TimelineEvent:
    date: str  # ISO yyyy-mm-dd
    date_text: str
    text: str


def _parse(date_text: str) -> str | None:
    try:
        cleaned = re.sub(r"(?<=\d)(st|nd|rd|th)\b", "", date_text)
        parsed = dateparser.parse(cleaned, dayfirst=True, fuzzy=False)
        return parsed.date().isoformat() if parsed else None
    except (ValueError, OverflowError):
        return None


def extract_events(text: str) -> list[TimelineEvent]:
    events: list[TimelineEvent] = []
    seen: set[tuple[str, str]] = set()
    for sentence in split_sentences(text):
        for pattern in _DATE_PATTERNS:
            for match in pattern.finditer(sentence):
                iso = _parse(match.group(0))
                if iso is None:
                    continue
                key = (iso, sentence)
                if key in seen:
                    continue
                seen.add(key)
                events.append(TimelineEvent(date=iso, date_text=match.group(0), text=sentence))
    events.sort(key=lambda event: event.date)
    return events
