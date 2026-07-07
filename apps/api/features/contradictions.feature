Feature: Contradiction detection across case documents
  As a lawyer preparing a case
  I want conflicting statements across the case's documents flagged
  So that I can scrutinize inconsistent testimony and records

  Background:
    Given a registered user with an authenticated session

  Scenario: Conflicting statements in two case documents are flagged
    Given the user has a case with a document stating "The witness was present at the scene on the night of the incident"
    And the same case has another document stating "The witness was not present at the scene on the night of the incident"
    When the user runs contradiction analysis on the case
    Then at least one contradiction pair is reported
    And the pair shows both conflicting sentences with their source documents
    And the pair carries a confidence score

  Scenario: Consistent documents yield no contradictions
    Given the user has a case whose documents do not conflict
    When the user runs contradiction analysis on the case
    Then no contradiction pairs are reported

  Scenario: Analysis of another user's case is not accessible
    Given another user has a case with documents
    When the user runs contradiction analysis on that case
    Then the request fails with not found
