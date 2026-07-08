Feature: Legal timeline generation
  As a legal researcher
  I want an automatic chronology of events extracted from case documents
  So that I can understand the sequence of a case at a glance

  Background:
    Given a registered user with an authenticated session

  Scenario: Timeline extracted from a document with dated events
    Given the user uploaded a judgment mentioning events on "14th March 2019" and "12.07.2024"
    When the user requests the document timeline
    Then the timeline contains an event dated "2019-03-14"
    And the timeline contains an event dated "2024-07-12"
    And events are ordered chronologically
    And every event includes the sentence it was extracted from

  Scenario: Case timeline merges events from all its documents
    Given the user has a case with two documents mentioning different dates
    When the user requests the case timeline
    Then the timeline contains events from both documents
    And each event names its source document

  Scenario: Document without dates yields an empty timeline
    Given the user uploaded a document containing no dates
    When the user requests the document timeline
    Then the timeline is empty

  Scenario: Timeline of another user's document is not accessible
    Given another user uploaded a document with dates
    When the user requests that document's timeline
    Then the request fails with not found
